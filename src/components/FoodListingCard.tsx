import React from 'react';
import { Link } from 'react-router-dom';
import { FoodListing } from '../types';
import { Clock, MapPin, Tag, Info } from 'lucide-react';
import { format, isAfter } from 'date-fns';

interface FoodListingCardProps {
  listing: FoodListing;
  compact?: boolean;
}

const FoodListingCard: React.FC<FoodListingCardProps> = ({ listing, compact = false }) => {
  const isExpired = isAfter(new Date(), new Date(listing.expiryDate));
  
  const statusColors = {
    available: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    reserved: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    completed: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    expired: 'bg-red-100 text-red-800 hover:bg-red-200'
  };

  const statusText = isExpired ? 'expired' : listing.status;
  const statusColor = statusColors[isExpired ? 'expired' : listing.status];

  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">{listing.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${statusColor} transition-colors duration-200 transform hover:scale-105`}>
              {statusText}
            </span>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
            <MapPin size={14} className="mr-1 animate-pulse" />
            <span className="truncate">{listing.location.address}</span>
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
            <Clock size={14} className="mr-1 animate-pulse" />
            <span>Expires: {format(new Date(listing.expiryDate), 'MMM d, yyyy')}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
      {listing.imageUrl && (
        <div className="h-48 overflow-hidden relative">
          <img 
            src={listing.imageUrl} 
            alt={listing.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{listing.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColor} transition-all duration-200 transform hover:scale-105`}>
            {statusText}
          </span>
        </div>
        <p className="mt-1 text-gray-600 text-sm line-clamp-2 group-hover:text-gray-800 transition-colors duration-200">{listing.description}</p>
        
        <div className="mt-3 flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
          <MapPin size={16} className="mr-1 group-hover:animate-bounce" />
          <span>{listing.location.address}</span>
        </div>
        
        <div className="mt-2 flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
          <Clock size={16} className="mr-1 group-hover:animate-bounce" />
          <span>Expires: {format(new Date(listing.expiryDate), 'MMM d, yyyy')}</span>
        </div>
        
        <div className="mt-2 flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
          <Tag size={16} className="mr-1 group-hover:animate-bounce" />
          <span>
            {listing.quantity} {listing.unit} of {listing.category}
          </span>
        </div>
        
        {listing.dietaryInfo && listing.dietaryInfo.length > 0 && (
          <div className="mt-2 flex items-start text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
            <Info size={16} className="mr-1 mt-0.5 group-hover:animate-bounce" />
            <span>{listing.dietaryInfo.join(', ')}</span>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200 transform group-hover:-translate-x-1">
            By {listing.donorName}
          </span>
          <Link 
            to={`/listings/${listing.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md transition-all duration-300 hover:bg-blue-700 hover:shadow-md hover:scale-105 active:scale-95 text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodListingCard;