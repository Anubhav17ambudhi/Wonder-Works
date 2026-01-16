import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';
import {
  LayoutDashboard,
  FileText,
  MapPin,
  AlertCircle,
  Users,
  Settings,
  LogOut,
  ClipboardList,
  BarChart3,
  Building2,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface DashboardSidebarProps {
  role: UserRole;
  userName: string;
}

const adminNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: ClipboardList, label: 'All Complaints', path: '/admin/complaints' },
  { icon: AlertCircle, label: 'Escalated', path: '/admin/escalated' },
  { icon: MapPin, label: 'Areas & Localities', path: '/admin/areas' },
  { icon: FileText, label: 'Templates', path: '/admin/templates' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  { icon: Users, label: 'Supervisors', path: '/admin/supervisors' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

const supervisorNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/supervisor' },
  { icon: ClipboardList, label: 'My Complaints', path: '/supervisor/complaints' },
  { icon: MapPin, label: 'Area Complaints', path: '/supervisor/area' },
  { icon: Users, label: 'Assign Workers', path: '/supervisor/assign' },
  { icon: Settings, label: 'Settings', path: '/supervisor/settings' },
];

export function DashboardSidebar({ role, userName }: DashboardSidebarProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = role === 'admin' ? adminNavItems : supervisorNavItems;
  const roleTitle = role === 'admin' ? 'Mayor Dashboard' : 'Supervisor Panel';

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0',
          'bg-sidebar text-sidebar-foreground flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Building2 className="h-6 w-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-sidebar-foreground">{roleTitle}</h2>
              <p className="text-xs text-sidebar-foreground/60">City Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="h-9 w-9 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-sm font-semibold text-sidebar-accent-foreground">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-xs text-sidebar-foreground/60 capitalize">{role}</p>
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all mt-2"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
        </div>
      </aside>
    </>
  );
}
