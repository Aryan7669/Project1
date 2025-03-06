import React, { useState } from 'react';
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
  
  if (!currentUser) {
    navigate('/login');
    return null;
  }
  
  if (!reservation || !listing) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Reservation Not Found</h2>
        <p className="text-gray-600 mb-6">
          The reservation you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          to="/schedule" 
          className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-md font-medium transition-colors"
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
    // Stay on the page to show the updated status
  };
  
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Reservation Details</h1>
            
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[reservation.status]}`}>
              {reservation.status}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Food Information</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-700">Title</p>
                  <p className="text-gray-800">{listing.title}</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-700">Description</p>
                  <p className="text-gray-800">{listing.description}</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-700">Quantity</p>
                  <p className="text-gray-800">{listing.quantity} {listing.unit}</p>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Pickup Location</p>
                    <p className="text-gray-800">{listing.location.address}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Reservation Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Reservation Date</p>
                    <p className="text-gray-800">{format(new Date(reservation.createdAt), 'MMMM d, yyyy')}</p>
                  </div>
                </div>
                
                {reservation.pickupTime && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-700">Scheduled Pickup</p>
                      <p className="text-gray-800">{format(new Date(reservation.pickupTime), 'MMMM d, yyyy h:mm a')}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">{isDonor ? 'Recipient' : 'Donor'}</p>
                    <p className="text-gray-800">{isDonor ? reservation.recipientName : listing.donorName}</p>
                  </div>
                </div>
                
                {reservation.notes && (
                  <div>
                    <p className="font-medium text-gray-700">Notes</p>
                    <p className="text-gray-800">{reservation.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          {!isUpdating ? (
            <div className="flex flex-wrap gap-4">
              {/* Donor actions */}
              {isDonor && reservation.status === 'pending' && (
                <button
                  onClick={() => setIsUpdating(true)}
                  className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Update Status
                </button>
              )}
              
              {/* Recipient actions */}
              {isRecipient && reservation.status === 'confirmed' && (
                <button
                  onClick={() => handleUpdateStatus('completed')}
                  className="flex items-center bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Mark as Completed
                </button>
              )}
              
              {isRecipient && (reservation.status === 'pending' || reservation.status === 'confirmed') && (
                <button
                  onClick={() => handleUpdateStatus('cancelled')}
                  className="flex items-center bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  <XCircle className="mr-2 h-5 w-5" />
                  Cancel Reservation
                </button>
              )}
              
              <Link
                to="/schedule"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Back to Schedule
              </Link>
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">Update Reservation Status</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleUpdateStatus('confirmed')}
                  className="flex items-center bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Confirm
                </button>
                
                <button
                  onClick={() => handleUpdateStatus('cancelled')}
                  className="flex items-center bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  <XCircle className="mr-2 h-5 w-5" />
                  Decline
                </button>
                
                <button
                  onClick={() => setIsUpdating(false)}
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md font-medium transition-colors"
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