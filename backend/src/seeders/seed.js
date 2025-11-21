import dotenv from 'dotenv';
import sequelize, { testConnection, syncDatabase } from '../lib/sequelize/database.js';
import { User, Product } from '../lib/sequelize/index.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seedUsers = async () => {
  console.log('🌱 Seeding users...');

  // Create admin user
  await User.create({
    name: 'Admin User',
    email: 'admin@hypemode.com',
    password: 'Admin123!',
    role: 'admin',
    phone: '+1234567890',
    address: '123 Admin Street',
    city: 'New York',
    postalCode: '10001',
    country: 'USA',
  });

  // Create regular user
  await User.create({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'User123!',
    role: 'user',
    phone: '+1234567891',
    address: '456 User Avenue',
    city: 'Los Angeles',
    postalCode: '90001',
    country: 'USA',
  });

  console.log('✅ Users seeded successfully');
};

const seedProducts = async () => {
  console.log('🌱 Seeding products...');

  const products = [
    // Jackets
    {
      name: 'Urban Bomber Jacket',
      description:
        'Premium bomber jacket with modern streetwear design. Features ribbed cuffs and hem, side pockets, and a comfortable fit.',
      price: 129.99,
      originalPrice: 159.99,
      discount: true,
      discountPercentage: 19,
      category: 'Jackets',
      subcategory: 'Bomber',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Navy', 'Olive'],
      image: '/images/Home/Categories/hypemode-jacket.png',
      images: ['/images/Home/Categories/hypemode-jacket.png'],
      stock: 50,
      rating: 4.5,
      reviewsCount: 23,
      featured: true,
      newArrival: true,
      bestSeller: false,
    },
    {
      name: 'Classic Denim Jacket',
      description: 'Timeless denim jacket with a modern fit. Perfect for layering in any season.',
      price: 89.99,
      originalPrice: null,
      discount: false,
      discountPercentage: null,
      category: 'Jackets',
      subcategory: 'Denim',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Blue', 'Black'],
      image: '/images/Home/Categories/hypemode-jacket.png',
      images: [],
      stock: 30,
      rating: 4.3,
      reviewsCount: 15,
      featured: false,
      newArrival: false,
      bestSeller: true,
    },
    {
      name: 'Leather Biker Jacket',
      description: 'Genuine leather jacket with asymmetric zipper and multiple pockets.',
      price: 249.99,
      originalPrice: 299.99,
      discount: true,
      discountPercentage: 17,
      category: 'Jackets',
      subcategory: 'Leather',
      sizes: ['M', 'L', 'XL'],
      colors: ['Black', 'Brown'],
      image: '/images/Home/Categories/hypemode-jacket.png',
      images: [],
      stock: 20,
      rating: 4.8,
      reviewsCount: 45,
      featured: true,
      newArrival: false,
      bestSeller: true,
    },

    // Sweaters
    {
      name: 'Cozy Knit Sweater',
      description: 'Comfortable knit sweater perfect for cold days. Made from soft cotton blend.',
      price: 59.99,
      originalPrice: 79.99,
      discount: true,
      discountPercentage: 25,
      category: 'Sweaters',
      subcategory: 'Knit',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Gray', 'Beige', 'Navy'],
      image: '/images/Home/Categories/sweater-hypemode.png',
      images: ['/images/Home/Categories/sweater-hypemode.png'],
      stock: 60,
      rating: 4.6,
      reviewsCount: 31,
      featured: false,
      newArrival: true,
      bestSeller: false,
    },
    {
      name: 'Turtleneck Sweater',
      description: 'Classic turtleneck sweater with a slim fit. Ideal for layering.',
      price: 69.99,
      originalPrice: null,
      discount: false,
      discountPercentage: null,
      category: 'Sweaters',
      subcategory: 'Turtleneck',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'White', 'Burgundy'],
      image: '/images/Home/Categories/sweater-hypemode.png',
      images: [],
      stock: 40,
      rating: 4.4,
      reviewsCount: 18,
      featured: false,
      newArrival: false,
      bestSeller: true,
    },
    {
      name: 'Oversized Hoodie Sweater',
      description: 'Trendy oversized hoodie sweater with kangaroo pocket and drawstring hood.',
      price: 79.99,
      originalPrice: 99.99,
      discount: true,
      discountPercentage: 20,
      category: 'Sweaters',
      subcategory: 'Hoodie',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Gray', 'Pink'],
      image: '/images/Home/Categories/sweater-hypemode.png',
      images: [],
      stock: 55,
      rating: 4.7,
      reviewsCount: 38,
      featured: true,
      newArrival: true,
      bestSeller: true,
    },

    // T-Shirts
    {
      name: 'Graphic Print T-Shirt',
      description: 'Bold graphic design t-shirt made from 100% cotton. Soft and breathable.',
      price: 29.99,
      originalPrice: 39.99,
      discount: true,
      discountPercentage: 25,
      category: 'T-Shirts',
      subcategory: 'Graphic',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black', 'Navy'],
      image: '/images/Home/Categories/TshirtCategory.png',
      images: ['/images/Home/Categories/TshirtCategory.png'],
      stock: 100,
      rating: 4.2,
      reviewsCount: 52,
      featured: false,
      newArrival: false,
      bestSeller: true,
    },
    {
      name: 'Essential Plain T-Shirt',
      description: 'Basic essential t-shirt in various colors. Perfect for everyday wear.',
      price: 19.99,
      originalPrice: null,
      discount: false,
      discountPercentage: null,
      category: 'T-Shirts',
      subcategory: 'Basic',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White', 'Black', 'Gray', 'Navy', 'Red'],
      image: '/images/Home/Categories/TshirtCategory.png',
      images: [],
      stock: 150,
      rating: 4.5,
      reviewsCount: 89,
      featured: false,
      newArrival: false,
      bestSeller: true,
    },
    {
      name: 'Vintage Band T-Shirt',
      description: 'Retro vintage band t-shirt with distressed print. Comfortable relaxed fit.',
      price: 34.99,
      originalPrice: 44.99,
      discount: true,
      discountPercentage: 22,
      category: 'T-Shirts',
      subcategory: 'Vintage',
      sizes: ['M', 'L', 'XL'],
      colors: ['Black', 'Gray'],
      image: '/images/Home/Categories/TshirtCategory.png',
      images: [],
      stock: 45,
      rating: 4.6,
      reviewsCount: 28,
      featured: true,
      newArrival: true,
      bestSeller: false,
    },

    // Accessories
    {
      name: 'Leather Crossbody Bag',
      description: 'Stylish leather crossbody bag with adjustable strap and multiple compartments.',
      price: 89.99,
      originalPrice: 119.99,
      discount: true,
      discountPercentage: 25,
      category: 'Accessories',
      subcategory: 'Bags',
      sizes: ['One Size'],
      colors: ['Black', 'Brown', 'Tan'],
      image: '/images/Home/Categories/acessories-hypemode.png',
      images: ['/images/Home/Categories/acessories-hypemode.png'],
      stock: 35,
      rating: 4.7,
      reviewsCount: 41,
      featured: true,
      newArrival: false,
      bestSeller: true,
    },
    {
      name: 'Minimalist Watch',
      description: 'Elegant minimalist watch with leather strap. Water-resistant design.',
      price: 149.99,
      originalPrice: null,
      discount: false,
      discountPercentage: null,
      category: 'Accessories',
      subcategory: 'Watches',
      sizes: ['One Size'],
      colors: ['Black', 'Silver', 'Gold'],
      image: '/images/Home/Categories/acessories-hypemode.png',
      images: [],
      stock: 25,
      rating: 4.8,
      reviewsCount: 63,
      featured: true,
      newArrival: true,
      bestSeller: true,
    },
    {
      name: 'Statement Necklace',
      description: 'Bold statement necklace with modern design. Perfect for any occasion.',
      price: 39.99,
      originalPrice: 59.99,
      discount: true,
      discountPercentage: 33,
      category: 'Accessories',
      subcategory: 'Jewelry',
      sizes: ['16"', '18"', '20"'],
      colors: ['Gold', 'Silver'],
      image: '/images/Home/Categories/acessories-hypemode.png',
      images: [],
      stock: 50,
      rating: 4.4,
      reviewsCount: 22,
      featured: false,
      newArrival: true,
      bestSeller: false,
    },

    // Shoes
    {
      name: 'Urban Sneakers',
      description: 'Comfortable urban sneakers with cushioned sole. Perfect for daily wear.',
      price: 119.99,
      originalPrice: 149.99,
      discount: true,
      discountPercentage: 20,
      category: 'Shoes',
      subcategory: 'Sneakers',
      sizes: ['38', '39', '40', '41', '42', '43', '44'],
      colors: ['White', 'Black', 'Gray'],
      image: '/images/Home/Categories/ShoesCategory.png',
      images: ['/images/Home/Categories/ShoesCategory.png'],
      stock: 70,
      rating: 4.6,
      reviewsCount: 95,
      featured: true,
      newArrival: false,
      bestSeller: true,
    },
    {
      name: 'High-Top Basketball Shoes',
      description: 'Performance basketball shoes with ankle support and excellent grip.',
      price: 139.99,
      originalPrice: null,
      discount: false,
      discountPercentage: null,
      category: 'Shoes',
      subcategory: 'Athletic',
      sizes: ['39', '40', '41', '42', '43', '44', '45'],
      colors: ['Red', 'Black', 'White'],
      image: '/images/Home/Categories/ShoesCategory.png',
      images: [],
      stock: 40,
      rating: 4.7,
      reviewsCount: 58,
      featured: false,
      newArrival: true,
      bestSeller: false,
    },
    {
      name: 'Chelsea Boots',
      description: 'Classic chelsea boots with elastic side panels. Made from premium leather.',
      price: 179.99,
      originalPrice: 219.99,
      discount: true,
      discountPercentage: 18,
      category: 'Shoes',
      subcategory: 'Boots',
      sizes: ['39', '40', '41', '42', '43'],
      colors: ['Black', 'Brown'],
      image: '/images/Home/Categories/ShoesCategory.png',
      images: [],
      stock: 30,
      rating: 4.8,
      reviewsCount: 72,
      featured: true,
      newArrival: false,
      bestSeller: true,
    },
  ];

  await Product.bulkCreate(products);

  console.log('✅ Products seeded successfully');
};

const runSeed = async () => {
  try {
    console.log('🚀 Starting database seeding...');

    // Test connection
    const connected = await testConnection();
    if (!connected) {
      console.error('❌ Failed to connect to database');
      process.exit(1);
    }

    // Sync database (WARNING: This will drop all tables and recreate them)
    console.log('⚠️  Syncing database (this will drop existing data)...');
    await syncDatabase(true); // force: true will drop tables

    // Seed data
    await seedUsers();
    await seedProducts();

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📝 Login credentials:');
    console.log('   Admin: admin@hypemode.com / Admin123!');
    console.log('   User:  john@example.com / User123!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

runSeed();

