export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface Service {
  _id: string;
  name: string;
  category: 'person' | 'goods';
  description: string;
  basePrice: number;
  pricePerKm?: number;
  isActive: boolean;
}

export interface Booking {
  _id: string;
  userId: string;
  serviceType: 'person' | 'goods';
  serviceCategory: string;
  email: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropDate?: string;
  dropTime?: string;
  numberOfPersons?: number;
  goodsDescription?: string;
  vehicleType?: string;
  driverRequired?: boolean;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod?: string;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalBookings: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BookingsResponse {
  bookings: Booking[];
  pagination: PaginationInfo;
}

// Admin Dashboard Types
export interface DashboardStats {
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
  pendingBookings: number;
  activeServices: number;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminBooking {
  _id: string;
  userId: string;
  serviceType: string;
  serviceCategory: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
}

export interface AdminService {
  _id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  isActive: boolean;
} 