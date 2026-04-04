import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [loading, setLoading] = useState(false); // Used for login action

  useEffect(() => {
    // Check if we have a persisted user session
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth check failed", error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setIsInitializing(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password, role) => {
    try {
      setLoading(true);
      const response = await api.post('/user/login', { email, password, role });
      
      const { user: userData, token } = response.data;
      
      // Persist auth
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.get('/user/logout');
    } catch(err) {
       console.error(err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading, isInitializing }}>
        {!isInitializing && children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context easily
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
