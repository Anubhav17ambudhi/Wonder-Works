import { ReactNode } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { UserRole } from '@/types';

interface DashboardLayoutProps {
  children: ReactNode;
  role: UserRole;
  userName: string;
}

export function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar role={role} userName={userName} />
      <main className="md:ml-64 min-h-screen">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
