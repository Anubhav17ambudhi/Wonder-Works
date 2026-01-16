import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/stat-card';
import { ComplaintCard } from '@/components/complaints/ComplaintCard';
import { sampleComplaints, sampleAreas } from '@/data/sampleData';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const stats = {
    total: sampleComplaints.length,
    pending: sampleComplaints.filter((c) => c.status === 'pending').length,
    inProgress: sampleComplaints.filter((c) => c.status === 'in_progress').length,
    resolved: sampleComplaints.filter((c) => c.status === 'resolved').length,
    escalated: sampleComplaints.filter((c) => c.status === 'escalated').length,
  };

  const recentComplaints = sampleComplaints.slice(0, 4);
  const escalatedComplaints = sampleComplaints.filter((c) => c.status === 'escalated');

  // Calculate complaints by area
  const complaintsByArea = sampleAreas.map((area) => ({
    name: area.name,
    count: sampleComplaints.filter((c) => c.areaId === area.id).length,
  }));

  return (
    <DashboardLayout role="admin" userName="Mayor Johnson">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening in your city today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Complaints"
            value={stats.total}
            icon={ClipboardList}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
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
          <StatCard
            title="Escalated"
            value={stats.escalated}
            icon={AlertTriangle}
            variant="danger"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Complaints */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Complaints</h2>
              <Link to="/admin/complaints">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="grid gap-4">
              {recentComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} showActions={false} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Escalated Alerts */}
            <Card className="border-status-escalated/30 shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-status-escalated" />
                  Escalated Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                {escalatedComplaints.length > 0 ? (
                  <div className="space-y-3">
                    {escalatedComplaints.slice(0, 3).map((complaint) => (
                      <div
                        key={complaint.id}
                        className="p-3 rounded-lg bg-status-escalated-bg/50 border border-status-escalated/20"
                      >
                        <p className="font-medium text-sm">{complaint.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {sampleAreas.find((a) => a.id === complaint.areaId)?.name}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No escalated issues</p>
                )}
              </CardContent>
            </Card>

            {/* Complaints by Area */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  Complaints by Area
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {complaintsByArea.map((area) => (
                    <div key={area.name} className="flex items-center justify-between">
                      <span className="text-sm">{area.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-secondary rounded-full"
                            style={{
                              width: `${(area.count / stats.total) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium w-6 text-right">{area.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
