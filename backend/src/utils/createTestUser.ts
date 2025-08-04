import User from '../models/User';
import connectDB from '../config/database';

const createTestUser = async (): Promise<void> => {
  try {
    await connectDB();

    // Create regular test user
    const testUserExists = await User.findOne({ email: 'test@example.com' });
    if (!testUserExists) {
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123',
        phone: '9876543211',
        role: 'user'
      });
      console.log('✅ Test user created');
      console.log('Email: test@example.com');
      console.log('Password: test123');
    } else {
      console.log('✅ Test user already exists');
      console.log('Email: test@example.com');
      console.log('Password: test123');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating test user:', error);
    process.exit(1);
  }
};

// Run if this file is executed directly
if (require.main === module) {
  createTestUser();
}

export default createTestUser; 