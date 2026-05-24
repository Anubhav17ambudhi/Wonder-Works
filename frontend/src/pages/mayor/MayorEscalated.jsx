import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { api } from '../../services/api';
import { AlertOctagon, Undo2, CheckCircle } from 'lucide-react';

export default function MayorEscalated() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEscalated();
  }, []);

  const fetchEscalated = async () => {
    try {
      setLoading(true);
      const res = await api.get('/complaint/getEscalatedComplaints');
      if (res.data?.success) {
        setComplaints(res.data.complaints);
      }
    } catch (err) {
      console.error("Failed to fetch escalated complaints", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      await api.put(`/complaint/escalatedComplainResolvedByMayor/${id}`);
      // Remove or update from local state
      setComplaints(prev => prev.filter(c => c.complaint_id !== id));
    } catch (err) {
      console.error("Failed to resolve", err);
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading escalated issues...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <AlertOctagon className="h-6 w-6 text-destructive" />
        <h2 className="text-2xl font-bold tracking-tight">Escalated Complaints</h2>
      </div>
      <p className="text-muted-foreground">These complaints require special Mayor authorization or intervention.</p>
      
      {complaints.length === 0 ? (
        <Card className="py-12 border-dashed flex flex-col items-center">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <p className="text-xl font-medium text-muted-foreground">No escalated complaints right now</p>
            <p className="text-sm text-muted-foreground mt-2">All tasks are being handled gracefully.</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {complaints.map(complaint => (
            <Card key={complaint._id} className="border-destructive/50 bg-destructive/5 flex flex-col">
              <CardHeader className="pb-3 border-b border-destructive/20">
                <div className="flex justify-between items-start">
                  <span className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded-sm uppercase tracking-wider font-semibold">
                    Priority {complaint.priority}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-destructive/20 text-destructive">
                    {complaint.status}
                  </span>
                </div>
                <CardTitle className="text-lg mt-3">{complaint.complaint_id}</CardTitle>
                <div className="text-xs text-muted-foreground font-mono">
                    {new Date(complaint.createdAt).toLocaleDateString()} • {complaint.locality || "Unknown Locality"}
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex-1 flex flex-col">
                <p className="flex-1 text-sm text-foreground line-clamp-4 mb-6">
                  {complaint.description}
                </p>
                <div className="flex gap-2 mt-auto">
                    <Button 
                        variant="destructive" 
                        className="flex-1 text-xs px-2"
                        onClick={() => handleResolve(complaint.complaint_id)}
                    >
                        Mark Resolved
                    </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
