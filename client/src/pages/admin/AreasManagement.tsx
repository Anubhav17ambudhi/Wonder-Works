import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { sampleAreas, sampleComplaints } from '@/data/sampleData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { MapPin, Plus, Building, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AreasManagement() {
  const [newAreaName, setNewAreaName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddArea = () => {
    if (newAreaName.trim()) {
      toast({
        title: 'Area Added',
        description: `${newAreaName} has been added successfully.`,
      });
      setNewAreaName('');
      setIsDialogOpen(false);
    }
  };

  return (
    <DashboardLayout role="admin" userName="Mayor Johnson">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Areas & Localities</h1>
            <p className="text-muted-foreground">
              Manage city areas and their localities
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Area
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Area</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="areaName">Area Name</Label>
                  <Input
                    id="areaName"
                    placeholder="Enter area name"
                    value={newAreaName}
                    onChange={(e) => setNewAreaName(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddArea} className="w-full">
                  Add Area
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Areas Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sampleAreas.map((area) => {
            const areaComplaints = sampleComplaints.filter((c) => c.areaId === area.id);
            const pendingCount = areaComplaints.filter((c) => c.status === 'pending').length;
            const resolvedCount = areaComplaints.filter((c) => c.status === 'resolved').length;

            return (
              <Card key={area.id} className="shadow-card hover:shadow-elevated transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{area.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {area.localities.length} localities
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold">{areaComplaints.length}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                    <div className="text-center p-3 bg-status-pending-bg rounded-lg">
                      <p className="text-2xl font-bold text-status-pending">{pendingCount}</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                    <div className="text-center p-3 bg-status-resolved-bg rounded-lg">
                      <p className="text-2xl font-bold text-status-resolved">{resolvedCount}</p>
                      <p className="text-xs text-muted-foreground">Resolved</p>
                    </div>
                  </div>

                  {/* Localities */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Localities</p>
                    <div className="flex flex-wrap gap-2">
                      {area.localities.map((locality) => (
                        <span
                          key={locality.id}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs"
                        >
                          <Building className="h-3 w-3" />
                          {locality.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
