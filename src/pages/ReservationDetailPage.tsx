import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle, 
  AlertTriangle 
} from 'lucide-react';
import { format } from 'date-fns';

const ReservationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { reservations, foodListings, updateReservation, currentUser } = useApp();
  
  const reservation = reservations.find(r => r.id === id);
  const listing = reservation ? foodListings.find(l => l.id === reservation.listingId) : null;
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(false); // For fade-in animation

  // Trigger fade-in animation on mount
  useEffect(() => {
    setIsPageVisible(true);
  }, []);

  if (!currentUser) {
    navigate('/login');
    return null;
  }
  
  if (!reservation || !listing) {
    return (
      <div className={`max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md text-center transition-all duration-500 ${isPageVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}>
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4 transition-all duration-300 animate-pulse" />
        <h2 className="text-2xl font-bold mb-4 text-gray-800 transition-all duration-300 hover:text-gray-600">Reservation Not Found</h2>
        <p className="text-gray-600 mb-6 transition-all duration-300 hover:text-gray-700">
          The reservation you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          to="/schedule" 
          className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md font-medium transition-all duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back to Schedule
        </Link>
      </div>
    );
  }
  
  // Check if user has permission to view this reservation
  const isDonor = currentUser.id === listing.donorId;
  const isRecipient = currentUser.id === reservation.recipientId;
  
  if (!isDonor && !isRecipient) {
    navigate('/schedule');
    return null;
  }
  
  const handleUpdateStatus = (status: 'confirmed' | 'completed' | 'cancelled') => {
    updateReservation(reservation.id, { status });
    setIsUpdating(false);
  };
  
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  
  return (
    <div className={`max-w-4xl mx-auto transition-all duration-500 ${isPageVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 ease-in-out hover:shadow-lg">
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6 transition-all duration-300">
            <h1 className="text-2xl font-bold text-gray-900 transition-all duration-300 hover:text-gray-600">Reservation Details</h1>
            
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[reservation.status]} transition-all duration-300 animate-pulse`}>
              {reservation.status}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="animate-slide-in-left transition-all duration-500">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 transition-all duration-300 hover:text-gray-600">Food Information</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-700 transition-all duration-300 hover:text-gray-900">Title</p>
                  <p className="text-gray-800 transition-all duration-300 hover:text-gray-600">{listing.title}</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-700 transition-all duration-300 hover:text-gray-900">Description</p>
                  <p className="text-gray-800 transition-all duration-300 hover:text-gray-600">{listing.description}</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-700 transition-all duration-300 hover:text-gray-900">Quantity</p>
                  <p className="text-gray-800 transition-all duration-300 hover:text-gray-600">{listing.quantity} {listing.unit}</p>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5 transition-all duration-300" />
                  <div>
                    <p className="font-medium text-gray-700 transition-all duration-300 hover:text-gray-900">Pickup Location</p>
                    <p className="text-gray-800 transition-all duration-300 hover:text-gray-600">{listing.location.address}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-in-right transition-all duration-500">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 transition-all duration-300 hover:text-gray-600">Reservation Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5 transition-all duration-300" />
                  <div>
                    <p className="font-medium text-gray-700 transition-all duration-300 hover:text-gray-900">Reservation Date</p>
                    <p className="text-gray-800 transition-all duration-300 hover:text-gray-600">{format(new Date(reservation.createdAt), 'MMMM d, yyyy')}</p>
                  </div>
                </div>
                
                {reservation.pickupTime && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5 transition-all duration-300" />
                    <div>
                      <p className="font-medium text-gray-700 transition-all duration-300 hover:text-gray-900">Scheduled Pickup</p>
                      <p className="text-gray-800 transition-all duration-300 hover:text-gray-600">{format(new Date(reservation.pickupTime), 'MMMM d, yyyy h:mm a')}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-500 mr-2 mt-0.5 transition-all duration-300" />
                  <div>
                    <p className="font-medium text-gray-700 transition-all duration-300 hover:text-gray-900">{isDonor ? 'Recipient' : 'Donor'}</p>
                    <p className="text-gray-800 transition-all duration-300 hover:text-gray-600">{isDonor ? reservation.recipientName : listing.donorName}</p>
                  </div>
                </div>
                
                {reservation.notes && (
                  <div>
                    <p className="font-medium text-gray-700 transition-all duration-300 hover:text-gray-900">Notes</p>
                    <p className="text-gray-800 transition-all duration-300 hover:text-gray-600">{reservation.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          {!isUpdating ? (
            <div className="flex flex-wrap gap-4 transition-all duration-300">
              {/* Donor actions */}
              {isDonor && reservation.status === 'pending' && (
                <button
                  onClick={() => setIsUpdating(true)}
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Update Status
                </button>
              )}
              
              {/* Recipient actions */}
              {isRecipient && reservation.status === 'confirmed' && (
                <button
                  onClick={() => handleUpdateStatus('completed')}
                  className="flex items-center bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Mark as Completed
                </button>
              )}
              
              {isRecipient && (reservation.status === 'pending' || reservation.status === 'confirmed') && (
                <button
                  onClick={() => handleUpdateStatus('cancelled')}
                  className="flex items-center bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <XCircle className="mr-2 h-5 w-5" />
                  Cancel Reservation
                </button>
              )}
              
              <Link
                to="/schedule"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Back to Schedule
              </Link>
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-6 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-4 transition-all duration-300 hover:text-gray-600">Update Reservation Status</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleUpdateStatus('confirmed')}
                  className="flex items-center bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Confirm
                </button>
                
                <button
                  onClick={() => handleUpdateStatus('cancelled')}
                  className="flex items-center bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <XCircle className="mr-2 h-5 w-5" />
                  Decline
                </button>
                
                <button
                  onClick={() => setIsUpdating(false)}
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailPage;