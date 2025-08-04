import express from 'express';
import { body } from 'express-validator';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Validation middleware
const serviceValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Service name is required'),
  body('category')
    .isIn(['person', 'goods'])
    .withMessage('Category must be either person or goods'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('basePrice')
    .isFloat({ min: 0 })
    .withMessage('Base price must be a positive number'),
  body('pricePerKm')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price per km must be a positive number'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

// Public routes
router.get('/', getServices);
router.get('/:id', getServiceById);

// Admin only routes
router.post('/', protect, authorize('admin'), serviceValidation, createService);
router.put('/:id', protect, authorize('admin'), serviceValidation, updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

export default router; 