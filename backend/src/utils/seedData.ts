import User from '../models/User';
import Service from '../models/Service';
import connectDB from '../config/database';

const seedData = async (): Promise<void> => {
  try {
    await connectDB();

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@lezittransports.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@lezittransports.com',
        password: 'admin123456',
        phone: '9876543210',
        role: 'admin'
      });
      console.log('✅ Admin user created');
    }

    // Create services
    const services = [
      // Person Transportation Services
      {
        name: 'Vehicle Rentals - With Driver',
        category: 'person',
        description: 'Rent a vehicle for travelling long distances with professional driver included',
        basePrice: 1500,
        pricePerKm: 15,
        isActive: true
      },
      {
        name: 'Vehicle Rentals - Self Drive',
        category: 'person',
        description: 'Rent a vehicle for travelling long distances (driver not included)',
        basePrice: 1200,
        pricePerKm: 12,
        isActive: true
      },
      {
        name: 'Shuttle/Commute Transportation',
        category: 'person',
        description: 'Regular transportation for work, education, or daily commute',
        basePrice: 800,
        pricePerKm: 10,
        isActive: true
      },
      {
        name: 'Drivers',
        category: 'person',
        description: 'Professional driver booking service for your vehicle',
        basePrice: 1000,
        pricePerKm: 8,
        isActive: true
      },
      {
        name: 'Interstate Transportation',
        category: 'person',
        description: 'Cross-state travel services',
        basePrice: 2000,
        pricePerKm: 18,
        isActive: true
      },
      {
        name: 'Intrastate Transportation',
        category: 'person',
        description: 'Within-state travel services',
        basePrice: 1500,
        pricePerKm: 15,
        isActive: true
      },
      // Goods Transportation Services
      {
        name: 'Logistics',
        category: 'goods',
        description: 'B2B goods transportation between businesses',
        basePrice: 2500,
        pricePerKm: 20,
        isActive: true
      },
      {
        name: 'Order Delivery',
        category: 'goods',
        description: 'General goods delivery services',
        basePrice: 1800,
        pricePerKm: 16,
        isActive: true
      }
    ];

    for (const service of services) {
      const existingService = await Service.findOne({ name: service.name });
      if (!existingService) {
        await Service.create(service);
        console.log(`✅ Service created: ${service.name}`);
      }
    }

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedData();
}

export default seedData; 