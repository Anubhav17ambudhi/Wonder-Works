import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'secondary' | 'warning' | 'success' | 'danger';
  className?: string;
}

const variantStyles = {
  default: 'bg-card',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  warning: 'bg-status-pending-bg',
  success: 'bg-status-resolved-bg',
  danger: 'bg-status-escalated-bg',
};

const iconVariantStyles = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary-foreground/20 text-primary-foreground',
  secondary: 'bg-secondary-foreground/20 text-secondary-foreground',
  warning: 'bg-status-pending/20 text-status-pending',
  success: 'bg-status-resolved/20 text-status-resolved',
  danger: 'bg-status-escalated/20 text-status-escalated',
};

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-6 shadow-card transition-all hover:shadow-elevated animate-fade-in',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={cn('text-sm font-medium opacity-80', variant === 'default' && 'text-muted-foreground')}>
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          {trend && (
            <p className={cn('mt-1 text-sm', trend.isPositive ? 'text-status-resolved' : 'text-status-escalated')}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last week
            </p>
          )}
        </div>
        <div className={cn('rounded-lg p-3', iconVariantStyles[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
