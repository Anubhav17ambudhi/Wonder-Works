import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Shield, Users, ClipboardList, ArrowRight, CheckCircle, Sparkles, BarChart3, MapPin } from 'lucide-react';
import heroCity from '@/assets/hero-city.jpg';
import registerComplaintImg from '@/assets/register-complaint.png';
import assignmentTrackingImg from '@/assets/assignment-tracking.png';
import analyticsResolutionImg from '@/assets/analytics-resolution.png';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroCity} 
            alt="City skyline" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,55%,12%)] via-[hsl(220,55%,12%,0.9)] to-[hsl(220,55%,12%,0.7)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,55%,12%)] via-transparent to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in border border-white/10">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm text-white/90">City Complaint Management Portal</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in leading-tight">
              Your Voice,{' '}
              <span className="text-gradient">Our Action</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/75 mb-8 animate-fade-in max-w-2xl leading-relaxed">
              A streamlined platform for citizens to report issues and for city officials 
              to efficiently manage and resolve community complaints.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Link to="/register-complaint">
                <Button size="lg" className="w-full sm:w-auto gradient-accent hover:opacity-90 text-white border-0 shadow-lg shadow-accent/25">
                  <ClipboardList className="mr-2 h-5 w-5" />
                  Register a Complaint
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                  <Shield className="mr-2 h-5 w-5" />
                  Official Login
                </Button>
              </Link>
            </div>

            {/* Stats Strip */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10 animate-fade-in">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">2,500+</p>
                <p className="text-sm text-white/60">Complaints Resolved</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">48h</p>
                <p className="text-sm text-white/60">Avg. Response Time</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">95%</p>
                <p className="text-sm text-white/60">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Simple & Efficient Process
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our complaint management system ensures every concern is heard and addressed promptly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-card hover:shadow-elevated transition-all border-0 animate-fade-in group overflow-hidden">
            <CardHeader className="pb-4">
              <div className="h-48 -mx-6 -mt-6 mb-4 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                <img 
                  src={registerComplaintImg} 
                  alt="Register Complaint" 
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
                  <ClipboardList className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">Step 1</span>
              </div>
              <CardTitle className="text-xl">Register Complaint</CardTitle>
              <CardDescription>
                Citizens can easily submit complaints with details about their location and issue type.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  Simple registration form
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  Category selection
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  Location-based filing
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-all border-0 animate-fade-in group overflow-hidden md:-mt-4">
            <CardHeader className="pb-4">
              <div className="h-48 -mx-6 -mt-6 mb-4 overflow-hidden bg-gradient-to-br from-secondary/5 to-accent/5">
                <img 
                  src={assignmentTrackingImg} 
                  alt="Assignment & Tracking" 
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-xl gradient-secondary flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded-full">Step 2</span>
              </div>
              <CardTitle className="text-xl">Assignment & Tracking</CardTitle>
              <CardDescription>
                Supervisors assign complaints to workers and track progress in real-time.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  Area-wise distribution
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  Worker assignment
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  Real-time status updates
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-all border-0 animate-fade-in group overflow-hidden">
            <CardHeader className="pb-4">
              <div className="h-48 -mx-6 -mt-6 mb-4 overflow-hidden bg-gradient-to-br from-accent/5 to-primary/5">
                <img 
                  src={analyticsResolutionImg} 
                  alt="Analytics & Resolution" 
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-xl gradient-accent flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">Step 3</span>
              </div>
              <CardTitle className="text-xl">Resolution & Analytics</CardTitle>
              <CardDescription>
                The Mayor's office monitors all complaints and views analytics for better governance.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  Dashboard analytics
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  Heatmap visualization
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  Performance metrics
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Quick Access Portal</h2>
            <p className="text-muted-foreground">Choose your role to access the appropriate dashboard</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link to="/login" className="group">
              <Card className="h-full shadow-card hover:shadow-elevated transition-all border-0 group-hover:border-primary/20 overflow-hidden">
                <div className="h-2 gradient-primary" />
                <CardContent className="p-8 text-center">
                  <div className="h-20 w-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/25">
                    <Building2 className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Mayor / Admin</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access the administrative dashboard with full control over city complaints
                  </p>
                  <div className="flex items-center justify-center gap-2 text-primary font-medium">
                    Login as Admin
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/supervisor/login" className="group">
              <Card className="h-full shadow-card hover:shadow-elevated transition-all border-0 group-hover:border-secondary/20 overflow-hidden">
                <div className="h-2 gradient-secondary" />
                <CardContent className="p-8 text-center">
                  <div className="h-20 w-20 rounded-2xl gradient-secondary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-secondary/25">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Supervisor</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage area complaints and assign tasks to field workers
                  </p>
                  <div className="flex items-center justify-center gap-2 text-secondary font-medium">
                    Login as Supervisor
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/register-complaint" className="group sm:col-span-2 lg:col-span-1">
              <Card className="h-full shadow-card hover:shadow-elevated transition-all border-0 group-hover:border-accent/20 overflow-hidden">
                <div className="h-2 gradient-accent" />
                <CardContent className="p-8 text-center">
                  <div className="h-20 w-20 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-accent/25">
                    <ClipboardList className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Citizen</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Register a new complaint or track status of existing ones
                  </p>
                  <div className="flex items-center justify-center gap-2 text-accent font-medium">
                    File a Complaint
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Track Complaint CTA */}
          <div className="mt-12 text-center">
            <Link to="/track-complaint">
              <Button variant="outline" size="lg" className="gap-2">
                <MapPin className="h-5 w-5" />
                Track Existing Complaint
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg">City Complaint Portal</span>
                <p className="text-xs text-muted-foreground">Making cities better, together</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/register-complaint" className="hover:text-foreground transition-colors">Register</Link>
              <Link to="/track-complaint" className="hover:text-foreground transition-colors">Track</Link>
              <Link to="/login" className="hover:text-foreground transition-colors">Admin</Link>
              <Link to="/supervisor/login" className="hover:text-foreground transition-colors">Supervisor</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 City Municipal Corporation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
