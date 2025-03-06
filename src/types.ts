export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'donor' | 'recipient';
  organization?: string;
  address?: string;
  phone?: string;
}

export interface FoodListing {
  id: string;
  title: string;
  description: string;
  quantity: number;
  unit: string;
  category: FoodCategory;
  expiryDate: string;
  createdAt: string;
  status: 'available' | 'reserved' | 'completed' | 'expired';
  donorId: string;
  donorName: string;
  location: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    }
  };
  imageUrl?: string;
  pickupInstructions?: string;
  dietaryInfo?: string[];
  temperature?: 'frozen' | 'refrigerated' | 'room temperature';
}

export type FoodCategory = 
  | 'produce' 
  | 'bakery' 
  | 'dairy' 
  | 'meat' 
  | 'prepared meals' 
  | 'canned goods'
  | 'beverages'
  | 'other';

export interface Reservation {
  id: string;
  listingId: string;
  recipientId: string;
  recipientName: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  pickupTime?: string;
  notes?: string;
}

export interface ImpactMetrics {
  totalDonations: number;
  totalWeight: number;
  mealsProvided: number;
  co2Saved: number;
  waterSaved: number;
}
export interface SignupData {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  userType: "donor" | "recipient";
}
