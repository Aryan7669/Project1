import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LogIn, Leaf ,HeartHandshake} from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // For page fade-in animation
  
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Demo accounts for easy login
  const demoAccounts = [
    { name: 'Fresh Foods Market (Donor)', email: 'contact@freshfoods.com' },
    { name: 'Community Kitchen (Recipient)', email: 'info@communitykitchen.org' },
    { name: 'Bread & Butter Bakery (Donor)', email: 'hello@breadbutter.com' },
    { name: 'Hope Shelter (Recipient)', email: 'contact@hopeshelter.org' }
  ];

  const loginAsDemoUser = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password'); // In a real app, this would be a secure password
  };

  // Trigger fade-in animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}>
      <div className="p-6">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full transition-all duration-500 animate-bounce-once">
            <HeartHandshake className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 transition-all duration-300 hover:text-gray-600">
          Log in to Good2Give
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 transition-all duration-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2 transition-all duration-300 hover:text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2 transition-all duration-300 hover:text-gray-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Logging in...</span>
            ) : (
              <>
                <LogIn className="h-5 w-5 mr-2" />
                <span>Log In</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6">
          <p className="text-center text-gray-600 mb-4 transition-all duration-300 hover:text-gray-800">
            Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-700 transition-colors duration-300">Sign up</Link>
          </p>

          <div className="border-t border-gray-300 pt-4">
            <p className="text-center text-gray-600 mb-4 transition-all duration-300 hover:text-gray-800">
              For demo purposes, you can log in as:
            </p>
            <div className="space-y-2">
              {demoAccounts.map((account, index) => (
                <button
                  key={index}
                  onClick={() => loginAsDemoUser(account.email)}
                  className="w-full text-left px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-102 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }} // Staggered animation
                >
                  {account.name}
                </button>
              ))}
            </div>
            <p className="text-center text-gray-500 text-xs mt-2 transition-all duration-300 hover:text-gray-700">
              (Use any password for demo accounts)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;