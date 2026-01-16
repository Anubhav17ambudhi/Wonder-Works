import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { sampleComplaints, sampleAreas, complaintCategories } from '@/data/sampleData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart3,
  PieChart,
  MapPin,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export default function Analytics() {
  // Calculate data for charts
  const complaintsByArea = sampleAreas.map((area) => ({
    name: area.name.replace(' District', '').replace(' Ward', '').replace(' Zone', '').replace(' Quarter', ''),
    complaints: sampleComplaints.filter((c) => c.areaId === area.id).length,
  }));

  const complaintsByStatus = [
    { name: 'Pending', value: sampleComplaints.filter((c) => c.status === 'pending').length, color: 'hsl(38, 92%, 50%)' },
    { name: 'In Progress', value: sampleComplaints.filter((c) => c.status === 'in_progress').length, color: 'hsl(217, 91%, 50%)' },
    { name: 'Resolved', value: sampleComplaints.filter((c) => c.status === 'resolved').length, color: 'hsl(142, 71%, 45%)' },
    { name: 'Escalated', value: sampleComplaints.filter((c) => c.status === 'escalated').length, color: 'hsl(0, 84%, 60%)' },
  ];

  const complaintsByCategory = complaintCategories
    .map((category) => ({
      name: category.length > 15 ? category.substring(0, 15) + '...' : category,
      count: sampleComplaints.filter((c) => c.category === category).length,
    }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  // Heatmap data (simplified)
  const heatmapData = sampleAreas.map((area) => {
    const complaints = sampleComplaints.filter((c) => c.areaId === area.id);
    const total = complaints.length;
    const intensity = total === 0 ? 'low' : total <= 2 ? 'medium' : 'high';
    return { ...area, complaintCount: total, intensity };
  });

  return (
    <DashboardLayout role="admin" userName="Mayor Johnson">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics & Insights</h1>
          <p className="text-muted-foreground">
            Visual overview of complaint trends and patterns
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Complaints by Area */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Complaints by Area
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={complaintsByArea}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="complaints" fill="hsl(187, 71%, 35%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-secondary" />
                Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={complaintsByStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {complaintsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Categories */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Top Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaintsByCategory.slice(0, 5).map((category, index) => (
                  <div key={category.name} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">{category.count}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${(category.count / sampleComplaints.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Complaint Heatmap */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-secondary" />
                Complaint Density Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {heatmapData.map((area) => (
                  <div
                    key={area.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      area.intensity === 'high'
                        ? 'bg-status-escalated-bg border-status-escalated/30'
                        : area.intensity === 'medium'
                        ? 'bg-status-pending-bg border-status-pending/30'
                        : 'bg-status-resolved-bg border-status-resolved/30'
                    }`}
                  >
                    <p className="font-medium text-sm mb-1">{area.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{area.complaintCount}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          area.intensity === 'high'
                            ? 'bg-status-escalated/20 text-status-escalated'
                            : area.intensity === 'medium'
                            ? 'bg-status-pending/20 text-status-pending'
                            : 'bg-status-resolved/20 text-status-resolved'
                        }`}
                      >
                        {area.intensity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-resolved" />
                  <span className="text-xs text-muted-foreground">Low (0-1)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-pending" />
                  <span className="text-xs text-muted-foreground">Medium (2)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-escalated" />
                  <span className="text-xs text-muted-foreground">High (3+)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
