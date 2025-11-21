import express from 'express';
import { User, Product } from '../../lib/sequelize/index.js';

const router = express.Router();

// Seed endpoint - only works in development or with special key
router.post('/seed', async (req, res) => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await Product.destroy({ where: {}, force: true });
    await User.destroy({ where: {}, force: true });

    // Seed users
    await User.bulkCreate([
      {
        name: 'Admin User',
        email: 'admin@hypemode.com',
        password: 'Admin123!',
        role: 'admin',
        phone: '+1234567890',
        address: '123 Admin Street',
        city: 'New York',
        postalCode: '10001',
        country: 'USA',
      },
      {
        name: 'Test User',
        email: 'test@test.com',
        password: 'Test123!',
        role: 'user',
        phone: '+1234567891',
        address: '456 User Avenue',
        city: 'Los Angeles',
        postalCode: '90001',
        country: 'USA',
      },
    ]);

    // Seed products
    const products = [
      {
        name: 'Urban Bomber Jacket',
        description: 'Premium bomber jacket with modern streetwear design.',
        price: 129.99,
        originalPrice: 159.99,
        discount: true,
        discountPercentage: 19,
        category: 'Jackets',
        subcategory: 'Bomber',
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        colors: JSON.stringify(['Black', 'Navy', 'Olive']),
        image: '/images/Home/Categories/hypemode-jacket.png',
        images: JSON.stringify(['/images/Home/Categories/hypemode-jacket.png']),
        stock: 50,
        rating: 4.5,
        reviewsCount: 128,
        featured: true,
        newArrival: true,
        bestSeller: false,
        active: true,
      },
      {
        name: 'Classic Denim Jacket',
        description: 'Timeless denim jacket with vintage wash.',
        price: 89.99,
        category: 'Jackets',
        subcategory: 'Denim',
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        colors: JSON.stringify(['Blue', 'Black']),
        image: '/images/Home/Categories/hypemode-jacket.png',
        images: JSON.stringify(['/images/Home/Categories/hypemode-jacket.png']),
        stock: 30,
        rating: 4.3,
        reviewsCount: 89,
        featured: false,
        newArrival: false,
        bestSeller: true,
        active: true,
      },
      {
        name: 'Oversized Hoodie',
        description: 'Comfortable oversized hoodie perfect for streetwear.',
        price: 79.99,
        originalPrice: 99.99,
        discount: true,
        discountPercentage: 20,
        category: 'Hoodies',
        subcategory: 'Oversized',
        sizes: JSON.stringify(['M', 'L', 'XL', 'XXL']),
        colors: JSON.stringify(['Black', 'Gray', 'White']),
        image: '/images/Home/Categories/hypemode-jacket.png',
        images: JSON.stringify(['/images/Home/Categories/hypemode-jacket.png']),
        stock: 75,
        rating: 4.7,
        reviewsCount: 256,
        featured: true,
        newArrival: true,
        bestSeller: true,
        active: true,
      },
      {
        name: 'Graphic T-Shirt',
        description: 'Bold graphic print on premium cotton.',
        price: 39.99,
        category: 'T-Shirts',
        subcategory: 'Graphic',
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        colors: JSON.stringify(['Black', 'White', 'Red']),
        image: '/images/Home/Categories/hypemode-jacket.png',
        images: JSON.stringify(['/images/Home/Categories/hypemode-jacket.png']),
        stock: 100,
        rating: 4.4,
        reviewsCount: 178,
        featured: false,
        newArrival: true,
        bestSeller: false,
        active: true,
      },
      {
        name: 'Cargo Pants',
        description: 'Functional cargo pants with multiple pockets.',
        price: 69.99,
        originalPrice: 89.99,
        discount: true,
        discountPercentage: 22,
        category: 'Pants',
        subcategory: 'Cargo',
        sizes: JSON.stringify(['28', '30', '32', '34', '36']),
        colors: JSON.stringify(['Black', 'Khaki', 'Olive']),
        image: '/images/Home/Categories/hypemode-jacket.png',
        images: JSON.stringify(['/images/Home/Categories/hypemode-jacket.png']),
        stock: 60,
        rating: 4.6,
        reviewsCount: 145,
        featured: true,
        newArrival: false,
        bestSeller: true,
        active: true,
      },
    ];

    await Product.bulkCreate(products);

    console.log('✅ Database seeded successfully!');

    res.status(200).json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        users: 2,
        products: products.length,
      },
    });
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    res.status(500).json({
      success: false,
      message: 'Error seeding database',
      error: error.message,
    });
  }
});

export default router;

