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
    available: 'bg-green-100 text-green-800',
    reserved: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    expired: 'bg-red-100 text-red-800'
  };

  const statusText = isExpired ? 'expired' : listing.status;
  const statusColor = statusColors[isExpired ? 'expired' : listing.status];

  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900 truncate">{listing.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>
              {statusText}
            </span>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapPin size={14} className="mr-1" />
            <span className="truncate">{listing.location.address}</span>
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <Clock size={14} className="mr-1" />
            <span>Expires: {format(new Date(listing.expiryDate), 'MMM d, yyyy')}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {listing.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={listing.imageUrl} 
            alt={listing.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">{listing.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>
            {statusText}
          </span>
        </div>
        <p className="mt-1 text-gray-600 text-sm line-clamp-2">{listing.description}</p>
        
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <MapPin size={16} className="mr-1" />
          <span>{listing.location.address}</span>
        </div>
        
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <Clock size={16} className="mr-1" />
          <span>Expires: {format(new Date(listing.expiryDate), 'MMM d, yyyy')}</span>
        </div>
        
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <Tag size={16} className="mr-1" />
          <span>
            {listing.quantity} {listing.unit} of {listing.category}
          </span>
        </div>
        
        {listing.dietaryInfo && listing.dietaryInfo.length > 0 && (
          <div className="mt-2 flex items-start text-sm text-gray-500">
            <Info size={16} className="mr-1 mt-0.5" />
            <span>{listing.dietaryInfo.join(', ')}</span>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            By {listing.donorName}
          </span>
          <Link 
            to={`/listings/${listing.id}`}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodListingCard;