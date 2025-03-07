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
    <div className="min-h-screen flex flex-col bg-gray-50 transition-all duration-300">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold transform hover:scale-105 transition-transform duration-200"
          >
            <HeartHandshake size={24} className="animate-pulse" />
            <span>Good2Give</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <span className="text bold transform hover:scale-105 transition-transform duration-200">{currentUser.name}</span>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-blue-700 px-3 py-1 rounded-md transition-all duration-300 hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <LogOut size={16} className="group-hover:animate-bounce" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-1 bg-blue-700 px-3 py-1 rounded-md transition-all duration-300 hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5"
              >
                <LogIn size={16} className="group-hover:animate-bounce" />
                <span>Login</span>
              </Link>
            )}
          </div>
          
          <button 
            className="md:hidden text-white transform hover:scale-110 transition-transform duration-200"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-blue-600 text-white overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
          {[
            { to: "/", icon: Home, text: "Home" },
            { to: "/listings", icon: Search, text: "Find Food" },
            ...(currentUser?.role === 'donor' ? [{ to: "/donate", icon: PlusCircle, text: "Donate Food" }] : []),
            { to: "/schedule", icon: Calendar, text: "Schedule" },
            { to: "/impact", icon: BarChart3, text: "Impact" },
          ].map((item) => (
            <Link 
              key={item.to}
              to={item.to}
              className="flex items-center space-x-2 py-2 transition-all duration-200 hover:pl-4 hover:bg-blue-700 rounded-md"
              onClick={closeMobileMenu}
            >
              <item.icon size={20} className="hover:animate-spin" />
              <span>{item.text}</span>
            </Link>
          ))}
          {currentUser ? (
            <button 
              onClick={() => {
                handleLogout();
                closeMobileMenu();
              }}
              className="flex items-center space-x-2 py-2 transition-all duration-200 hover:pl-4 hover:bg-blue-700 rounded-md"
            >
              <LogOut size={20} className="hover:animate-spin" />
              <span>Logout</span>
            </button>
          ) : (
            <Link 
              to="/login"
              className="flex items-center space-x-2 py-2 transition-all duration-200 hover:pl-4 hover:bg-blue-700 rounded-md"
              onClick={closeMobileMenu}
            >
              <LogIn size={20} className="hover:animate-spin" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar (desktop only) */}
        <aside className="hidden md:block w-64 bg-white shadow-md transform transition-all duration-300 hover:shadow-xl">
          <nav className="p-4 flex flex-col space-y-2">
            {[
              { to: "/", icon: Home, text: "Home" },
              { to: "/listings", icon: Search, text: "Find Food" },
              ...(currentUser?.role === 'donor' ? [{ to: "/donate", icon: PlusCircle, text: "Donate Food" }] : []),
              { to: "/schedule", icon: Calendar, text: "Schedule" },
              { to: "/impact", icon: BarChart3, text: "Impact" },
              { to: "/profile", icon: UserCircle, text: "Profile" },
            ].map((item) => (
              <Link 
                key={item.to}
                to={item.to}
                className={`flex items-center space-x-2 p-2 rounded-md transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md ${
                  location.pathname === item.to 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <item.icon size={20} className="hover:animate-pulse" />
                <span>{item.text}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto transition-all duration-300">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="transform transition-colors duration-300 hover:text-white">
              <h3 className="text-lg font-semibold mb-3">Good2Give</h3>
              <p className="text-gray-300 text-sm">
                Connecting surplus food with those who need it most. Together we can reduce food waste and fight hunger.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {['/', '/listings', '/donate', '/impact'].map((path, i) => (
                  <li key={i}>
                    <Link 
                      to={path} 
                      className="transition-all duration-200 hover:text-white hover:pl-2"
                    >
                      {['Home', 'Find Food', 'Donate Food', 'Our Impact'][i]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="transform transition-colors duration-300 hover:text-white">
              <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
              <p className="text-gray-300 text-sm">
                Email: info@Good2Give.org<br />
                Phone: 9666843549<br />
                Address: Anurag University,Hyderabad.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400 transition-colors duration-300 hover:text-white">
            © {new Date().getFullYear()} Good2Give. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;