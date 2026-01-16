import { Complaint } from '@/types';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, MoreHorizontal } from 'lucide-react';
import { sampleAreas } from '@/data/sampleData';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ComplaintTableProps {
  complaints: Complaint[];
  onView?: (complaint: Complaint) => void;
  onStatusChange?: (complaint: Complaint, status: Complaint['status']) => void;
}

const priorityBadge = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-status-pending-bg text-status-pending',
  high: 'bg-status-escalated-bg text-status-escalated',
};

export function ComplaintTable({ complaints, onView, onStatusChange }: ComplaintTableProps) {
  return (
    <div className="rounded-xl border bg-card shadow-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Complaint</TableHead>
            <TableHead className="font-semibold">Location</TableHead>
            <TableHead className="font-semibold">Priority</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complaints.map((complaint) => {
            const area = sampleAreas.find((a) => a.id === complaint.areaId);
            const locality = area?.localities.find((l) => l.id === complaint.localityId);

            return (
              <TableRow key={complaint.id} className="hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div>
                    <p className="font-medium">{complaint.title}</p>
                    <p className="text-sm text-muted-foreground">{complaint.category}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{area?.name}</p>
                    <p className="text-muted-foreground">{locality?.name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize',
                      priorityBadge[complaint.priority]
                    )}
                  >
                    {complaint.priority}
                  </span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={complaint.status} />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(complaint.createdAt, 'MMM dd, yyyy')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView?.(complaint)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onStatusChange?.(complaint, 'pending')}>
                          Mark as Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusChange?.(complaint, 'in_progress')}>
                          Mark as In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusChange?.(complaint, 'resolved')}>
                          Mark as Resolved
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusChange?.(complaint, 'escalated')}>
                          Escalate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
