import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { api } from '../../services/api';
import { AlertCircle, FileText, CheckCircle, Clock } from 'lucide-react';

export default function SupervisorDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      // Wait, is there a specific route for fetching supervisor assigned complaints?
      // Looking at the provided backend, there isn't a single endpoint explicitly for "my assigned complaints".
      // Let's assume `/complaint/getNewComplaints` returns complaints for this supervisor or all complaints.
      // Wait, let's use the provided endpoint `/complaint/getNewComplaints`
      const res = await api.get('/complaint/getNewComplaints');
      if (res.data?.success && res.data?.complaints) {
          setComplaints(res.data.complaints);
      } else if (Array.isArray(res.data)) {
          setComplaints(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch assigned complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateStatus = async (complaintId, status) => {
    try {
      if (status === 'RESOLVED') {
        await api.put(`/complaint/complainResolvedBySuperVisor/${complaintId}`);
      } else if (status === 'PROGRESS') {
         await api.put(`/complaint/assignComplaint/${complaintId}`);
      }
      // Optimistic update
      setComplaints(prev => prev.map(c => 
        c.complaint_id === complaintId ? { ...c, status } : c
      ));
    } catch (err) {
       console.error("Failed to update status", err);
       alert("Failed to update complaint status");
    }
  };

  const filteredComplaints = filter === 'ALL' 
    ? complaints 
    : complaints.filter(c => c.status === filter);

  const stats = {
    total: complaints.length,
    inStatus: complaints.filter(c => c.status === 'IN').length,
    inProgress: complaints.filter(c => c.status === 'PROGRESS').length,
    resolved: complaints.filter(c => c.status === 'RESOLVED').length
  };

  if (loading) return <div className="flex h-64 items-center justify-center">Loading assigned tasks...</div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Assigned</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New (IN)</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inStatus}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resolved}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold">Assigned Complaints</h2>
        <div className="w-full md:w-64">
           <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
             <option value="ALL">All Statuses</option>
             <option value="IN">In</option>
             <option value="PROGRESS">In Progress</option>
             <option value="RESOLVED">Resolved</option>
           </Select>
        </div>
      </div>

      {filteredComplaints.length === 0 ? (
        <Card className="py-12 border-dashed flex flex-col items-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-medium text-muted-foreground">No complaints found</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredComplaints.map(complaint => (
            <Card key={complaint._id} className="flex flex-col relative overflow-hidden transition-all hover:shadow-md">
              <div className={`h-1 w-full absolute top-0 left-0 ${
                complaint.status === 'RESOLVED' ? 'bg-green-500' :
                complaint.status === 'ESCALATED' ? 'bg-red-500' :
                complaint.status === 'IN' ? 'bg-blue-500' : 'bg-amber-500'
              }`} />
              <CardHeader className="pb-3 border-b border-border/50">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs bg-muted px-2 py-1 rounded-sm uppercase tracking-wider font-semibold">Priority {complaint.priority || "NORMAL"}</span>
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                    complaint.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                    complaint.status === 'ESCALATED' ? 'bg-red-100 text-red-800' :
                    complaint.status === 'IN' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {complaint.status}
                  </span>
                </div>
                <CardTitle className="text-lg mt-3 truncate">{complaint.complaint_id}</CardTitle>
                <div className="text-xs text-muted-foreground font-mono">
                    {new Date(complaint.createdAt).toLocaleDateString()} • {complaint.locality || "Unknown Locality"}
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex-1 flex flex-col">
                <p className="flex-1 text-sm text-muted-foreground line-clamp-3 mb-6">
                  {complaint.description}
                </p>
                <div className="flex gap-2 mt-auto">
                    {complaint.status === 'IN' && (
                        <Button 
                            variant="secondary" 
                            className="flex-1"
                            onClick={() => updateStatus(complaint.complaint_id, 'PROGRESS')}
                        >
                            Assign Worker (In Progress)
                        </Button>
                    )}
                    {complaint.status === 'PROGRESS' && (
                        <Button 
                            className="flex-1"
                            onClick={() => updateStatus(complaint.complaint_id, 'RESOLVED')}
                        >
                            Mark Resolved
                        </Button>
                    )}
                     {complaint.status === 'RESOLVED' && (
                        <Button variant="outline" className="flex-1" disabled>
                            Completed & Resolved
                        </Button>
                    )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
