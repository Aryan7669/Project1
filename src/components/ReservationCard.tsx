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
    pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    completed: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    cancelled: 'bg-red-100 text-red-800 hover:bg-red-200'
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{listing.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[reservation.status]} transition-all duration-200 transform hover:scale-105`}>
            {reservation.status}
          </span>
        </div>
        
        <div className="mt-3 flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
          <MapPin size={16} className="mr-1 group-hover:animate-bounce" />
          <span>{listing.location.address}</span>
        </div>
        
        {reservation.pickupTime && (
          <div className="mt-2 flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
            <Calendar size={16} className="mr-1 group-hover:animate-bounce" />
            <span>Pickup: {format(new Date(reservation.pickupTime), 'MMM d, yyyy')}</span>
          </div>
        )}
        
        <div className="mt-2 flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
          <Clock size={16} className="mr-1 group-hover:animate-bounce" />
          <span>Reserved on: {format(new Date(reservation.createdAt), 'MMM d, yyyy')}</span>
        </div>
        
        {reservation.notes && (
          <div className="mt-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
            <p className="font-medium transform group-hover:-translate-x-1 transition-transform duration-200">Notes:</p>
            <p className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
              {reservation.notes}
            </p>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200 transform group-hover:-translate-x-1">
            From {listing.donorName}
          </span>
          <Link 
            to={`/schedule/${reservation.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md transition-all duration-300 hover:bg-blue-700 hover:shadow-md hover:scale-105 active:scale-95 text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;