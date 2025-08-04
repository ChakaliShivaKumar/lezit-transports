import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';
import { Service } from '../types';
import { toast } from 'react-toastify';

const schema = yup.object({
  serviceType: yup.string().required('Service type is required'),
  serviceCategory: yup.string().required('Service category is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  pickupLocation: yup.string().required('Pickup location is required'),
  dropLocation: yup.string().required('Drop location is required'),
  pickupDate: yup.string().required('Pickup date is required'),
  pickupTime: yup.string().required('Pickup time is required'),
  dropDate: yup.string().optional(),
  dropTime: yup.string().optional(),
  numberOfPersons: yup.number().optional().when('serviceType', {
    is: (val: string) => val === 'person',
    then: (schema) => schema.min(1, 'At least 1 person required').required('Number of persons is required'),
    otherwise: (schema) => schema.optional()
  }),
  goodsDescription: yup.string().optional().when('serviceType', {
    is: (val: string) => val === 'goods',
    then: (schema) => schema.required('Goods description is required'),
    otherwise: (schema) => schema.optional()
  }),
  vehicleType: yup.string().required('Vehicle type is required'),
  driverRequired: yup.boolean(),
  specialInstructions: yup.string().optional(),
}).required();

const NewBooking: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      driverRequired: true,
      serviceType: searchParams.get('service') || 'person',
      email: user?.email || ''
    }
  });

  const watchedValues = watch();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await apiService.getServices();
      if (response.success) {
        setServices(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    }
  };

  const getServiceIcon = (serviceName: string): string => {
    const name = serviceName.toLowerCase();
    
    let icon = 'fas fa-truck'; // default
    
    if (name.includes('driver')) icon = 'fas fa-user-tie';
    else if (name.includes('interstate')) icon = 'fas fa-route';
    else if (name.includes('intrastate')) icon = 'fas fa-map-marker-alt';
    else if (name.includes('logistics')) icon = 'fas fa-warehouse';
    else if (name.includes('delivery') || name.includes('order')) icon = 'fas fa-shipping-fast';
    else if (name.includes('shuttle') || name.includes('commute')) icon = 'fas fa-bus';
    else if (name.includes('person') || name.includes('passenger')) icon = 'fas fa-users';
    else if (name.includes('goods') || name.includes('cargo')) icon = 'fas fa-truck';
    else if (name.includes('business')) icon = 'fas fa-building';
    
    console.log(`Service: ${serviceName} -> Icon: ${icon}`);
    return icon;
  };

  const calculatePrice = useCallback(() => {
    if (!selectedService || !watchedValues.pickupLocation || !watchedValues.dropLocation) {
      setEstimatedPrice(0);
      return;
    }

    // Simple price calculation (you can make this more sophisticated)
    let basePrice = selectedService.basePrice;
    if (selectedService.pricePerKm) {
      // Estimate distance (you can integrate with Google Maps API for accurate distance)
      const estimatedDistance = 50; // km
      basePrice += selectedService.pricePerKm * estimatedDistance;
    }

    // Add extra charges for additional services
    if (watchedValues.driverRequired) {
      basePrice += 200; // Driver charge
    }

    if (watchedValues.serviceType === 'person' && watchedValues.numberOfPersons && watchedValues.numberOfPersons > 4) {
      basePrice += (watchedValues.numberOfPersons - 4) * 100; // Extra person charge
    }

    setEstimatedPrice(basePrice);
  }, [selectedService, watchedValues.pickupLocation, watchedValues.dropLocation, watchedValues.driverRequired, watchedValues.serviceType, watchedValues.numberOfPersons]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setValue('serviceType', service.category);
    setValue('serviceCategory', service.name);
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const bookingData = {
        ...data,
        totalAmount: estimatedPrice,
        paymentStatus: 'pending',
        paymentMethod: 'cash'
      };

      const response = await apiService.createBooking(bookingData);
      if (response.success) {
        toast.success('Booking created successfully!');
        navigate('/bookings');
      } else {
        toast.error(response.message || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const vehicleTypes = [
    { value: 'sedan', label: 'Sedan (4 seats)', icon: 'fas fa-car' },
    { value: 'suv', label: 'SUV (6 seats)', icon: 'fas fa-car-side' },
    { value: 'minibus', label: 'Minibus (12 seats)', icon: 'fas fa-bus' },
    { value: 'truck', label: 'Truck (Cargo)', icon: 'fas fa-truck' },
    { value: 'tempo', label: 'Tempo (Goods)', icon: 'fas fa-truck-moving' }
  ];

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary mb-3">Book Transportation Service</h1>
        <p className="lead text-muted">
          Complete your booking in just a few simple steps
        </p>
      </div>

      {/* Progress Steps */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex justify-content-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="d-flex align-items-center">
                <div className={`rounded-circle d-flex align-items-center justify-content-center ${currentStep >= step ? 'bg-primary text-white' : 'bg-light text-muted'}`} style={{width: '40px', height: '40px'}}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`mx-3 ${currentStep > step ? 'bg-primary' : 'bg-light'}`} style={{width: '50px', height: '2px'}}></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-3">
            <small className="text-muted">
              Step {currentStep} of 3: {
                currentStep === 1 ? 'Select Service' :
                currentStep === 2 ? 'Booking Details' : 'Review & Confirm'
              }
            </small>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Service Selection */}
        {currentStep === 1 && (
          <div className="row">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">
                    <i className="fas fa-list me-2"></i>
                    Select Transportation Service
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="row g-4">
                    {services.map((service) => (
                      <div key={service._id} className="col-lg-4 col-md-6">
                        <div 
                          className={`card h-100 cursor-pointer ${selectedService?._id === service._id ? 'border-primary' : 'border-0'} shadow-sm`}
                          onClick={() => handleServiceSelect(service)}
                          style={{cursor: 'pointer'}}
                        >
                          <div className="card-body text-center p-4">
                            <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                              <i 
                                className={`${getServiceIcon(service.name)} text-primary fs-4`} 
                                style={{
                                  color: '#1e40af !important', 
                                  fontSize: '1.5rem',
                                  display: 'inline-block !important',
                                  fontFamily: '"Font Awesome 5 Free", "FontAwesome", sans-serif !important',
                                  fontWeight: '900 !important'
                                }}
                              ></i>
                            </div>
                            <h6 className="card-title">{service.name}</h6>
                            <p className="card-text text-muted small">{service.description}</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="text-primary fw-bold">₹{service.basePrice}</span>
                              {service.pricePerKm && (
                                <small className="text-muted">+ ₹{service.pricePerKm}/km</small>
                              )}
                            </div>
                            <span className={`badge ${service.isActive ? 'bg-success' : 'bg-secondary'}`}>
                              {service.isActive ? 'Available' : 'Unavailable'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {selectedService && (
                    <div className="mt-4 p-3 bg-light rounded">
                      <h6 className="mb-2">Selected Service:</h6>
                      <p className="mb-0">
                        <strong>{selectedService.name}</strong> - ₹{selectedService.basePrice}
                        {selectedService.pricePerKm && ` + ₹${selectedService.pricePerKm}/km`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Booking Details */}
        {currentStep === 2 && (
          <div className="row">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">
                    <i className="fas fa-edit me-2"></i>
                    Booking Details
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="Enter your email address"
                        {...register('email')}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email.message}</div>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Pickup Location *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.pickupLocation ? 'is-invalid' : ''}`}
                        placeholder="Enter pickup address"
                        {...register('pickupLocation')}
                      />
                      {errors.pickupLocation && (
                        <div className="invalid-feedback">{errors.pickupLocation.message}</div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Drop Location *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.dropLocation ? 'is-invalid' : ''}`}
                        placeholder="Enter drop address"
                        {...register('dropLocation')}
                      />
                      {errors.dropLocation && (
                        <div className="invalid-feedback">{errors.dropLocation.message}</div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Pickup Date *</label>
                      <input
                        type="date"
                        className={`form-control ${errors.pickupDate ? 'is-invalid' : ''}`}
                        {...register('pickupDate')}
                      />
                      {errors.pickupDate && (
                        <div className="invalid-feedback">{errors.pickupDate.message}</div>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Pickup Time *</label>
                      <input
                        type="time"
                        className={`form-control ${errors.pickupTime ? 'is-invalid' : ''}`}
                        {...register('pickupTime')}
                      />
                      {errors.pickupTime && (
                        <div className="invalid-feedback">{errors.pickupTime.message}</div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Vehicle Type *</label>
                      <select
                        className={`form-select ${errors.vehicleType ? 'is-invalid' : ''}`}
                        {...register('vehicleType')}
                      >
                        <option value="">Select vehicle type</option>
                        {vehicleTypes.map((vehicle) => (
                          <option key={vehicle.value} value={vehicle.value}>
                            {vehicle.label}
                          </option>
                        ))}
                      </select>
                      {errors.vehicleType && (
                        <div className="invalid-feedback">{errors.vehicleType.message}</div>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Driver Required</label>
                      <div className="form-check mt-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          {...register('driverRequired')}
                        />
                        <label className="form-check-label">
                          Include professional driver
                        </label>
                      </div>
                    </div>
                  </div>

                  {watchedValues.serviceType === 'person' && (
                    <div className="mb-3">
                      <label className="form-label">Number of Persons *</label>
                      <input
                        type="number"
                        className={`form-control ${errors.numberOfPersons ? 'is-invalid' : ''}`}
                        placeholder="Enter number of persons"
                        {...register('numberOfPersons')}
                      />
                      {errors.numberOfPersons && (
                        <div className="invalid-feedback">{errors.numberOfPersons.message}</div>
                      )}
                    </div>
                  )}

                  {watchedValues.serviceType === 'goods' && (
                    <div className="mb-3">
                      <label className="form-label">Goods Description *</label>
                      <textarea
                        className={`form-control ${errors.goodsDescription ? 'is-invalid' : ''}`}
                        rows={3}
                        placeholder="Describe the goods to be transported"
                        {...register('goodsDescription')}
                      ></textarea>
                      {errors.goodsDescription && (
                        <div className="invalid-feedback">{errors.goodsDescription.message}</div>
                      )}
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Special Instructions</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Any special requirements or instructions"
                      {...register('specialInstructions')}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Estimation */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">
                    <i className="fas fa-calculator me-2"></i>
                    Price Estimation
                  </h5>
                </div>
                <div className="card-body">
                  {selectedService && (
                    <div className="mb-3">
                      <h6>Service: {selectedService.name}</h6>
                      <p className="text-muted mb-2">Base Price: ₹{selectedService.basePrice}</p>
                      {selectedService.pricePerKm && (
                        <p className="text-muted mb-2">Per KM: ₹{selectedService.pricePerKm}</p>
                      )}
                    </div>
                  )}
                  
                  <div className="border-top pt-3">
                    <h4 className="text-primary mb-0">Estimated Total: ₹{estimatedPrice}</h4>
                    <small className="text-muted">* Final price may vary based on actual distance</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review & Confirm */}
        {currentStep === 3 && (
          <div className="row">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">
                    <i className="fas fa-check-circle me-2"></i>
                    Review & Confirm Booking
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="text-primary mb-3">Service Details</h6>
                      <p><strong>Service:</strong> {selectedService?.name}</p>
                      <p><strong>Category:</strong> {selectedService?.category}</p>
                      <p><strong>Vehicle Type:</strong> {watchedValues.vehicleType}</p>
                      <p><strong>Driver Required:</strong> {watchedValues.driverRequired ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-primary mb-3">Trip Details</h6>
                      <p><strong>Email:</strong> {watchedValues.email}</p>
                      <p><strong>From:</strong> {watchedValues.pickupLocation}</p>
                      <p><strong>To:</strong> {watchedValues.dropLocation}</p>
                      <p><strong>Date:</strong> {watchedValues.pickupDate}</p>
                      <p><strong>Time:</strong> {watchedValues.pickupTime}</p>
                    </div>
                  </div>
                  
                  <div className="border-top pt-3 mt-3">
                    <div className="row">
                      <div className="col-md-8">
                        <h6 className="text-primary mb-2">Special Instructions</h6>
                        <p className="text-muted">{watchedValues.specialInstructions || 'None'}</p>
                      </div>
                      <div className="col-md-4 text-end">
                        <h4 className="text-primary mb-0">Total Amount: ₹{estimatedPrice}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Previous
              </button>
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={nextStep}
                  disabled={!selectedService}
                >
                  Next
                  <i className="fas fa-arrow-right ms-2"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Creating Booking...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check me-2"></i>
                      Confirm Booking
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewBooking; 