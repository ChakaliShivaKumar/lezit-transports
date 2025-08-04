import express, { Request } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const router = express.Router();

// Google OAuth routes
router.get('/google', (req, res) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return res.status(400).json({
      success: false,
      message: 'Google OAuth is not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.'
    });
  }
  return passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
});

router.get('/google/callback', (req, res) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return res.status(400).json({
      success: false,
      message: 'Google OAuth is not configured.'
    });
  }
  return passport.authenticate('google', { session: false, failureRedirect: '/login' })(req, res, () => {
    const user = (req as AuthenticatedRequest).user;
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Redirect to frontend with token
    const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/oauth-callback?token=${token}&provider=google`;
    res.redirect(redirectUrl);
  });
});

// Facebook OAuth routes
router.get('/facebook', (req, res) => {
  if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
    return res.status(400).json({
      success: false,
      message: 'Facebook OAuth is not configured. Please set FACEBOOK_APP_ID and FACEBOOK_APP_SECRET environment variables.'
    });
  }
  return passport.authenticate('facebook', { scope: ['email'] })(req, res);
});

router.get('/facebook/callback', (req, res) => {
  if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
    return res.status(400).json({
      success: false,
      message: 'Facebook OAuth is not configured.'
    });
  }
  return passport.authenticate('facebook', { session: false, failureRedirect: '/login' })(req, res, () => {
    const user = (req as AuthenticatedRequest).user;
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Redirect to frontend with token
    const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/oauth-callback?token=${token}&provider=facebook`;
    res.redirect(redirectUrl);
  });
});

export default router; 