# LEZIT Transports Frontend

A modern React.js frontend application for LEZIT Transports booking system.

## 🚀 Features

- **Modern UI/UX**: Built with React 18, TypeScript, and Tailwind CSS
- **Authentication**: Complete user registration and login system
- **Responsive Design**: Mobile-first responsive design
- **Form Validation**: Comprehensive form validation with Yup and React Hook Form
- **State Management**: Context API for authentication state
- **Routing**: React Router for navigation
- **Toast Notifications**: User feedback with react-toastify

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend README)

## 🛠️ Installation

1. **Navigate to frontend directory**
   ```bash
   cd lezit-transports/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm start
```

The application will start on `http://localhost:3000`

### Production Build
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout/         # Layout components (Header, Footer, etc.)
├── context/            # React Context providers
├── pages/              # Page components
├── services/           # API service functions
├── types/              # TypeScript type definitions
├── App.tsx             # Main App component
└── index.tsx           # Application entry point
```

## 🔧 Key Technologies

- **React 18**: Latest React with hooks and concurrent features
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **React Hook Form**: Form handling and validation
- **Yup**: Schema validation
- **Axios**: HTTP client for API calls
- **React Toastify**: Toast notifications

## 🎨 Design System

### Colors
- **Primary**: Blue shades (primary-50 to primary-900)
- **Secondary**: Gray shades (secondary-50 to secondary-900)
- **Success**: Green for positive actions
- **Error**: Red for errors and warnings

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Buttons**: Primary, secondary, and outline variants
- **Forms**: Consistent form styling with validation states
- **Cards**: Reusable card components
- **Layout**: Responsive grid system

## 🔐 Authentication Flow

1. **Registration**: Users can create new accounts
2. **Login**: Existing users can sign in
3. **Token Storage**: JWT tokens stored in localStorage
4. **Protected Routes**: Authentication required for certain pages
5. **Auto Logout**: Automatic logout on token expiration

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: 
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- **Flexible Layout**: Adapts to different screen sizes

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```env
REACT_APP_API_URL=https://your-backend-api.com/api
```

## 🔧 Development

### Code Style
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Strict type checking

### Available Scripts
- `npm start`: Start development server
- `npm run build`: Build for production
- `npm test`: Run tests
- `npm run eject`: Eject from Create React App

## 📚 API Integration

The frontend communicates with the backend API through the `apiService` module:

- **Authentication**: Login, register, get current user
- **Services**: Get available transportation services
- **Bookings**: Create, view, and manage bookings
- **Error Handling**: Centralized error handling with toast notifications

## 🎯 Future Enhancements

- **Admin Dashboard**: Complete admin interface
- **Booking Management**: Full booking lifecycle
- **Payment Integration**: Stripe/Razorpay integration
- **Real-time Updates**: WebSocket integration
- **PWA Features**: Progressive Web App capabilities
- **Advanced Search**: Service filtering and search
- **Reviews & Ratings**: Customer feedback system

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Shiva Kumar Chakali - Developer at LEZIT Transports
