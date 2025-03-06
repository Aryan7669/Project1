import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import FoodListingCard from '../components/FoodListingCard';
import { Search, Filter, MapPin } from 'lucide-react';
import { FoodCategory, FoodListing } from '../types';

const ListingsPage: React.FC = () => {
  const { foodListings } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');
  const [filteredListings, setFilteredListings] = useState<FoodListing[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const categories: { value: FoodCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'produce', label: 'Produce' },
    { value: 'bakery', label: 'Bakery' },
    { value: 'dairy', label: 'Dairy' },
    { value: 'meat', label: 'Meat' },
    { value: 'prepared meals', label: 'Prepared Meals' },
    { value: 'canned goods', label: 'Canned Goods' },
    { value: 'beverages', label: 'Beverages' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    // Filter listings based on search term and category
    let filtered = foodListings.filter(listing => 
      listing.status === 'available' && 
      !new Date(listing.expiryDate).getTime() < Date.now()
    );
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(term) ||
        listing.description.toLowerCase().includes(term) ||
        listing.donorName.toLowerCase().includes(term) ||
        listing.location.address.toLowerCase().includes(term)
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(listing => listing.category === selectedCategory);
    }
    
    // Sort by newest first
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setFilteredListings(filtered);
  }, [foodListings, searchTerm, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Available Food Listings</h1>
      
      {/* Search and Filter */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
        
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as FoodCategory | 'all')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Additional filters can be added here */}
            </div>
          </div>
        )}
      </div>
      
      {/* Results */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map(listing => (
            <FoodListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">No listings found</h3>
          <p className="text-gray-600">
            {searchTerm || selectedCategory !== 'all' 
              ? "Try adjusting your search or filters to find more results."
              : "There are no available food listings at the moment. Please check back later."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ListingsPage;