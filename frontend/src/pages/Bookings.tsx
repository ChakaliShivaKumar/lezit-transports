import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';
import { Booking } from '../types';
import { toast } from 'react-toastify';

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await apiService.getMyBookings();
      if (response.success) {
        setBookings(response.data?.bookings || []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const response = await apiService.cancelBooking(bookingId);
        if (response.success) {
          toast.success('Booking cancelled successfully');
          fetchBookings(); // Refresh the list
        }
      } catch (error) {
        console.error('Error cancelling booking:', error);
        toast.error('Failed to cancel booking');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { class: 'bg-warning', text: 'Pending' },
      'confirmed': { class: 'bg-success', text: 'Confirmed' },
      'in-progress': { class: 'bg-info', text: 'In Progress' },
      'completed': { class: 'bg-secondary', text: 'Completed' },
      'cancelled': { class: 'bg-danger', text: 'Cancelled' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { class: 'bg-secondary', text: status };
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'upcoming') {
      return ['pending', 'confirmed', 'in-progress'].includes(booking.status);
    } else if (activeTab === 'past') {
      return booking.status === 'completed';
    } else if (activeTab === 'cancelled') {
      return booking.status === 'cancelled';
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="row mb-5">
        <div className="col-md-8">
          <h1 className="display-5 fw-bold text-primary mb-2">My Bookings</h1>
          <p className="lead text-muted">
            Manage your transportation bookings and track their status
          </p>
        </div>
        <div className="col-md-4 text-md-end">
          <Link to="/bookings/new" className="btn btn-primary">
            <i 
              className="fas fa-plus me-2"
              style={{
                display: 'inline-block !important',
                fontFamily: '"Font Awesome 5 Free", "FontAwesome", sans-serif !important',
                fontWeight: '900 !important'
              }}
            ></i>
            New Booking
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-0 bg-primary text-white">
            <div className="card-body text-center">
              <i 
                className="fas fa-clock fa-2x mb-2" 
                style={{
                  display: 'inline-block !important',
                  fontFamily: '"Font Awesome 5 Free", "FontAwesome", sans-serif !important',
                  fontWeight: '900 !important'
                }}
              ></i>
              <h4>{bookings.filter(b => ['pending', 'confirmed', 'in-progress'].includes(b.status)).length}</h4>
              <p className="mb-0">Upcoming</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 bg-success text-white">
            <div className="card-body text-center">
              <i 
                className="fas fa-check-circle fa-2x mb-2"
                style={{
                  display: 'inline-block !important',
                  fontFamily: '"Font Awesome 5 Free", "FontAwesome", sans-serif !important',
                  fontWeight: '900 !important'
                }}
              ></i>
              <h4>{bookings.filter(b => b.status === 'completed').length}</h4>
              <p className="mb-0">Completed</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 bg-danger text-white">
            <div className="card-body text-center">
              <i 
                className="fas fa-times-circle fa-2x mb-2"
                style={{
                  display: 'inline-block !important',
                  fontFamily: '"Font Awesome 5 Free", "FontAwesome", sans-serif !important',
                  fontWeight: '900 !important'
                }}
              ></i>
              <h4>{bookings.filter(b => b.status === 'cancelled').length}</h4>
              <p className="mb-0">Cancelled</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 bg-info text-white">
            <div className="card-body text-center">
              <i 
                className="fas fa-rupee-sign fa-2x mb-2"
                style={{
                  display: 'inline-block !important',
                  fontFamily: '"Font Awesome 5 Free", "FontAwesome", sans-serif !important',
                  fontWeight: '900 !important'
                }}
              ></i>
              <h4>₹{bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0).toLocaleString()}</h4>
              <p className="mb-0">Total Spent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4" id="bookingTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            <i className="fas fa-clock me-2"></i>
            Upcoming
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            <i className="fas fa-history me-2"></i>
            Past
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'cancelled' ? 'active' : ''}`}
            onClick={() => setActiveTab('cancelled')}
          >
            <i className="fas fa-times me-2"></i>
            Cancelled
          </button>
        </li>
      </ul>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-5">
                      <i 
              className="fas fa-calendar-times fa-3x text-muted mb-3"
              style={{
                display: 'inline-block !important',
                fontFamily: '"Font Awesome 5 Free", "FontAwesome", sans-serif !important',
                fontWeight: '900 !important'
              }}
            ></i>
          <h4 className="text-muted">No {activeTab} bookings</h4>
          <p className="text-muted">
            {activeTab === 'upcoming' 
              ? "You don't have any upcoming bookings. Start by booking a service!"
              : `You don't have any ${activeTab} bookings.`
            }
          </p>
          {activeTab === 'upcoming' && (
            <Link to="/bookings/new" className="btn btn-primary">
              <i 
                className="fas fa-plus me-2"
                style={{
                  display: 'inline-block !important',
                  fontFamily: '"Font Awesome 5 Free", "FontAwesome", sans-serif !important',
                  fontWeight: '900 !important'
                }}
              ></i>
              Book a Service
            </Link>
          )}
        </div>
      ) : (
        <div className="row">
          {filteredBookings.map((booking) => (
            <div key={booking._id} className="col-12 mb-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-3">
                      <h6 className="text-muted mb-1">Service</h6>
                      <h5 className="mb-0">{booking.serviceType}</h5>
                      <small className="text-muted">{booking.serviceCategory}</small>
                    </div>
                    <div className="col-md-2">
                      <h6 className="text-muted mb-1">Date</h6>
                      <p className="mb-0">{new Date(booking.pickupDate).toLocaleDateString()}</p>
                      <small className="text-muted">{booking.pickupTime}</small>
                    </div>
                    <div className="col-md-3">
                      <h6 className="text-muted mb-1">Route</h6>
                      <p className="mb-0">
                        <i className="fas fa-map-marker-alt text-success me-1"></i>
                        {booking.pickupLocation}
                      </p>
                      <small className="text-muted">
                        <i className="fas fa-arrow-down me-1"></i>
                        {booking.dropLocation}
                      </small>
                    </div>
                    <div className="col-md-2">
                      <h6 className="text-muted mb-1">Amount</h6>
                      <h5 className="text-primary mb-0">₹{booking.totalAmount}</h5>
                      {getStatusBadge(booking.status)}
                    </div>
                    <div className="col-md-2 text-end">
                      {['pending', 'confirmed'].includes(booking.status) && (
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          <i className="fas fa-times me-1"></i>
                          Cancel
                        </button>
                      )}
                      <button className="btn btn-outline-primary btn-sm ms-2">
                        <i className="fas fa-eye me-1"></i>
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings; 