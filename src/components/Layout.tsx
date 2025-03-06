import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  Search, 
  PlusCircle, 
  Calendar, 
  BarChart3, 
  LogOut, 
  LogIn, 
  UserCircle, 
  Menu, 
  X,
  HeartHandshake
} from 'lucide-react';

const Layout: React.FC = () => {
  const { currentUser, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center ">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <HeartHandshake size={24} />
            <span>Good2Give</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <span className="text-sm">{currentUser.name}</span>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded-md transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-1 bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded-md transition-colors"
              >
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            )}
          </div>
          
          <button 
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-600 text-white">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
            <Link 
              to="/" 
              className="flex items-center space-x-2 py-2"
              onClick={closeMobileMenu}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link 
              to="/listings" 
              className="flex items-center space-x-2 py-2"
              onClick={closeMobileMenu}
            >
              <Search size={20} />
              <span>Find Food</span>
            </Link>
            {currentUser?.role === 'donor' && (
              <Link 
                to="/donate" 
                className="flex items-center space-x-2 py-2"
                onClick={closeMobileMenu}
              >
                <PlusCircle size={20} />
                <span>Donate Food</span>
              </Link>
            )}
            <Link 
              to="/schedule" 
              className="flex items-center space-x-2 py-2"
              onClick={closeMobileMenu}
            >
              <Calendar size={20} />
              <span>Schedule</span>
            </Link>
            <Link 
              to="/impact" 
              className="flex items-center space-x-2 py-2"
              onClick={closeMobileMenu}
            >
              <BarChart3 size={20} />
              <span>Impact</span>
            </Link>
            {currentUser ? (
              <button 
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="flex items-center space-x-2 py-2"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-2 py-2"
                onClick={closeMobileMenu}
              >
                <LogIn size={20} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar (desktop only) */}
        <aside className="hidden md:block w-64 bg-white shadow-md">
          <nav className="p-4 flex flex-col space-y-2">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 p-2 rounded-md ${
                location.pathname === '/' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link 
              to="/listings" 
              className={`flex items-center space-x-2 p-2 rounded-md ${
                location.pathname === '/listings' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <Search size={20} />
              <span>Find Food</span>
            </Link>
            {currentUser?.role === 'donor' && (
              <Link 
                to="/donate" 
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  location.pathname === '/donate' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <PlusCircle size={20} />
                <span>Donate Food</span>
              </Link>
            )}
            <Link 
              to="/schedule" 
              className={`flex items-center space-x-2 p-2 rounded-md ${
                location.pathname === '/schedule' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <Calendar size={20} />
              <span>Schedule</span>
            </Link>
            <Link 
              to="/impact" 
              className={`flex items-center space-x-2 p-2 rounded-md ${
                location.pathname === '/impact' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <BarChart3 size={20} />
              <span>Impact</span>
            </Link>
            <Link 
              to="/profile" 
              className={`flex items-center space-x-2 p-2 rounded-md ${
                location.pathname === '/profile' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <UserCircle size={20} />
              <span>Profile</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Good2Give</h3>
              <p className="text-gray-300 text-sm">
                Connecting surplus food with those who need it most. Together we can reduce food waste and fight hunger.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/listings" className="hover:text-white">Find Food</Link></li>
                <li><Link to="/donate" className="hover:text-white">Donate Food</Link></li>
                <li><Link to="/impact" className="hover:text-white">Our Impact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
              <p className="text-gray-300 text-sm">
                Email: info@Good2Give.org<br />
                Phone: (123) 456-7890<br />
                Address: 123 Green Street, San Francisco, CA 94110
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Good2Give. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;