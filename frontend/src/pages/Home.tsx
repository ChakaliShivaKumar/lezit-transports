import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Business Owner",
      content: "LEZIT TRANSPORTS has been our trusted partner for all business travel needs. Their service is reliable and professional.",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Frequent Traveler",
      content: "I use LEZIT for all my interstate travel. The drivers are courteous and the vehicles are always clean and comfortable.",
      rating: 5
    },
    {
      name: "Amit Kumar",
      role: "Logistics Manager",
      content: "Excellent goods transportation service. They handle our cargo with care and deliver on time, every time.",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const stats = [
    { number: "500+", label: "Happy Customers", icon: "fas fa-smile" },
    { number: "50+", label: "Cities Covered", icon: "fas fa-map-marker-alt" },
    { number: "24/7", label: "Support Available", icon: "fas fa-headset" },
    { number: "100%", label: "Safe Travel", icon: "fas fa-shield-alt" }
  ];

  return (
    <div>
            {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center hero-content">
            <div className="col-lg-6">
              <div className="hero-logo mb-4">
                <img 
                  src="/lezit-logo.jpg" 
                  alt="LEZIT TRANSPORTS" 
                  className="hero-logo-img"
                  style={{ 
                    height: '80px', 
                    width: 'auto',
                    backgroundColor: 'white',
                    padding: '8px',
                    borderRadius: '8px'
                  }}
                  onError={(e) => {
                    console.error('Logo failed to load');
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              {/* <h1 className="display-3 fw-bold mb-3 hero-title text-white">
                LEZIT TRANSPORTS
              </h1> */}
              <div className="hero-subtitle mb-4">
                <p className="lead text-gold mb-2 hero-description">
                  a transportation hub...
                </p>
                <p className="h4 text-white hero-description">
                  One stop solution for all your transportation purposes
                </p>
              </div>
              <p className="lead mb-4 hero-description">
                Experience reliable, safe, and efficient transportation services. 
                From personal travel to goods transportation, we've got you covered.
              </p>
              <div className="d-flex flex-wrap gap-3 hero-buttons">
                <Link to="/services" className="btn btn-light btn-lg">
                  <i className="fas fa-cogs me-2"></i>
                  Explore Services
                </Link>
                <Link to="/contact" className="btn btn-outline-light btn-lg">
                  <i className="fas fa-phone me-2"></i>
                  Get Quote
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-center hero-image">
                <img 
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Transportation" 
                  className="img-fluid rounded shadow"
                  style={{ borderRadius: '15px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Statistics Section */}
      <section className="stats-section py-5">
        <div className="container">
          <div className="row">
            {stats.map((stat, index) => (
              <div key={index} className="col-lg-3 col-md-5 mb-4">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className={stat.icon}></i>
                  </div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Our Services</h2>
            <p className="lead text-muted">
              Comprehensive transportation solutions for all your needs
            </p>
          </div>
          
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 feature-card border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="service-icon mb-3">
                    <i className="fas fa-users"></i>
                  </div>
                  <h5 className="card-title">Person Transportation</h5>
                  <p className="card-text text-muted">
                    Safe and comfortable travel for individuals and groups. 
                    Professional drivers and well-maintained vehicles.
                  </p>
                  <Link to="/services" className="btn btn-outline-primary">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 feature-card border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="service-icon mb-3">
                    <i className="fas fa-truck"></i>
                  </div>
                  <h5 className="card-title">Goods Transportation</h5>
                  <p className="card-text text-muted">
                    Reliable cargo and freight transportation services. 
                    Secure handling and timely delivery guaranteed.
                  </p>
                  <Link to="/services" className="btn btn-outline-primary">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 feature-card border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="service-icon mb-3">
                    <i className="fas fa-building"></i>
                  </div>
                  <h5 className="card-title">Business Solutions</h5>
                  <p className="card-text text-muted">
                    Corporate transportation and logistics solutions. 
                    Dedicated services for business clients.
                  </p>
                  <Link to="/services" className="btn btn-outline-primary">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="display-6 fw-bold mb-4">Why Choose LEZIT TRANSPORTS?</h2>
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="d-flex align-items-start">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px', minWidth: '40px'}}>
                      <i className="fas fa-shield-alt text-white"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold">Safe & Secure</h6>
                      <p className="text-muted small">Licensed drivers and insured vehicles</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px', minWidth: '40px'}}>
                      <i className="fas fa-clock text-white"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold">24/7 Service</h6>
                      <p className="text-muted small">Round the clock availability</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px', minWidth: '40px'}}>
                      <i className="fas fa-dollar-sign text-white"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold">Affordable Rates</h6>
                      <p className="text-muted small">Competitive pricing with no hidden costs</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px', minWidth: '40px'}}>
                      <i className="fas fa-headset text-white"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold">24/7 Support</h6>
                      <p className="text-muted small">Customer support whenever you need</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Transportation Features" 
                  className="img-fluid rounded shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">What Our Customers Say</h2>
            <p className="lead text-muted">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-5 text-center">
                  <div className="mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <i key={i} className="fas fa-star text-warning me-1"></i>
                    ))}
                  </div>
                  <blockquote className="blockquote mb-4">
                    <p className="lead">"{testimonials[currentTestimonial].content}"</p>
                  </blockquote>
                  <div>
                    <h6 className="fw-bold mb-1">{testimonials[currentTestimonial].name}</h6>
                    <p className="text-muted mb-0">{testimonials[currentTestimonial].role}</p>
                  </div>
                  
                  {/* Testimonial Navigation */}
                  <div className="mt-4">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={`btn btn-sm mx-1 ${currentTestimonial === index ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setCurrentTestimonial(index)}
                      >
                        <span className="visually-hidden">Testimonial {index + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="display-6 fw-bold mb-3">Ready to Get Started?</h2>
          <p className="lead mb-4">
            Book your transportation service today and experience the difference
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {isAuthenticated ? (
              <Link to="/services" className="btn btn-light btn-lg">
                <i className="fas fa-calendar-plus me-2"></i>
                Book Now
              </Link>
            ) : (
              <Link to="/register" className="btn btn-light btn-lg me-3">
                <i className="fas fa-user-plus me-2"></i>
                Register Now
              </Link>
            )}
            <Link to="/contact" className="btn btn-outline-light btn-lg">
              <i className="fas fa-phone me-2"></i>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 