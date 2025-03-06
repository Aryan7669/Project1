import React from 'react';
import { Link } from 'react-router-dom';
import { Reservation, FoodListing } from '../types';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';

interface ReservationCardProps {
  reservation: Reservation;
  listing: FoodListing;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, listing }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">{listing.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[reservation.status]}`}>
            {reservation.status}
          </span>
        </div>
        
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <MapPin size={16} className="mr-1" />
          <span>{listing.location.address}</span>
        </div>
        
        {reservation.pickupTime && (
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-1" />
            <span>Pickup: {format(new Date(reservation.pickupTime), 'MMM d, yyyy')}</span>
          </div>
        )}
        
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <Clock size={16} className="mr-1" />
          <span>Reserved on: {format(new Date(reservation.createdAt), 'MMM d, yyyy')}</span>
        </div>
        
        {reservation.notes && (
          <div className="mt-2 text-sm text-gray-600">
            <p className="font-medium">Notes:</p>
            <p>{reservation.notes}</p>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            From {listing.donorName}
          </span>
          <Link 
            to={`/schedule/${reservation.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;