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
        location: {
          address
        },
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
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Access Restricted</h2>
        <p className="text-gray-600 mb-6">
          You need to be logged in as a donor to create food listings.
        </p>
        <button 
          onClick={() => navigate('/login')}
          className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-md font-medium transition-colors"
        >
          Log In
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Donate Food</h1>
          
          {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Fresh Vegetables Assortment"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Describe the food you're donating..."
                  required
                />
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                  Unit *
                </label>
                <select
                  id="unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="items">Items</option>
                  <option value="lbs">Pounds (lbs)</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="servings">Servings</option>
                  <option value="meals">Meals</option>
                  <option value="boxes">Boxes</option>
                  <option value="cans">Cans</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FoodCategory)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date *
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
    Pickup Address *
  </label>
  <div className="flex items-center space-x-2">
    <input
      type="text"
      id="address"
      value={address}
      readOnly
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-100"
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
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
    >
      Use Current Location
    </button>
  </div>
</div>

              <div className="md:col-span-2">
  <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-1">
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
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
  />
  {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />}
</div>

              <div className="md:col-span-2">
                <label htmlFor="pickupInstructions" className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Instructions (Optional)
                </label>
                <textarea
                  id="pickupInstructions"
                  value={pickupInstructions}
                  onChange={(e) => setPickupInstructions(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Any special instructions for pickup..."
                />
              </div>
              
              <div>
                <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-1">
                  Storage Temperature
                </label>
                <select
                  id="temperature"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value as 'frozen' | 'refrigerated' | 'room temperature')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="room temperature">Room Temperature</option>
                  <option value="refrigerated">Refrigerated</option>
                  <option value="frozen">Frozen</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Information (Optional)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {dietaryOptions.map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`dietary-${option}`}
                        checked={dietaryInfo.includes(option)}
                        onChange={() => handleDietaryChange(option)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`dietary-${option}`} className="ml-2 text-sm text-gray-700">
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
                className="flex items-center bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-md font-medium transition-colors"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;