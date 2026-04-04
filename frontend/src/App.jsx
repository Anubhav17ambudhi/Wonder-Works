import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import PublicLayout from './components/layout/PublicLayout';

import Home from './pages/public/Home';
import FileComplaint from './pages/public/FileComplaint';
import TrackComplaint from './pages/public/TrackComplaint';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

import SupervisorDashboard from './pages/supervisor/SupervisorDashboard';
import MayorOverview from './pages/mayor/MayorOverview';
import MayorEscalated from './pages/mayor/MayorEscalated';
import MayorAnalytics from './pages/mayor/MayorAnalytics';
import MayorAssignments from './pages/mayor/MayorAssignments';
import DashboardLayout from './components/layout/DashboardLayout';
import UpdatePassword from './pages/shared/UpdatePassword';
import { Spinner } from './components/ui/Spinner';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) return <Spinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user?.role?.toLowerCase())) {
    // If not authorized for this role, redirect to appropriate home
    return <Navigate to="/" replace />;
  }
  return children;
};

// Role based auth redirect helper
const DashboardRouter = () => {
    const { user, isAuthenticated, isInitializing } = useAuth();
    if (isInitializing) return <Spinner />;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    
    // Add safety formatting 
    const role = user?.role?.toLowerCase();
    if (role === 'mayor') return <Navigate to="/mayor" replace />;
    if (role === 'supervisor') return <Navigate to="/supervisor" replace />;
    
    return <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes Wrapped in Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/file-complaint" element={<FileComplaint />} />
          <Route path="/track-complaint" element={<TrackComplaint />} />
        </Route>
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        
        {/* Dashboard Router */}
        <Route path="/dashboard" element={<DashboardRouter />} />

        {/* Dashboard Routes Wrapped in DashboardLayout */}
        <Route element={<DashboardLayout />}>
          <Route 
            path="/supervisor" 
            element={
              <ProtectedRoute allowedRoles={['supervisor']}>
                <SupervisorDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/supervisor/settings" element={<ProtectedRoute allowedRoles={['supervisor']}><UpdatePassword /></ProtectedRoute>} />
          
          <Route path="/mayor"         element={<ProtectedRoute allowedRoles={['mayor']}><MayorOverview /></ProtectedRoute>} />
          <Route path="/mayor/escalated" element={<ProtectedRoute allowedRoles={['mayor']}><MayorEscalated /></ProtectedRoute>} />
          <Route path="/mayor/analytics" element={<ProtectedRoute allowedRoles={['mayor']}><MayorAnalytics /></ProtectedRoute>} />
          <Route path="/mayor/assignments" element={<ProtectedRoute allowedRoles={['mayor']}><MayorAssignments /></ProtectedRoute>} />
          <Route path="/mayor/settings" element={<ProtectedRoute allowedRoles={['mayor']}><UpdatePassword /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
