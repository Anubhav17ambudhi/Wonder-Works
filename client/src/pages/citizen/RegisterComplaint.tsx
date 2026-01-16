import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Building2, ClipboardList, ArrowLeft, CheckCircle, Send } from 'lucide-react';
import { sampleAreas, complaintCategories } from '@/data/sampleData';
import { useToast } from '@/hooks/use-toast';

export default function RegisterComplaint() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    areaId: '',
    localityId: '',
    category: '',
    title: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const selectedArea = sampleAreas.find((a) => a.id === formData.areaId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: 'Complaint Registered!',
        description: 'Your complaint has been submitted successfully.',
      });
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-elevated border-0 text-center">
          <CardContent className="pt-12 pb-8">
            <div className="h-20 w-20 rounded-full bg-status-resolved-bg flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-status-resolved" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Complaint Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Your complaint has been registered successfully. You will receive updates via email.
            </p>
            <div className="bg-muted rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground">Complaint Reference</p>
              <p className="text-lg font-bold font-mono">CMP-2024-{Math.floor(Math.random() * 10000)}</p>
            </div>
            <div className="space-y-3">
              <Link to="/track-complaint" className="block">
                <Button className="w-full">Track Complaint Status</Button>
              </Link>
              <Link to="/" className="block">
                <Button variant="outline" className="w-full">Back to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <div className="h-14 w-14 rounded-2xl gradient-secondary flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="h-7 w-7 text-secondary-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Register a Complaint</h1>
          <p className="text-muted-foreground">
            Fill in the details below to submit your complaint to the city authorities.
          </p>
        </div>

        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Complaint Details</CardTitle>
            <CardDescription>
              Please provide accurate information for faster resolution.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Your Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Location
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Area *</Label>
                    <Select
                      value={formData.areaId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, areaId: value, localityId: '' })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        {sampleAreas.map((area) => (
                          <SelectItem key={area.id} value={area.id}>
                            {area.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Locality *</Label>
                    <Select
                      value={formData.localityId}
                      onValueChange={(value) => setFormData({ ...formData, localityId: value })}
                      disabled={!formData.areaId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select locality" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedArea?.localities.map((locality) => (
                          <SelectItem key={locality.id} value={locality.id}>
                            {locality.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Complaint Details */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Complaint Information
                </h3>
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {complaintCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Subject / Title *</Label>
                  <Input
                    id="title"
                    placeholder="Brief title for your complaint"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide detailed information about your complaint..."
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Complaint
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
