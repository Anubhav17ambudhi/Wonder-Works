import { cn } from '@/lib/utils';
import { ComplaintStatus } from '@/types';
import { Clock, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

interface StatusBadgeProps {
  status: ComplaintStatus;
  className?: string;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    icon: Clock,
    className: 'status-pending',
  },
  in_progress: {
    label: 'In Progress',
    icon: Loader2,
    className: 'status-progress',
  },
  resolved: {
    label: 'Resolved',
    icon: CheckCircle2,
    className: 'status-resolved',
  },
  escalated: {
    label: 'Escalated',
    icon: AlertTriangle,
    className: 'status-escalated',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold',
        config.className,
        className
      )}
    >
      <Icon className={cn('h-3 w-3', status === 'in_progress' && 'animate-spin')} />
      {config.label}
    </span>
  );
}
