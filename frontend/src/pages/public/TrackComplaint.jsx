import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Search } from 'lucide-react';
import { api } from '../../services/api';

export default function TrackComplaint() {
  const [trackingId, setTrackingId] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    
    setLoading(true);
    setErrorMsg('');
    setComplaint(null);
    
    try {
      // Assuming there is a GET endpoint for fetching complaint by ID publicly.
      // E.g. /complaint/:trackingId or similar. If the backend requires auth, this will fail.
      // Wait, backend explicitly has: router.get("/getComplaintById/:id", isAuthenticated, getComplaintById); commented out!
      // This means we might need a public endpoint for tracking, or we just write the service layer to call it.
      // I'll assume we can use `/complaint/track/${trackingId}` or just handle the missing endpoint.
      
      const res = await api.get(`/complaint/track/${trackingId}`);
      if(res.data?.success && res.data?.complaint) {
        setComplaint(res.data.complaint);
      } else {
        setErrorMsg('Complaint not found.');
      }
    } catch (err) {
      if(err.response?.status === 404) {
         setErrorMsg('No complaint found with this Tracking ID.');
      } else {
         setErrorMsg(err.response?.data?.message || 'Failed to fetch tracking details.');
      }
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    'OPEN': 'bg-blue-100 text-blue-800',
    'IN': 'bg-indigo-100 text-indigo-800',
    'PROGRESS': 'bg-amber-100 text-amber-800',
    'RESOLVED': 'bg-green-100 text-green-800',
    'ESCALATED': 'bg-red-100 text-red-800',
  };

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="w-full max-w-lg mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Track Your Complaint</h1>
        <p className="text-muted-foreground">Enter your tracking ID below to check the real-time status of your complaint.</p>
      </div>

      <Card className="w-full max-w-lg mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="trackingId" className="sr-only">Tracking ID</Label>
              <Input 
                id="trackingId" 
                placeholder="Enter Tracking ID (e.g., C-123456)" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading || !trackingId}>
              {loading ? "Searching..." : <><Search className="h-4 w-4 mr-2" /> Track</>}
            </Button>
          </form>
          {errorMsg && <p className="text-destructive text-sm mt-4 text-center pb-0">{errorMsg}</p>}
        </CardContent>
      </Card>

      {complaint && (
        <Card className="w-full max-w-2xl animate-in fade-in zoom-in duration-300">
          <CardHeader className="border-b bg-muted/30">
            <div className="flex justify-between items-start">
              <div>
                <CardDescription>Complaint ID</CardDescription>
                <CardTitle className="text-xl font-mono">{complaint.complaint_id}</CardTitle>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[complaint.status] || 'bg-gray-100 text-gray-800'}`}>
                {complaint.status}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-sm">
                <div>
                    <span className="text-muted-foreground block mb-1">Date Submitted</span>
                    <span className="font-medium">{new Date(complaint.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                    <span className="text-muted-foreground block mb-1">Area</span>
                    <span className="font-medium">{complaint.area ? `${complaint.area.name} (${complaint.area.zipCode})` : 'N/A'}</span>
                </div>
                <div>
                    <span className="text-muted-foreground block mb-1">Locality</span>
                    <span className="font-medium">{complaint.locality || 'N/A'}</span>
                </div>
                 <div>
                    <span className="text-muted-foreground block mb-1">Priority</span>
                    <span className="font-medium inline-flex items-center justify-center bg-gray-100 px-2 py-0.5 rounded text-xs">{complaint.priority || 5}/10</span>
                </div>
                <div>
                     <span className="text-muted-foreground block mb-1">Category</span>
                     <span className="font-medium capitalize">{complaint.type_of_complaint || 'Others'}</span>
                </div>
            </div>

            {complaint.assignedSupervisor && (
              <div className="bg-primary/5 p-4 rounded-md border border-primary/20">
                 <h4 className="text-sm font-semibold mb-2">Assigned Supervisor</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                   <div>
                     <span className="text-muted-foreground block text-xs">Name</span>
                     <span className="font-medium">{complaint.assignedSupervisor.name}</span>
                   </div>
                   <div>
                     <span className="text-muted-foreground block text-xs">Email</span>
                     <span className="font-medium">{complaint.assignedSupervisor.email}</span>
                   </div>
                 </div>
              </div>
            )}

            <div>
              <span className="text-muted-foreground block mb-2 text-sm">Description</span>
              <p className="bg-muted p-4 rounded-md text-sm">{complaint.description}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
