import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ComplaintTable } from '@/components/complaints/ComplaintTable';
import { sampleComplaints } from '@/data/sampleData';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { Complaint, ComplaintStatus } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function MyComplaints() {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Filter complaints for this supervisor's area
  const areaId = 'area-1';
  const areaComplaints = sampleComplaints.filter((c) => c.areaId === areaId);

  const filteredComplaints = areaComplaints.filter(
    (complaint) =>
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingComplaints = filteredComplaints.filter((c) => c.status === 'pending');
  const inProgressComplaints = filteredComplaints.filter((c) => c.status === 'in_progress');
  const resolvedComplaints = filteredComplaints.filter((c) => c.status === 'resolved');

  const handleStatusChange = (complaint: Complaint, newStatus: ComplaintStatus) => {
    toast({
      title: 'Status Updated',
      description: `Complaint "${complaint.title}" marked as ${newStatus.replace('_', ' ')}.`,
    });
  };

  return (
    <DashboardLayout role="supervisor" userName="Sarah Williams">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Complaints</h1>
          <p className="text-muted-foreground">
            Manage complaints assigned to your area
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search complaints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">
              All ({filteredComplaints.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({pendingComplaints.length})
            </TabsTrigger>
            <TabsTrigger value="in_progress">
              In Progress ({inProgressComplaints.length})
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved ({resolvedComplaints.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ComplaintTable complaints={filteredComplaints} onStatusChange={handleStatusChange} />
          </TabsContent>
          <TabsContent value="pending">
            <ComplaintTable complaints={pendingComplaints} onStatusChange={handleStatusChange} />
          </TabsContent>
          <TabsContent value="in_progress">
            <ComplaintTable complaints={inProgressComplaints} onStatusChange={handleStatusChange} />
          </TabsContent>
          <TabsContent value="resolved">
            <ComplaintTable complaints={resolvedComplaints} onStatusChange={handleStatusChange} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
