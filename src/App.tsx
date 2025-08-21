import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from '@/contexts/AuthContext';
import Index from './pages/Index';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/admin/LoginPage';
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from './components/auth/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Router>
              <div className="min-h-screen bg-white">
                <Routes>
                  <Route path="/" element={<Index />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<LoginPage />} />
                  <Route 
                    path="/admin/*" 
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  >
                    <Route index element={<Navigate to="/admin" replace />} />
                  </Route>
                  
                  {/* 404 Route */}
                  <Route path="/404" element={<NotFound />} />
                  
                  {/* Fallback route */}
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
                
                <Toaster />
                <Sonner />
              </div>
            </Router>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
