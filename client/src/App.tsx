import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/auth/Login";
import SupervisorLogin from "./pages/auth/SupervisorLogin";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllComplaints from "./pages/admin/AllComplaints";
import EscalatedComplaints from "./pages/admin/EscalatedComplaints";
import AreasManagement from "./pages/admin/AreasManagement";
import Templates from "./pages/admin/Templates";
import Analytics from "./pages/admin/Analytics";

// Supervisor Pages
import SupervisorDashboard from "./pages/supervisor/SupervisorDashboard";
import MyComplaints from "./pages/supervisor/MyComplaints";

// Citizen Pages
import RegisterComplaint from "./pages/citizen/RegisterComplaint";
import TrackComplaint from "./pages/citizen/TrackComplaint";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/supervisor/login" element={<SupervisorLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Citizen Routes */}
          <Route path="/register-complaint" element={<RegisterComplaint />} />
          <Route path="/track-complaint" element={<TrackComplaint />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/complaints" element={<AllComplaints />} />
          <Route path="/admin/escalated" element={<EscalatedComplaints />} />
          <Route path="/admin/areas" element={<AreasManagement />} />
          <Route path="/admin/templates" element={<Templates />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          
          {/* Supervisor Routes */}
          <Route path="/supervisor" element={<SupervisorDashboard />} />
          <Route path="/supervisor/complaints" element={<MyComplaints />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
