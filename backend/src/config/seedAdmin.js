import User from '../models/User.js';


export const seedAdminUser = async () => {
    try {
        const adminEmail = 'admin@example.com';

        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('✅ Admin user already exists');
            return;
        }

        const adminUser = await User.create({
            username: 'admin',
            email: adminEmail,
            password: 'Admin123',
            role: 'admin'
        });

        console.log('✅ Default admin user created successfully!');
        console.log('📧 Email: admin@example.com');
        console.log('🔑 Password: Admin123');
        console.log('👤 Role: admin');

    } catch (error) {
        console.error('❌ Error seeding admin user:', error.message);
    }
};
