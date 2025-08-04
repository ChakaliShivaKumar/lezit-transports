# LEZIT Transports Backend API

A comprehensive Node.js/Express.js backend API for LEZIT Transports booking system.

## 🚀 Features

- **User Authentication**: JWT-based authentication with role-based access
- **Booking Management**: Complete booking lifecycle management
- **Service Catalog**: Dynamic service management for transportation services
- **Admin Dashboard**: Admin-only routes for managing bookings and services
- **Data Validation**: Comprehensive input validation using express-validator
- **Security**: Helmet.js for security headers, CORS protection
- **Database**: MongoDB with Mongoose ODM
- **TypeScript**: Full TypeScript support with type safety

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd lezit-transports/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Bookings
- `POST /api/bookings` - Create a new booking (protected)
- `GET /api/bookings/my-bookings` - Get user's bookings (protected)
- `GET /api/bookings/:id` - Get booking by ID (protected)
- `PUT /api/bookings/:id/cancel` - Cancel booking (protected)
- `PUT /api/bookings/:id/status` - Update booking status (admin only)

### Services
- `GET /api/services` - Get all services (public)
- `GET /api/services/:id` - Get service by ID (public)
- `POST /api/services` - Create new service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### Health Check
- `GET /health` - API health check

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 👥 User Roles

- **user**: Regular customers who can make bookings
- **admin**: Administrators who can manage bookings, services, and users

## 📊 Database Models

### User
- name, email, password, phone, role, isActive

### Booking
- userId, serviceType, serviceCategory, pickupLocation, dropLocation, pickupDate, pickupTime, status, totalAmount, paymentStatus

### Service
- name, category, description, basePrice, pricePerKm, isActive

## 🧪 Testing

### Default Admin Credentials
- Email: `admin@lezittransports.com`
- Password: `admin123456`

### Sample API Requests

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "9876543210"
  }'
```

#### Create Booking
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "serviceType": "person",
    "serviceCategory": "Vehicle Rentals - With Driver",
    "pickupLocation": "Hyderabad",
    "dropLocation": "Bangalore",
    "pickupDate": "2024-01-15",
    "pickupTime": "09:00",
    "numberOfPersons": 4,
    "totalAmount": 5000
  }'
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

## 📁 Project Structure

```
src/
├── config/          # Database configuration
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript types
├── utils/           # Utility functions
└── server.ts        # Main server file
```

## 🚀 Deployment

1. Build the project: `npm run build`
2. Set environment variables for production
3. Start the server: `npm start`

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Shiva Kumar Chakali - Developer at LEZIT Transports 