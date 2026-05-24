import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';
import { 
  Shield, 
  LayoutDashboard, 
  ListTodo, 
  BarChart3, 
  AlertOctagon, 
  LogOut,
  Menu,
  FileUp,
  Moon,
  Sun
} from 'lucide-react';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const role = user?.role || 'supervisor'; 

  // Navigation Links based on role
  const getNavLinks = () => {
    let links = [];
    if (role === 'mayor') {
      links = [
        { name: 'Overview', path: '/mayor', icon: LayoutDashboard },
        { name: 'Escalated Issues', path: '/mayor/escalated', icon: AlertOctagon },
        { name: 'Analytics', path: '/mayor/analytics', icon: BarChart3 },
        { name: 'Supervisor Assignments', path: '/mayor/assignments', icon: FileUp },
      ];
    } else {
      // Supervisor links
      links = [
        { name: 'Assigned Complaints', path: '/supervisor', icon: ListTodo },
      ];
    }
    
    // Add shared settings link for everyone
    links.push({
      name: 'Settings',
      path: `/${role}/settings`,
      icon: Shield
    });
    
    return links;
  };

  const navLinks = getNavLinks();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/30">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transition-transform duration-300 md:relative md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex h-16 items-center px-6 border-b">
             <Link to="/" className="flex items-center gap-2 text-primary font-bold">
              <Shield className="h-6 w-6" />
              <span>Wonder-Works</span>
            </Link>
          </div>
          
          <div className="px-4 py-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 px-2">
              {role} Menu
            </p>
            <nav className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path || (link.path !== `/${role}` && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : ''}`} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="absolute bottom-4 left-0 w-full px-4">
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </aside>

        {/* Main content wrapper */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Topbar */}
          <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setMobileOpen(!mobileOpen)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold capitalize hidden md:block">{role} Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggle}
                aria-label="Toggle dark mode"
                className="h-9 w-9 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <div className="text-sm font-medium">
                {user?.name || 'Staff User'} 
                <span className="bg-muted px-2 py-1 ml-2 rounded-md text-xs text-muted-foreground capitalize">{role}</span>
              </div>
            </div>
          </header>

          {/* Main scrollable area */}
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50 md:hidden animate-in fade-in" 
            onClick={() => setMobileOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
