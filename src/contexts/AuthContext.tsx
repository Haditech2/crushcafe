import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff';
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on initial load
    const checkAuth = async () => {
      try {
        // In a real app, you would verify the session with your backend
        const token = localStorage.getItem('authToken');
        if (token) {
          // Verify token with backend in a real app
          // const response = await fetch('/api/auth/verify', { headers: { Authorization: `Bearer ${token}` } });
          // const userData = await response.json();
          // setUser(userData);
          
          // For demo, we'll just check if token exists
          setUser({
            id: 'demo-admin',
            email: 'admin@crushcafe.com',
            name: 'Admin User',
            role: 'admin'
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call to your backend
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();
      
      // For demo, we'll use hardcoded credentials
      if (email === 'admin@crushcafe.com' && password === 'admin123') {
        const demoUser = {
          id: 'demo-admin',
          email: 'admin@crushcafe.com',
          name: 'Admin User',
          role: 'admin' as const
        };
        
        setUser(demoUser);
        localStorage.setItem('authToken', 'demo-token');
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
