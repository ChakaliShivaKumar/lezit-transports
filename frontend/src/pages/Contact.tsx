import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import apiService from '../services/api';

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  phone: yup.string().required('Phone number is required').min(10, 'Please enter a valid phone number'),
  subject: yup.string().required('Subject is required').min(5, 'Subject must be at least 5 characters'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters')
}).required();

type ContactFormData = yup.InferType<typeof schema>;

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5001/api/contact/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Message sent successfully! We will get back to you soon.');
        reset();
      } else {
        toast.error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary mb-3">Contact Us</h1>
        <p className="lead text-muted">
          Get in touch with us for any questions or support
        </p>
      </div>

      <div className="row">
        {/* Contact Information */}
        <div className="col-lg-4 mb-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h4 className="text-primary mb-4">Get In Touch</h4>
              
              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                  <i className="fas fa-map-marker-alt text-primary"></i>
                </div>
                <div>
                  <h6 className="mb-1">Address</h6>
                  <p className="text-muted mb-0">Hyderabad, Telangana, India</p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                  <i className="fas fa-phone text-primary"></i>
                </div>
                <div>
                  <h6 className="mb-1">Phone</h6>
                  <p className="text-muted mb-0">+91 98765 43210</p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                  <i className="fas fa-envelope text-primary"></i>
                </div>
                <div>
                  <h6 className="mb-1">Email</h6>
                  <p className="text-muted mb-0">info@lezittransports.com</p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                  <i className="fas fa-clock text-primary"></i>
                </div>
                <div>
                  <h6 className="mb-1">Business Hours</h6>
                  <p className="text-muted mb-0">24/7 Service Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-paper-plane me-2"></i>
                Send us a Message
              </h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Enter your full name"
                      {...register('name')}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name.message}</div>
                    )}
                  </div>
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
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="Enter your phone number"
                      {...register('phone')}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone.message}</div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Subject *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                      placeholder="Enter subject"
                      {...register('subject')}
                    />
                    {errors.subject && (
                      <div className="invalid-feedback">{errors.subject.message}</div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Message *</label>
                  <textarea
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    rows={5}
                    placeholder="Enter your message"
                    {...register('message')}
                  ></textarea>
                  {errors.message && (
                    <div className="invalid-feedback">{errors.message.message}</div>
                  )}
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="text-center">
            <h4 className="text-primary mb-4">Follow Us</h4>
            <div className="d-flex justify-content-center gap-3">
              <a href="#" className="btn btn-outline-primary btn-lg">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="btn btn-outline-primary btn-lg">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="btn btn-outline-primary btn-lg">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="btn btn-outline-primary btn-lg">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 