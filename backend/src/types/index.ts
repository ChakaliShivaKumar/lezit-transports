import { Request } from 'express';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string; // Optional for OAuth users
  phone?: string; // Optional for OAuth users
  googleId?: string;
  facebookId?: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBooking {
  _id?: string;
  userId: string;
  serviceType: 'person' | 'goods';
  serviceCategory: string;
  email: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: Date;
  pickupTime: string;
  dropDate?: Date;
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IService {
  _id?: string;
  name: string;
  category: 'person' | 'goods';
  description: string;
  basePrice: number;
  pricePerKm?: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IVehicle {
  _id?: string;
  name: string;
  type: string;
  capacity: number;
  licensePlate: string;
  isAvailable: boolean;
  driverId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDriver {
  _id?: string;
  name: string;
  licenseNumber: string;
  phone: string;
  email: string;
  isAvailable: boolean;
  rating: number;
  experience: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthRequest extends Request {
  user?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
} 