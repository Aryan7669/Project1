import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FoodCategory } from '../types';
import { PlusCircle, AlertCircle } from 'lucide-react';

const DonatePage: React.FC = () => {
  const { createFoodListing, currentUser } = useApp();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('items');
  const [category, setCategory] = useState<FoodCategory>('produce');
  const [expiryDate, setExpiryDate] = useState('');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [imageUrl, setImageUrl] = useState('');
  const [pickupInstructions, setPickupInstructions] = useState('');
  const [dietaryInfo, setDietaryInfo] = useState<string[]>([]);
  const [temperature, setTemperature] = useState<'frozen' | 'refrigerated' | 'room temperature'>('room temperature');
  const [error, setError] = useState('');
  
  const categories: FoodCategory[] = [
    'produce', 
    'bakery', 
    'dairy', 
    'meat', 
    'prepared meals', 
    'canned goods',
    'beverages',
    'other'
  ];
  
  const dietaryOptions = [
    'vegetarian',
    'vegan',
    'gluten-free',
    'dairy-free',
    'nut-free',
    'contains gluten',
    'contains dairy',
    'contains nuts'
  ];
  
  const handleDietaryChange = (option: string) => {
    if (dietaryInfo.includes(option)) {
      setDietaryInfo(dietaryInfo.filter(item => item !== option));
    } else {
      setDietaryInfo([...dietaryInfo, option]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (currentUser.role !== 'donor') {
      setError('Only donors can create food listings.');
      return;
    }
    if (!title || !description || !quantity || !category || !expiryDate || !address) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      createFoodListing({
        title,
        description,
        quantity: Number(quantity),
        unit,
        category,
        expiryDate,
        location: { address },
        imageUrl: imageUrl || undefined,
        pickupInstructions: pickupInstructions || undefined,
        dietaryInfo: dietaryInfo.length > 0 ? dietaryInfo : undefined,
        temperature
      });
      navigate('/listings');
    } catch (err) {
      setError('An error occurred while creating the listing.');
      console.error(err);
    }
  };
  
  if (!currentUser || currentUser.role !== 'donor') {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md text-center transform transition-all duration-300 hover:shadow-lg">
        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-gray-900 transition-colors duration-200">Access Restricted</h2>
        <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-200">
          You need to be logged in as a donor to create food listings.
        </p>
        <button 
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:bg-blue-700 hover:shadow-md hover:scale-105 active:scale-95"
        >
          Log In
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 group-hover:text-blue-600 transition-colors duration-200">Donate Food</h1>
          
          {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded transform transition-all duration-300 ease-in-out opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2 group">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
                  placeholder="e.g., Fresh Vegetables Assortment"
                  required
                />
              </div>
              
              <div className="md:col-span-2 group">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                  Description *
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 resize-y"
                  placeholder="Describe the food you're donating..."
                  required
                />
              </div>
              
              <div className="group">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                  Quantity *
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
                  required
                />
              </div>
              
              <div className="group">
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                  Unit *
                </label>
                <select
                  id="unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 appearance-none"
                  required
                >
                  {['items', 'lbs', 'kg', 'servings', 'meals', 'boxes', 'cans'].map(opt => (
                    <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                  ))}
                </select>
              </div>
              
              <div className="group">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                  Category *
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FoodCategory)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 appearance-none"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="group">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                  Expiry Date *
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
                  required
                />
              </div>
              
              <div className="md:col-span-2 group">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                  Pickup Address *
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    id="address"
                    value={address}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 transition-all duration-200 hover:border-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          async (position) => {
                            const { latitude, longitude } = position.coords;
                            try {
                              const response = await fetch(
                                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                              );
                              const data = await response.json();
                              setAddress(data.display_name || `Lat: ${latitude}, Lon: ${longitude}`);
                            } catch (error) {
                              console.error("Error fetching address:", error);
                              setAddress(`Lat: ${latitude}, Lon: ${longitude}`);
                            }
                          },
                          (error) => console.error("Error getting location:", error)
                        );
                      } else {
                        console.error("Geolocation is not supported by this browser.");
                      }
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-700 hover:shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                  >
                    Use Current Location
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 group">
                <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                  Upload Image (Optional)
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImageUrl(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer file:hover:bg-blue-700"
                />
                {imageUrl && (
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="mt-2 w-32 h-32 object-cover rounded-md transition-all duration-300 hover:scale-105 hover:shadow-md" 
                  />
                )}
              </div>

              <div className="md:col-span-2 group">
                <label htmlFor="pickupInstructions" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                  Pickup Instructions (Optional)
                </label>
                <textarea
                  id="pickupInstructions"
                  value={pickupInstructions}
                  onChange={(e) => setPickupInstructions(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 resize-y"
                  placeholder="Any special instructions for pickup..."
                />
              </div>
              
              <div className="group">
                <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                  Storage Temperature
                </label>
                <select
                  id="temperature"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value as 'frozen' | 'refrigerated' | 'room temperature')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 appearance-none"
                >
                  <option value="room temperature">Room Temperature</option>
                  <option value="refrigerated">Refrigerated</option>
                  <option value="frozen">Frozen</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  Dietary Information (Optional)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {dietaryOptions.map((option) => (
                    <div key={option} className="flex items-center group">
                      <input
                        type="checkbox"
                        id={`dietary-${option}`}
                        checked={dietaryInfo.includes(option)}
                        onChange={() => handleDietaryChange(option)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200 transform group-hover:scale-110"
                      />
                      <label 
                        htmlFor={`dietary-${option}`} 
                        className="ml-2 text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:bg-blue-700 hover:shadow-md hover:scale-105 active:scale-95 group"
              >
                <PlusCircle className="mr-2 h-5 w-5 group-hover:animate-spin" />
                Create Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Add custom keyframes for error fade-in if needed
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default DonatePage;