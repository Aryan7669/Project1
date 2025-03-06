import React, { useState } from 'react';
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
  
  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Login Required</h2>
        <p className="text-gray-600 mb-6">
          You need to be logged in to view your profile.
        </p>
        <button 
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md font-medium transition-colors"
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
    // In a real app, this would update the user profile
    // For now, we'll just toggle the editing state
    setIsEditing(false);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
            
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-700"
            >
              <LogOut className="h-5 w-5 mr-1" />
              <span>Logout</span>
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <User className="h-20 w-20 text-gray-500" />
              </div>
              
              <h2 className="text-xl font-semibold text-center">{currentUser.name}</h2>
              <p className="text-gray-600 capitalize">{currentUser.role}</p>
              
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
            
            <div className="md:w-2/3">
              {isEditing ? (
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                        Organization
                      </label>
                      <input
                        type="text"
                        id="organization"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    
                    <button
                      type="submit"
                      className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Name</p>
                        <p className="text-gray-800">{currentUser.name}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-gray-800">{currentUser.email}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500">Role</p>
                        <p className="text-gray-800 capitalize">{currentUser.role}</p>
                      </div>
                      
                      {currentUser.organization && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Organization</p>
                          <p className="text-gray-800">{currentUser.organization}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentUser.phone && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone</p>
                          <p className="text-gray-800">{currentUser.phone}</p>
                        </div>
                      )}
                      
                      {currentUser.address && (
                        <div className="md:col-span-2">
                          <p className="text-sm font-medium text-gray-500">Address</p>
                          <p className="text-gray-800">{currentUser.address}</p>
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