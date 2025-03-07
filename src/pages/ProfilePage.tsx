import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, LogOut, AlertCircle } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [organization, setOrganization] = useState(currentUser?.organization || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [shakeRequired, setShakeRequired] = useState(false); // For animation trigger
  const [isFormVisible, setIsFormVisible] = useState(false); // For fade-in animation

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md text-center transition-all duration-300">
        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4 transition-all duration-500 animate-bounce " />
        <h2 className="text-2xl font-bold mb-4 text-gray-800 transition-all duration-300 hover:text-gray-600">Login Required</h2>
        <p className="text-gray-600 mb-6 transition-all duration-300 hover:text-gray-700">
          You need to be logged in to view your profile.
        </p>
        <button 
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md font-medium transition-all duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Log In
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      setShakeRequired(true);
      setTimeout(() => setShakeRequired(false), 500); // Reset shake after animation
      return;
    }
    // In a real app, this would update the user profile
    setIsEditing(false);
  };

  // Trigger fade-in animation when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setIsFormVisible(true);
    }
  }, [isEditing]);

  return (
    <div className="max-w-4xl mx-auto transition-all duration-300">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 ease-in-out hover:shadow-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 transition-all duration-300">
            <h1 className="text-2xl font-bold text-gray-800 transition-all duration-300 hover:text-gray-600">Your Profile</h1>

            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-700 transition-all duration-300 ease-in-out hover:shadow-md"
            >
              <LogOut className="h-5 w-5 mr-1 transition-all duration-300" />
              <span>Logout</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8 transition-all duration-300">
            <div className="md:w-1/3 flex flex-col items-center transition-all duration-300">
              <div className="bg-gray-100 rounded-full p-6 mb-4 transition-all duration-300 hover:bg-gray-200">
                <User className="h-20 w-20 text-gray-500 transition-all duration-300" />
              </div>

              <h2 className="text-xl font-semibold text-center transition-all duration-300 hover:text-gray-600">{currentUser.name}</h2>
              <p className="text-gray-600 capitalize transition-all duration-300 hover:text-gray-700">{currentUser.role}</p>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="md:w-2/3 transition-all duration-300">
              {isEditing ? (
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className={`space-y-6 ${isFormVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 transition-all duration-300">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 transition-all duration-300 hover:text-gray-900">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 ${shakeRequired && !name.trim() ? 'animate-shake' : ''}`}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 transition-all duration-300 hover:text-gray-900">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 ${shakeRequired && !email.trim() ? 'animate-shake' : ''}`}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1 transition-all duration-300 hover:text-gray-900">
                        Organization
                      </label>
                      <input
                        type="text"
                        id="organization"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 transition-all duration-300 hover:text-gray-900">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1 transition-all duration-300 hover:text-gray-900">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 transition-all duration-300">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6 transition-all duration-300">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2 transition-all duration-300 hover:text-gray-600">Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-300">
                      <div>
                        <p className="text-sm font-medium text-gray-500 transition-all duration-300 hover:text-gray-700">Name</p>
                        <p className="text-gray-800 transition-all duration-300 hover:text-gray-600">{currentUser.name}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-500 transition-all duration-300 hover:text-gray-700">Email</p>
                        <p className="text-gray-800 transition-all duration-300 hover:text-gray-600">{currentUser.email}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-500 transition-all duration-300 hover:text-gray-700">Role</p>
                        <p className="text-gray-800 capitalize transition-all duration-300 hover:text-gray-600">{currentUser.role}</p>
                      </div>

                      {currentUser.organization && (
                        <div>
                          <p className="text-sm font-medium text-gray-500 transition-all duration-300 hover:text-gray-700">Organization</p>
                          <p className="text-gray-800 transition-all duration-300 hover:text-gray-600">{currentUser.organization}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2 transition-all duration-300 hover:text-gray-600">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-300">
                      {currentUser.phone && (
                        <div>
                          <p className="text-sm font-medium text-gray-500 transition-all duration-300 hover:text-gray-700">Phone</p>
                          <p className="text-gray-800 transition-all duration-300 hover:text-gray-600">{currentUser.phone}</p>
                        </div>
                      )}

                      {currentUser.address && (
                        <div className="md:col-span-2">
                          <p className="text-sm font-medium text-gray-500 transition-all duration-300 hover:text-gray-700">Address</p>
                          <p className="text-gray-800 transition-all duration-300 hover:text-gray-600">{currentUser.address}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;