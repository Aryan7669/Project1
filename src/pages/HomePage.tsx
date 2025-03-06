import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import FoodListingCard from '../components/FoodListingCard';
import ImpactCard from '../components/ImpactCard';
import { Search, PlusCircle, BarChart3 } from 'lucide-react';

const HomePage: React.FC = () => {
  const { foodListings, impactMetrics, currentUser } = useApp();
  
  // Get the most recent available listings
  const recentListings = foodListings
    .filter(listing => listing.status === 'available')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white rounded-xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Reduce Food Waste, Feed Communities
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl">
            Connect surplus food with those who need it most. Join our platform to donate or receive food and make a positive impact on our community and environment.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/listings" 
              className="bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Find Food
            </Link>
            {currentUser?.role === 'donor' ? (
              <Link 
                to="/donate" 
                className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Donate Food
              </Link>
            ) : (
              <Link 
                to="/signup" 
                className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Sign Up to Donate
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Search className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Find Food</h3>
            <p className="text-gray-600">
              Browse available food donations in your area. Filter by food type, location, and pickup time.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <PlusCircle className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Donate Food</h3>
            <p className="text-gray-600">
              List your surplus food for donation. Provide details about quantity, pickup instructions, and expiry date.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <BarChart3 className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Track Impact</h3>
            <p className="text-gray-600">
              See the difference you're making with detailed impact metrics on food saved, meals provided, and environmental benefits.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Listings Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Listings</h2>
          <Link 
            to="/listings" 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </Link>
        </div>
        
        {recentListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentListings.map(listing => (
              <FoodListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600">No available listings at the moment.</p>
            {currentUser?.role === 'donor' && (
              <Link 
                to="/donate" 
                className="mt-4 inline-block bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Create a Listing
              </Link>
            )}
          </div>
        )}
      </section>

      {/* Impact Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Impact</h2>
        <ImpactCard metrics={impactMetrics} />
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 rounded-xl p-8 mb-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Ready to Make a Difference?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join our community of food donors and recipients today. Together, we can reduce food waste and fight hunger in our communities.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/listings" 
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md font-medium transition-colors"
          >
            Find Food
          </Link>
          {currentUser?.role === 'donor' ? (
            <Link 
              to="/donate" 
              className="bg-white text-blue-700 border border-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Donate Food
            </Link>
          ) : (
            <Link 
              to="/signup" 
              className="bg-white text-blue-700 border border-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Sign Up
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;