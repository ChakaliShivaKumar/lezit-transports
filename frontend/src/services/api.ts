import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AuthResponse, ApiResponse, Service, Booking, BookingsResponse, DashboardStats, AdminUser, AdminBooking, AdminService } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  }

  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  }

  async getCurrentUser(): Promise<ApiResponse<{ user: any }>> {
    const response = await this.api.get<ApiResponse<{ user: any }>>('/auth/me');
    return response.data;
  }

  // Services endpoints
  async getServices(category?: string): Promise<ApiResponse<Service[]>> {
    const params = category ? { category } : {};
    const response = await this.api.get<ApiResponse<Service[]>>('/services', { params });
    return response.data;
  }

  async getServiceById(id: string): Promise<ApiResponse<Service>> {
    const response = await this.api.get<ApiResponse<Service>>(`/services/${id}`);
    return response.data;
  }

  // Bookings endpoints
  async createBooking(bookingData: any): Promise<ApiResponse<Booking>> {
    const response = await this.api.post<ApiResponse<Booking>>('/bookings', bookingData);
    return response.data;
  }

  async getMyBookings(page = 1, limit = 10): Promise<ApiResponse<BookingsResponse>> {
    const response = await this.api.get<ApiResponse<BookingsResponse>>('/bookings/my-bookings', {
      params: { page, limit },
    });
    return response.data;
  }

  async getBookingById(id: string): Promise<ApiResponse<Booking>> {
    const response = await this.api.get<ApiResponse<Booking>>(`/bookings/${id}`);
    return response.data;
  }

  async cancelBooking(id: string): Promise<ApiResponse<Booking>> {
    const response = await this.api.put<ApiResponse<Booking>>(`/bookings/${id}/cancel`);
    return response.data;
  }

  // Admin endpoints
  async getAdminStats(): Promise<ApiResponse<DashboardStats>> {
    const response = await this.api.get<ApiResponse<DashboardStats>>('/admin/stats');
    return response.data;
  }

  async getAdminUsers(): Promise<ApiResponse<AdminUser[]>> {
    const response = await this.api.get<ApiResponse<AdminUser[]>>('/admin/users');
    return response.data;
  }

  async getAdminBookings(): Promise<ApiResponse<AdminBooking[]>> {
    const response = await this.api.get<ApiResponse<AdminBooking[]>>('/admin/bookings');
    return response.data;
  }

  async updateBookingStatus(bookingId: string, status: string): Promise<ApiResponse<AdminBooking>> {
    const response = await this.api.put<ApiResponse<AdminBooking>>(`/admin/bookings/${bookingId}/status`, { status });
    return response.data;
  }

  async updateUserStatus(userId: string, isActive: boolean): Promise<ApiResponse<AdminUser>> {
    const response = await this.api.put<ApiResponse<AdminUser>>(`/admin/users/${userId}/status`, { isActive });
    return response.data;
  }

  async updateServiceStatus(serviceId: string, isActive: boolean): Promise<ApiResponse<AdminService>> {
    const response = await this.api.put<ApiResponse<AdminService>>(`/admin/services/${serviceId}/status`, { isActive });
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    const response = await this.api.get<ApiResponse>('/health');
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService; 