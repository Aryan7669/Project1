import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Clock, 
  Tag, 
  Info, 
  Thermometer, 
  Calendar, 
  User, 
  AlertTriangle 
} from 'lucide-react';
import { format, isAfter } from 'date-fns';

const ListingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { foodListings, createReservation, currentUser } = useApp();
  
  const [pickupDate, setPickupDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isReserving, setIsReserving] = useState(false);
  
  const listing = foodListings.find(l => l.id === id);
  
  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Listing Not Found</h2>
        <p className="text-gray-600 mb-6">
          The food listing you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          to="/listings" 
          className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-md font-medium transition-colors"
        >
          Back to Listings
        </Link>
      </div>
    );
  }
  
  const isExpired = isAfter(new Date(), new Date(listing.expiryDate));
  const isAvailable = listing.status === 'available' && !isExpired;
  const isOwnListing = currentUser?.id === listing.donorId;
  
  const handleReserve = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (currentUser.role !== 'recipient') {
      alert('Only recipients can reserve food listings.');
      return;
    }
    
    setIsReserving(true);
  };
  
  const handleSubmitReservation = () => {
    createReservation(listing.id, pickupDate, notes);
    navigate('/schedule');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Image */}
        {listing.imageUrl && (
          <div className="h-64 md:h-80 overflow-hidden">
            <img 
              src={listing.imageUrl} 
              alt={listing.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{listing.title}</h1>
            
            <div className="flex items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isExpired 
                  ? 'bg-red-100 text-red-800' 
                  : listing.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : listing.status === 'reserved'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
              }`}>
                {isExpired ? 'Expired' : listing.status}
              </span>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">{listing.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Location</p>
                <p className="text-gray-600">{listing.location.address}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Expiry Date</p>
                <p className="text-gray-600">{format(new Date(listing.expiryDate), 'MMMM d, yyyy')}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Tag className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Quantity</p>
                <p className="text-gray-600">{listing.quantity} {listing.unit}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Info className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Category</p>
                <p className="text-gray-600 capitalize">{listing.category}</p>
              </div>
            </div>
            
            {listing.temperature && (
              <div className="flex items-start">
                <Thermometer className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">Storage</p>
                  <p className="text-gray-600 capitalize">{listing.temperature}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-start">
              <User className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Donor</p>
                <p className="text-gray-600">{listing.donorName}</p>
              </div>
            </div>
          </div>
          
          {listing.dietaryInfo && listing.dietaryInfo.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Dietary Information</h3>
              <div className="flex flex-wrap gap-2">
                {listing.dietaryInfo.map((info, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {info}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {listing.pickupInstructions && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Pickup Instructions</h3>
              <p className="text-gray-700">{listing.pickupInstructions}</p>
            </div>
          )}
          
          {/* Reservation Form */}
          {isReserving ? (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold mb-4">Reserve This Food</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Date
                  </label>
                  <input
                    type="datetime-local"
                    id="pickupDate"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Any special requests or information for the donor..."
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleSubmitReservation}
                    className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Confirm Reservation
                  </button>
                  
                  <button
                    onClick={() => setIsReserving(false)}
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 flex flex-wrap gap-4">
              {isAvailable && !isOwnListing && currentUser?.role === 'recipient' && (
                <button
                  onClick={handleReserve}
                  className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Reserve This Food
                </button>
              )}
              
              {!currentUser && isAvailable && (
                <Link
                  to="/login"
                  className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Log in to Reserve
                </Link>
              )}
              
              <Link
                to="/listings"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Back to Listings
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;