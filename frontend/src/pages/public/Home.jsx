import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowRight, FileText, CheckCircle, Clock, ShieldAlert,
  Bot, MapPin, Bell, Users, Shield, TrendingUp, Zap, Building2
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

export default function Home() {
  const [stats, setStats] = useState({ total: 0, resolved: 0, inProgress: 0 });
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user?.role) {
    return <Navigate to={`/${user.role.toLowerCase()}`} replace />;
  }

  useEffect(() => {
    // Public stats placeholder — can be wired to a public endpoint later
    setStats({ total: 1250, resolved: 890, inProgress: 240 });
  }, []);

  return (
    <div className="flex flex-col">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-primary/5 py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto flex flex-col items-center text-center relative z-10">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Zap className="h-3.5 w-3.5" /> AI-Powered Municipal Services
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            City Services at Your <span className="text-primary">Fingertips</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
            Report local issues, track resolution progress, and help us build a cleaner, safer, and better city for everyone.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/file-complaint">
              <Button size="lg" className="rounded-full gap-2">
                File a Complaint <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/track-complaint">
              <Button size="lg" variant="outline" className="rounded-full">
                Track Status
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── BANNER IMAGE ── */}
      <section className="relative h-56 md:h-72 overflow-hidden">
        <img
          src="/city_banner.png"
          alt="City Services Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-8">
          <div className="text-center text-white">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight drop-shadow-lg">
              City Services at Your Fingertips
            </h2>
            <p className="text-sm md:text-base text-white/80 mt-1">
              Powered by AI — Transparent, Fast, Accountable
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-background px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-t-4 border-t-primary">
              <CardContent className="pt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Complaints</p>
                  <h3 className="text-3xl font-bold mt-2">{stats.total.toLocaleString()}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <FileText className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-green-500">
              <CardContent className="pt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved Issues</p>
                  <h3 className="text-3xl font-bold mt-2 text-green-600">{stats.resolved.toLocaleString()}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-amber-500">
              <CardContent className="pt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <h3 className="text-3xl font-bold mt-2 text-amber-600">{stats.inProgress.toLocaleString()}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <Clock className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 bg-muted/30 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
            A streamlined 3-step process that gets your complaint from submission to resolution efficiently.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldAlert, step: '1', title: 'Report Issue', desc: 'Provide details and photos of the problem in your locality. Our system accepts reports 24/7.' },
              { icon: Clock, step: '2', title: 'AI Processing', desc: 'Our Gemini AI classifies the complaint, sets priority, and routes it to the responsible department supervisor.' },
              { icon: CheckCircle, step: '3', title: 'Resolution', desc: 'Track live updates via your tracking ID. Get email notifications when the issue is resolved.' },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="flex flex-col items-center">
                <div className="relative h-16 w-16 rounded-full bg-background shadow-md flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {step}
                  </span>
                </div>
                <h4 className="text-xl font-semibold mb-2">{title}</h4>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KNOWLEDGE / ABOUT THE SYSTEM ── */}
      <section className="py-16 bg-background px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About Wonder-Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Wonder-Works is a next-generation civic complaint management system built to bridge
              the gap between citizens and municipal authorities using the power of AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Bot,
                color: 'text-violet-600',
                bg: 'bg-violet-100',
                title: 'AI-Powered Classification',
                desc: 'Every complaint is automatically analyzed by Google Gemini AI. It determines the category (e.g. Road, Garbage, Water) and assigns a priority score from 1–10 based on urgency and severity.',
              },
              {
                icon: Users,
                color: 'text-blue-600',
                bg: 'bg-blue-100',
                title: 'Smart Supervisor Assignment',
                desc: 'Complaints are intelligently routed to the right supervisor based on their designated area and category expertise — ensuring no complaint falls through the cracks.',
              },
              {
                icon: Bell,
                color: 'text-amber-600',
                bg: 'bg-amber-100',
                title: 'Real-time Email Alerts',
                desc: 'Citizens receive instant email confirmations with a Tracking ID when they file. Supervisors are notified on assignment. You receive a final update when the issue is resolved.',
              },
              {
                icon: MapPin,
                color: 'text-green-600',
                bg: 'bg-green-100',
                title: 'Area & Locality Mapping',
                desc: 'Complaints are geo-tagged to specific areas and localities using the city\'s administrative zone database, allowing hyper-local routing and accurate reporting.',
              },
              {
                icon: TrendingUp,
                color: 'text-rose-600',
                bg: 'bg-rose-100',
                title: 'Escalation Mechanism',
                desc: 'Unresolved complaints that linger too long are automatically escalated to the Mayor\'s dashboard for direct intervention — keeping accountability at every level.',
              },
              {
                icon: Shield,
                color: 'text-teal-600',
                bg: 'bg-teal-100',
                title: 'Transparent Tracking',
                desc: 'Every citizen gets a unique Tracking ID sent to their email. They can check live status — from Open → In Progress → Resolved — without needing to register.',
              },
            ].map(({ icon: Icon, color, bg, title, desc }) => (
              <Card key={title} className="hover:shadow-md transition-shadow h-full">
                <CardContent className="pt-6 flex flex-col gap-3 h-full">
                  <div className={`h-10 w-10 rounded-lg ${bg} flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <h4 className="font-semibold text-base">{title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES HANDLED ── */}
      <section className="py-16 bg-muted/30 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Categories We Handle</h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Our system covers the full spectrum of municipal service complaints across the city.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Street Light', 'Public Toilet', 'Tax and Licence', 'Garbage',
              'Water Stagnation', 'Storm Water Drains', 'Floods',
              'Park and Playground', 'Road and Footpaths', 'Water Supply',
              'Sewerage & Manholes', 'Air Quality', 'Noise Pollution', 'Stray Animals',
            ].map(cat => (
              <span
                key={cat}
                className="bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER ── */}
      <section className="py-20 bg-primary text-primary-foreground px-4">
        <div className="container mx-auto flex flex-col items-center text-center gap-6">
          <Building2 className="h-12 w-12 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold">
            Your Voice Makes the City Better
          </h2>
          <p className="text-primary-foreground/80 max-w-xl text-lg">
            Every complaint filed is a step towards a smarter, cleaner city. Don't wait — report an issue today.
          </p>
          <Link to="/file-complaint">
            <Button size="lg" variant="secondary" className="rounded-full gap-2 font-semibold">
              File a Complaint Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
