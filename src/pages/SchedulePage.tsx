import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ReservationCard from '../components/ReservationCard';
import { Calendar, AlertCircle } from 'lucide-react';

const SchedulePage: React.FC = () => {
  const { reservations, foodListings, currentUser } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  
  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4 transition-all duration-500 animate-bounce" />
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Login Required</h2>
        <p className="text-gray-600 mb-6">
          You need to be logged in to view your schedule.
        </p>
        <button 
          onClick={() => window.location.href = '/login'}
          className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md font-medium transition-colors"
        >
          Log In
        </button>
      </div>
    );
  }
  
  // Filter reservations based on user role and selected filter
  const filteredReservations = reservations.filter(reservation => {
    // For donors, show reservations for their listings
    if (currentUser.role === 'donor') {
      const listing = foodListings.find(l => l.id === reservation.listingId);
      if (!listing || listing.donorId !== currentUser.id) return false;
    } 
    // For recipients, show their reservations
    else if (currentUser.role === 'recipient') {
      if (reservation.recipientId !== currentUser.id) return false;
    }
    
    // Apply status filter
    if (filter !== 'all' && reservation.status !== filter) return false;
    
    return true;
  });
  
  // Sort reservations by date (newest first)
  const sortedReservations = [...filteredReservations].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {currentUser.role === 'donor' ? 'Donation Schedule' : 'Pickup Schedule'}
        </h1>
        
        <div className="flex items-center bg-white rounded-md shadow-sm">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 rounded-md border-0 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      {sortedReservations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedReservations.map(reservation => {
            const listing = foodListings.find(l => l.id === reservation.listingId);
            if (!listing) return null;
            
            return (
              <ReservationCard 
                key={reservation.id} 
                reservation={reservation} 
                listing={listing} 
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">No Scheduled Pickups</h3>
          <p className="text-gray-600">
            {currentUser.role === 'recipient' 
              ? "You haven't reserved any food donations yet."
              : "You don't have any scheduled pickups for your donations."}
          </p>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;