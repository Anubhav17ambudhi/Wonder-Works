import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ComplaintTable } from '@/components/complaints/ComplaintTable';
import { sampleComplaints } from '@/data/sampleData';
import { AlertTriangle } from 'lucide-react';

export default function EscalatedComplaints() {
  const escalatedComplaints = sampleComplaints.filter((c) => c.status === 'escalated');

  return (
    <DashboardLayout role="admin" userName="Mayor Johnson">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-status-escalated-bg flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-status-escalated" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Escalated Complaints</h1>
            <p className="text-muted-foreground">
              High priority issues requiring immediate attention
            </p>
          </div>
        </div>

        {escalatedComplaints.length > 0 ? (
          <ComplaintTable complaints={escalatedComplaints} />
        ) : (
          <div className="text-center py-16 bg-card rounded-xl shadow-card">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Escalated Complaints</h3>
            <p className="text-muted-foreground">
              Great job! There are no escalated issues at the moment.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
