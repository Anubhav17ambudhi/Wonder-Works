import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/stat-card';
import { ComplaintCard } from '@/components/complaints/ComplaintCard';
import { sampleComplaints, sampleAreas } from '@/data/sampleData';
import { ClipboardList, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function SupervisorDashboard() {
  // Filter complaints for this supervisor's area (Downtown District for demo)
  const areaId = 'area-1';
  const areaComplaints = sampleComplaints.filter((c) => c.areaId === areaId);
  const areaName = sampleAreas.find((a) => a.id === areaId)?.name || 'Your Area';

  const stats = {
    total: areaComplaints.length,
    pending: areaComplaints.filter((c) => c.status === 'pending').length,
    inProgress: areaComplaints.filter((c) => c.status === 'in_progress').length,
    resolved: areaComplaints.filter((c) => c.status === 'resolved').length,
  };

  const pendingComplaints = areaComplaints.filter((c) => c.status === 'pending');

  return (
    <DashboardLayout role="supervisor" userName="Sarah Williams">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Supervisor Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Managing complaints for <strong className="text-foreground">{areaName}</strong>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Complaints"
            value={stats.total}
            icon={ClipboardList}
            variant="primary"
          />
          <StatCard
            title="Pending"
            value={stats.pending}
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="In Progress"
            value={stats.inProgress}
            icon={Loader2}
            variant="default"
          />
          <StatCard
            title="Resolved"
            value={stats.resolved}
            icon={CheckCircle2}
            variant="success"
          />
        </div>

        {/* Pending Complaints */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Pending Complaints</h2>
            <Link to="/supervisor/complaints">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>

          {pendingComplaints.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {pendingComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-xl shadow-card">
              <CheckCircle2 className="h-12 w-12 text-status-resolved mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">All Caught Up!</h3>
              <p className="text-muted-foreground">
                There are no pending complaints in your area.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
