import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Search, ArrowLeft, CheckCircle, Clock, Loader2, AlertTriangle } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';
import { sampleComplaints, sampleAreas } from '@/data/sampleData';
import { format } from 'date-fns';

export default function TrackComplaint() {
  const [referenceId, setReferenceId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [complaint, setComplaint] = useState<typeof sampleComplaints[0] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate search - in production, this would query the database
    setTimeout(() => {
      // For demo, show the first complaint
      const found = sampleComplaints[0];
      setComplaint(found);
      setSearched(true);
      setIsSearching(false);
    }, 1000);
  };

  const area = complaint ? sampleAreas.find((a) => a.id === complaint.areaId) : null;
  const locality = area?.localities.find((l) => l.id === complaint?.localityId);

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'pending':
        return 1;
      case 'in_progress':
        return 2;
      case 'resolved':
        return 4;
      case 'escalated':
        return 3;
      default:
        return 1;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-semibold">City Complaint Portal</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <Search className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Track Your Complaint</h1>
          <p className="text-muted-foreground">
            Enter your complaint reference number to check the status.
          </p>
        </div>

        {/* Search Form */}
        <Card className="shadow-card border-0 mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="reference" className="sr-only">
                  Reference Number
                </Label>
                <Input
                  id="reference"
                  placeholder="Enter complaint reference (e.g., CMP-2024-1234)"
                  value={referenceId}
                  onChange={(e) => setReferenceId(e.target.value)}
                  className="h-12"
                />
              </div>
              <Button type="submit" size="lg" disabled={isSearching}>
                {isSearching ? 'Searching...' : 'Track'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {searched && complaint && (
          <Card className="shadow-card border-0 animate-fade-in">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle>{complaint.title}</CardTitle>
                  <CardDescription className="mt-1">
                    Reference: CMP-2024-{complaint.id.split('-')[1]}
                  </CardDescription>
                </div>
                <StatusBadge status={complaint.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Timeline */}
              <div className="space-y-4">
                <h3 className="font-medium">Status Timeline</h3>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted" />
                  <div className="space-y-6">
                    {[
                      { step: 1, label: 'Registered', icon: CheckCircle, status: 'completed' },
                      { step: 2, label: 'In Progress', icon: Loader2, status: getStatusStep(complaint.status) >= 2 ? 'completed' : 'pending' },
                      { step: 3, label: complaint.status === 'escalated' ? 'Escalated' : 'Review', icon: AlertTriangle, status: complaint.status === 'escalated' ? 'escalated' : (getStatusStep(complaint.status) >= 3 ? 'completed' : 'pending') },
                      { step: 4, label: 'Resolved', icon: CheckCircle, status: complaint.status === 'resolved' ? 'completed' : 'pending' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-4">
                        <div
                          className={`relative z-10 h-8 w-8 rounded-full flex items-center justify-center ${
                            item.status === 'completed'
                              ? 'bg-status-resolved text-white'
                              : item.status === 'escalated'
                              ? 'bg-status-escalated text-white'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className={`font-medium ${item.status === 'pending' ? 'text-muted-foreground' : ''}`}>
                            {item.label}
                          </p>
                          {item.status === 'completed' && (
                            <p className="text-xs text-muted-foreground">
                              {format(complaint.updatedAt, 'MMM dd, yyyy')}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Complaint Details */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium">Complaint Details</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Category</p>
                    <p className="font-medium">{complaint.category}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium">{area?.name} - {locality?.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Submitted On</p>
                    <p className="font-medium">{format(complaint.createdAt, 'MMM dd, yyyy')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Updated</p>
                    <p className="font-medium">{format(complaint.updatedAt, 'MMM dd, yyyy')}</p>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Description</p>
                  <p className="text-sm">{complaint.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {searched && !complaint && (
          <Card className="shadow-card border-0 text-center py-12 animate-fade-in">
            <CardContent>
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Complaint Found</h3>
              <p className="text-muted-foreground">
                Please check your reference number and try again.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
