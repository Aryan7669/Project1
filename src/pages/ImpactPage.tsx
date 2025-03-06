import React from 'react';
import { useApp } from '../context/AppContext';
import ImpactCard from '../components/ImpactCard';
import { BarChart3, Leaf, Droplets, UtensilsCrossed } from 'lucide-react';

const ImpactPage: React.FC = () => {
  const { impactMetrics } = useApp();
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Our Impact</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <ImpactCard metrics={impactMetrics} />
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">How We Calculate Impact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <UtensilsCrossed className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">Meals Provided</p>
                  <p className="text-sm text-gray-600">
                    We estimate that 1.2 pounds of food equals approximately one meal.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <BarChart3 className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">CO2 Emissions Saved</p>
                  <p className="text-sm text-gray-600">
                    For every pound of food rescued, approximately 2 kg of CO2 emissions are prevented.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <Droplets className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">Water Saved</p>
                  <p className="text-sm text-gray-600">
                    Each pound of food saved conserves about 400 gallons of water that would have been used in production.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Impact Stories */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Impact Stories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Community Kitchen" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Community Kitchen Success</h3>
              <p className="text-gray-600 mb-4">
                "Thanks to Good2Give, we've been able to increase our meal service by 30% while reducing food costs. The platform has connected us with local businesses that have surplus food, creating a win-win situation for everyone involved."
              </p>
              <p className="text-sm text-gray-500">- Maria Rodriguez, Community Kitchen Director</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Local Grocery Store" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Reducing Waste at Fresh Foods</h3>
              <p className="text-gray-600 mb-4">
                "Before Good2Give, we were throwing away perfectly good food that was approaching its sell-by date. Now, we've reduced our food waste by 75% and built meaningful relationships with local charities and families in need."
              </p>
              <p className="text-sm text-gray-500">- James Chen, Fresh Foods Market Manager</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Environmental Impact */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Environmental Impact</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Leaf className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold ml-3 text-gray-800">Why Food Waste Matters</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">bluehouse Gas Emissions</h4>
                <p className="text-gray-600 text-sm">
                  Food waste in landfills produces methane, a bluehouse gas 25 times more potent than carbon dioxide. By rescuing food, we prevent these emissions.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Water Conservation</h4>
                <p className="text-gray-600 text-sm">
                  Food production is water-intensive. When we waste food, we also waste all the water used to grow, process, and transport it.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Land Use</h4>
                <p className="text-gray-600 text-sm">
                  Reducing food waste means less land is needed for agriculture, helping preserve natural habitats and biodiversity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-blue-600 text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Whether you're a restaurant, grocery store, or individual looking to make a difference, your contribution matters. Join Good2Give today and be part of the solution.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="/signup" 
            className="bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
          >
            Sign Up Now
          </a>
          <a 
            href="/listings" 
            className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-3 rounded-md font-medium transition-colors"
          >
            Browse Listings
          </a>
        </div>
      </section>
    </div>
  );
};

export default ImpactPage;