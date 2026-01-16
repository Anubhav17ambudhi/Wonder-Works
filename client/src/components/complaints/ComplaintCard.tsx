import { Complaint } from '@/types';
import { StatusBadge } from '@/components/ui/status-badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, User, ChevronRight } from 'lucide-react';
import { sampleAreas } from '@/data/sampleData';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ComplaintCardProps {
  complaint: Complaint;
  onView?: () => void;
  showActions?: boolean;
}

const priorityStyles = {
  low: 'border-l-status-resolved',
  medium: 'border-l-status-pending',
  high: 'border-l-status-escalated',
};

export function ComplaintCard({ complaint, onView, showActions = true }: ComplaintCardProps) {
  const area = sampleAreas.find((a) => a.id === complaint.areaId);
  const locality = area?.localities.find((l) => l.id === complaint.localityId);

  return (
    <Card
      className={cn(
        'overflow-hidden border-l-4 shadow-card hover:shadow-elevated transition-all animate-fade-in cursor-pointer',
        priorityStyles[complaint.priority]
      )}
      onClick={onView}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{complaint.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{complaint.category}</p>
          </div>
          <StatusBadge status={complaint.status} />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {complaint.description}
        </p>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {area?.name} - {locality?.name}
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            {complaint.citizenName}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {format(complaint.createdAt, 'MMM dd, yyyy')}
          </div>
        </div>
        {showActions && (
          <div className="flex justify-end mt-4">
            <Button variant="ghost" size="sm" className="text-primary">
              View Details
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
