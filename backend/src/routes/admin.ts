import express from 'express';
import { adminAuth } from '../middleware/auth';
import { 
  getAdminStats, 
  getAdminUsers, 
  getAdminBookings, 
  updateBookingStatus, 
  updateUserStatus, 
  updateServiceStatus 
} from '../controllers/adminController';

const router = express.Router();

// All admin routes require admin authentication
router.use(adminAuth);

// Dashboard statistics
router.get('/stats', getAdminStats);

// User management
router.get('/users', getAdminUsers);
router.put('/users/:userId/status', updateUserStatus);

// Booking management
router.get('/bookings', getAdminBookings);
router.put('/bookings/:bookingId/status', updateBookingStatus);

// Service management
router.put('/services/:serviceId/status', updateServiceStatus);

export default router; 