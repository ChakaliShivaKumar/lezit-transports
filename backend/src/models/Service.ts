import mongoose, { Document, Schema } from 'mongoose';
import { IService } from '../types';

export interface IServiceDocument extends Omit<IService, '_id'>, Document {}

const serviceSchema = new Schema<IServiceDocument>({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    unique: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['person', 'goods'],
    required: [true, 'Service category is required']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  basePrice: {
    type: Number,
    required: [true, 'Base price is required'],
    min: [0, 'Base price cannot be negative']
  },
  pricePerKm: {
    type: Number,
    min: [0, 'Price per km cannot be negative']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
serviceSchema.index({ category: 1, isActive: 1 });

export default mongoose.model<IServiceDocument>('Service', serviceSchema); 