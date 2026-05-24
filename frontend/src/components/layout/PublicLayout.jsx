import { Outlet, Link } from 'react-router-dom';
import { Shield, Home as HomeIcon, FileEdit, Search, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';

export default function PublicLayout() {
  const { isAuthenticated, user } = useAuth();
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
            <Shield className="h-6 w-6" />
            <span>Wonder-Works</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
              <HomeIcon className="h-4 w-4" /> Home
            </Link>
            <Link to="/file-complaint" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
              <FileEdit className="h-4 w-4" /> File Complaint
            </Link>
            <Link to="/track-complaint" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
              <Search className="h-4 w-4" /> Track Complaint
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="h-9 w-9 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
            ) : (
                <Link to="/login">
                  <Button variant="default">Staff Portal</Button>
                </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for civic betterment. Municipal Complaint Management System.
          </p>
        </div>
      </footer>
    </div>
  );
}
