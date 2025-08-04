import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User, { IUserDocument } from '../models/User';
import jwt from 'jsonwebtoken';
import { Profile } from 'passport';

// Google OAuth Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
        scope: ['profile', 'email']
      },
    async (accessToken: string, refreshToken: string, profile: Profile, done: any) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails?.[0]?.value });

        if (user) {
          // Update user's Google ID if not set
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
          return done(null, user);
        }

        // Create new user
        user = new User({
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          googleId: profile.id,
          phone: '', // Google doesn't provide phone
          role: 'user',
          isActive: true
        });

        await user.save();
        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  ));
} else {
  console.log('⚠️  Google OAuth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable.');
}

// Facebook OAuth Strategy
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/api/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'emails']
      },
    async (accessToken: string, refreshToken: string, profile: Profile, done: any) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails?.[0]?.value });

        if (user) {
          // Update user's Facebook ID if not set
          if (!user.facebookId) {
            user.facebookId = profile.id;
            await user.save();
          }
          return done(null, user);
        }

        // Create new user
        user = new User({
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          facebookId: profile.id,
          phone: '', // Facebook doesn't provide phone
          role: 'user',
          isActive: true
        });

        await user.save();
        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  ));
} else {
  console.log('⚠️  Facebook OAuth not configured. Set FACEBOOK_APP_ID and FACEBOOK_APP_SECRET to enable.');
}

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport; 