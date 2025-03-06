import { FoodListing, Reservation, User, ImpactMetrics } from '../types';
import { addDays } from 'date-fns';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Fresh Foods Market',
    email: 'contact@freshfoods.com',
    role: 'donor',
    organization: 'Fresh Foods Market',
    address: '123 Market St, San Francisco, CA',
    phone: '415-555-1234'
  },
  {
    id: 'user2',
    name: 'Community Kitchen',
    email: 'info@communitykitchen.org',
    role: 'recipient',
    organization: 'Community Kitchen Nonprofit',
    address: '456 Hope Ave, San Francisco, CA',
    phone: '415-555-5678'
  },
  {
    id: 'user3',
    name: 'Bread & Butter Bakery',
    email: 'hello@breadbutter.com',
    role: 'donor',
    organization: 'Bread & Butter Bakery',
    address: '789 Baker St, San Francisco, CA',
    phone: '415-555-9012'
  },
  {
    id: 'user4',
    name: 'Hope Shelter',
    email: 'contact@hopeshelter.org',
    role: 'recipient',
    organization: 'Hope Shelter',
    address: '101 Shelter Rd, San Francisco, CA',
    phone: '415-555-3456'
  }
];

// Helper function to create dates
const createDate = (daysFromNow: number) => {
  return addDays(new Date(), daysFromNow).toISOString();
};

// Mock Food Listings
export const mockFoodListings: FoodListing[] = [
  {
    id: 'listing1',
    title: 'Fresh Vegetables Assortment',
    description: 'Assorted vegetables including carrots, broccoli, and bell peppers. All fresh and organic.',
    quantity: 25,
    unit: 'lbs',
    category: 'produce',
    expiryDate: createDate(3),
    createdAt: createDate(-1),
    status: 'available',
    donorId: 'user1',
    donorName: 'Fresh Foods Market',
    location: {
      address: '123 Market St, San Francisco, CA',
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    },
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    pickupInstructions: 'Please come to the back entrance and ask for the manager.',
    dietaryInfo: ['vegan', 'gluten-free'],
    temperature: 'refrigerated'
  },
  {
    id: 'listing2',
    title: 'Day-Old Bread and Pastries',
    description: 'Assortment of bread loaves, rolls, and pastries from yesterday. Still fresh and delicious.',
    quantity: 15,
    unit: 'items',
    category: 'bakery',
    expiryDate: createDate(1),
    createdAt: createDate(-2),
    status: 'available',
    donorId: 'user3',
    donorName: 'Bread & Butter Bakery',
    location: {
      address: '789 Baker St, San Francisco, CA',
      coordinates: {
        lat: 37.7839,
        lng: -122.4012
      }
    },
    imageUrl: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    pickupInstructions: 'Available for pickup after 7pm.',
    dietaryInfo: ['contains gluten', 'vegetarian'],
    temperature: 'room temperature'
  },
  {
    id: 'listing3',
    title: 'Prepared Meals - Pasta Dishes',
    description: 'Prepared pasta dishes that were not sold today. Includes vegetarian and meat options.',
    quantity: 10,
    unit: 'meals',
    category: 'prepared meals',
    expiryDate: createDate(2),
    createdAt: createDate(-1),
    status: 'reserved',
    donorId: 'user1',
    donorName: 'Fresh Foods Market',
    location: {
      address: '123 Market St, San Francisco, CA',
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    },
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    pickupInstructions: 'Please bring your own containers if possible.',
    dietaryInfo: ['contains dairy', 'contains gluten'],
    temperature: 'refrigerated'
  },
  {
    id: 'listing4',
    title: 'Dairy Products Assortment',
    description: 'Milk, yogurt, and cheese approaching sell-by date but still good for several days.',
    quantity: 20,
    unit: 'items',
    category: 'dairy',
    expiryDate: createDate(4),
    createdAt: createDate(-3),
    status: 'available',
    donorId: 'user1',
    donorName: 'Fresh Foods Market',
    location: {
      address: '123 Market St, San Francisco, CA',
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    },
    imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    pickupInstructions: 'Please bring cooler bags for transport.',
    dietaryInfo: ['contains dairy'],
    temperature: 'refrigerated'
  },
  {
    id: 'listing5',
    title: 'Canned Food Assortment',
    description: 'Various canned goods including beans, vegetables, and soups. All within expiration date.',
    quantity: 30,
    unit: 'cans',
    category: 'canned goods',
    expiryDate: createDate(180),
    createdAt: createDate(-5),
    status: 'available',
    donorId: 'user1',
    donorName: 'Fresh Foods Market',
    location: {
      address: '123 Market St, San Francisco, CA',
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    },
    imageUrl: 'https://images.unsplash.com/photo-1584263347416-85a696b4eda7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    temperature: 'room temperature'
  }
];

// Mock Reservations
export const mockReservations: Reservation[] = [
  {
    id: 'res1',
    listingId: 'listing3',
    recipientId: 'user2',
    recipientName: 'Community Kitchen',
    status: 'confirmed',
    createdAt: createDate(-1),
    pickupTime: createDate(0),
    notes: 'Will pick up at 6pm.'
  },
  {
    id: 'res2',
    listingId: 'listing2',
    recipientId: 'user4',
    recipientName: 'Hope Shelter',
    status: 'pending',
    createdAt: createDate(0),
    pickupTime: createDate(1),
    notes: 'Need to confirm exact pickup time.'
  }
];

// Mock Impact Metrics
export const mockImpactMetrics: ImpactMetrics = {
  totalDonations: 157,
  totalWeight: 2340,
  mealsProvided: 1950,
  co2Saved: 4680,
  waterSaved: 936000
};