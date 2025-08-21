import React, { useState } from 'react';
import { useNavigate, useLocation, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  LayoutDashboard, 
  Utensils, 
  Calendar, 
  LogOut, 
  Menu as MenuIcon, 
  Users,
  X
} from 'lucide-react';
import MenuEditor from '@/components/admin/MenuEditor';
import ReservationManager from '@/components/admin/ReservationManager';
import { cn } from '@/lib/utils';

// Mock data for demonstration
const mockOrders = [
  {
    id: 'ORD-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    paymentId: 'PAY-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
    deliveryOption: 'delivery',
    name: 'John Doe',
    phone: '+1234567890',
    email: 'john@example.com',
    address: '123 Main St, City',
    items: [
      { id: '1', name: 'Margherita Pizza', quantity: 2, price: 12.99 },
      { id: '2', name: 'Caesar Salad', quantity: 1, price: 8.99 },
    ],
    total: 34.97,
    timestamp: new Date().toISOString(),
  },
];

// Navigation items
const navItems = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin',
  },
  {
    name: 'Menu',
    icon: Utensils,
    path: '/admin/menu',
  },
  {
    name: 'Reservations',
    icon: Calendar,
    path: '/admin/reservations',
  },
  {
    name: 'Customers',
    icon: Users,
    path: '/admin/customers',
  },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Close sidebar on mobile when a nav item is clicked
  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <h1 className="text-xl font-bold text-amber-800">Crush Café</h1>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={handleNavClick}
                  className={cn(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors',
                    location.pathname === item.path
                      ? 'bg-amber-50 text-amber-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* Top bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
            
            <div className="flex-1 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
              </h2>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-700 mr-4">
                  Welcome, {user?.name || 'Admin'}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Routes>
                <Route 
                  path="menu/*" 
                  element={<MenuEditor />} 
                />
                <Route 
                  path="reservations" 
                  element={<ReservationManager />} 
                />
                <Route 
                  path="customers" 
                  element={(
                    <div className="bg-white rounded-lg shadow p-6">
                      <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
                      <p className="text-gray-500">Customer management features coming soon.</p>
                    </div>
                  )} 
                />
                <Route 
                  path="/" 
                  element={(
                    <div className="space-y-6">
                      <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <Card className="p-6">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Orders Today</h3>
                            <p className="text-3xl font-bold">24</p>
                          </Card>
                          <Card className="p-6">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Active Reservations</h3>
                            <p className="text-3xl font-bold">8</p>
                          </Card>
                          <Card className="p-6">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Menu Items</h3>
                            <p className="text-3xl font-bold">42</p>
                          </Card>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Recent Orders</h3>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to="/admin/orders">View All</Link>
                            </Button>
                          </div>
                          <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                <div>
                                  <p className="font-medium">Order #{Math.floor(1000 + Math.random() * 9000)}</p>
                                  <p className="text-sm text-gray-500">Table for {Math.floor(2 + Math.random() * 6)} • 30 min ago</p>
                                </div>
                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                  Completed
                                </span>
                              </div>
                            ))}
                          </div>
                        </Card>
                        
                        <Card className="p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Upcoming Reservations</h3>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to="/admin/reservations">View All</Link>
                            </Button>
                          </div>
                          <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                <div>
                                  <p className="font-medium">Reservation #{Math.floor(1000 + Math.random() * 9000)}</p>
                                  <p className="text-sm text-gray-500">Today • {7 + i}:00 PM • {2 + i} people</p>
                                </div>
                                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                  Confirmed
                                </span>
                              </div>
                            ))}
                          </div>
                        </Card>
                      </div>
                    </div>
                  )} 
                />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
