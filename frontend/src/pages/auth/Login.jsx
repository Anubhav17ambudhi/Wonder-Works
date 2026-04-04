import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Shield, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    const { success, message, user } = await login(email, password, 'default');
    
    if (success) {
      // Determine redirection
      const destination = location.state?.from?.pathname || `/${user.role?.toLowerCase()}`;
      navigate(destination, { replace: true });
    } else {
      setErrorMsg(message || 'Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted/40">
      {/* Left side brand banner */}
      <div className="hidden md:flex flex-col justify-center w-1/3 bg-primary text-primary-foreground p-12">
        <Shield className="h-16 w-16 mb-4" />
        <h1 className="text-4xl font-bold mb-4">Wonder-Works</h1>
        <p className="text-lg opacity-80">
          Official staff portal for Municipal Complaint Management. Use this portal to track, update, and resolve local issues.
        </p>
      </div>

      {/* Right side login form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Link to="/" className="absolute top-4 left-4 text-sm md:hidden flex items-center gap-2 text-primary font-bold">
            <Shield className="h-5 w-5" /> Wonder-Works
        </Link>
        <Card className="w-full max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {errorMsg && (
                <div className="p-3 text-sm rounded-md bg-destructive/15 text-destructive font-medium text-center">
                  {errorMsg}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {/* For future implementation if requested */}
                  <Link to="/forgot-password" className="text-xs text-primary underline-offset-4 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
