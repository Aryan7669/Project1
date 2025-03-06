import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, FoodListing, Reservation } from '../types';
import { mockUsers, mockFoodListings, mockReservations, mockImpactMetrics } from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  foodListings: FoodListing[];
  reservations: Reservation[];
  impactMetrics: typeof mockImpactMetrics;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    name: string,
    email: string,
    password: string,
    address: string,
    phone: string,
    userType: "donor" | "recipient"
  ) => Promise<boolean>;
    logout: () => void;
  createFoodListing: (listing: Omit<FoodListing, 'id' | 'createdAt' | 'donorId' | 'donorName' | 'status'>) => void;
  updateFoodListing: (id: string, updates: Partial<FoodListing>) => void;
  createReservation: (listingId: string, pickupTime?: string, notes?: string) => void;
  updateReservation: (id: string, updates: Partial<Reservation>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [foodListings, setFoodListings] = useState<FoodListing[]>(mockFoodListings);
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [impactMetrics] = useState(mockImpactMetrics);

  const login = async (email: string, password: string): Promise<boolean> => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    address: string,
    phone: string,
    userType: "donor" | "recipient"
  ): Promise<boolean> => {
    const userExists = mockUsers.some(user => user.email === email);
  
    if (userExists) {
      return false; // Email already registered
    }
  
    const newUser: User = {
      id: `user${mockUsers.length + 1}`,
      name,
      email,
      password, // ⚠️ Never store plaintext passwords in real apps
      address,
      phone,
      role: userType, // Assign userType properly
    };
  
    mockUsers.push(newUser);
    setCurrentUser(newUser);
    return true;
  };
  

  const logout = () => {
    setCurrentUser(null);
  };

  const createFoodListing = (listing: Omit<FoodListing, 'id' | 'createdAt' | 'donorId' | 'donorName' | 'status'>) => {
    if (!currentUser) return;
    
    const newListing: FoodListing = {
      ...listing,
      id: `listing${foodListings.length + 1}`,
      createdAt: new Date().toISOString(),
      donorId: currentUser.id,
      donorName: currentUser.name,
      status: 'available'
    };
    
    setFoodListings([...foodListings, newListing]);
  };

  const updateFoodListing = (id: string, updates: Partial<FoodListing>) => {
    setFoodListings(
      foodListings.map(listing => 
        listing.id === id ? { ...listing, ...updates } : listing
      )
    );
  };

  const createReservation = (listingId: string, pickupTime?: string, notes?: string) => {
    if (!currentUser) return;
    
    const newReservation: Reservation = {
      id: `res${reservations.length + 1}`,
      listingId,
      recipientId: currentUser.id,
      recipientName: currentUser.name,
      status: 'pending',
      createdAt: new Date().toISOString(),
      pickupTime,
      notes
    };
    
    setReservations([...reservations, newReservation]);
    updateFoodListing(listingId, { status: 'reserved' });
  };

  const updateReservation = (id: string, updates: Partial<Reservation>) => {
    setReservations(
      reservations.map(reservation => 
        reservation.id === id ? { ...reservation, ...updates } : reservation
      )
    );

    if (updates.status === 'completed' || updates.status === 'cancelled') {
      const reservation = reservations.find(r => r.id === id);
      if (reservation) {
        updateFoodListing(
          reservation.listingId, 
          { status: updates.status === 'completed' ? 'completed' : 'available' }
        );
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        foodListings,
        reservations,
        impactMetrics,
        login,
        signup, // Added signup here
        logout,
        createFoodListing,
        updateFoodListing,
        createReservation,
        updateReservation
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
