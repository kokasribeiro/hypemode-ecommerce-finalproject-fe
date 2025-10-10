import { z } from 'zod';

// User validation schemas
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    ),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      ),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Product validation schemas
export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, 'Product name must be at least 2 characters')
    .max(100, 'Product name must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  price: z.number().positive('Price must be positive'),
  originalPrice: z.number().positive('Original price must be positive').optional(),
  discount: z.boolean().optional(),
  discountPercentage: z.number().min(0).max(100, 'Discount percentage must be between 0 and 100').optional(),
  category: z.string().min(2, 'Category must be at least 2 characters'),
  subcategory: z.string().optional(),
  sizes: z.array(z.string()).min(1, 'At least one size must be provided'),
  colors: z.array(z.string()).min(1, 'At least one color must be provided'),
  image: z.string().url('Image must be a valid URL').optional(),
  images: z.array(z.string().url('Images must be valid URLs')).optional(),
  stock: z.number().int().min(0, 'Stock must be non-negative'),
  rating: z.number().min(0).max(5, 'Rating must be between 0 and 5').optional(),
  reviewsCount: z.number().int().min(0, 'Reviews count must be non-negative').optional(),
  featured: z.boolean().optional(),
  newArrival: z.boolean().optional(),
  bestSeller: z.boolean().optional(),
  active: z.boolean().optional(),
});

export const updateProductSchema = createProductSchema.partial();

// Cart validation schemas
export const addToCartSchema = z.object({
  productId: z.number().int().positive('Product ID must be a positive integer'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1').max(10, 'Maximum quantity is 10'),
  size: z.string().min(1, 'Size is required'),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(1, 'Quantity must be at least 1').max(10, 'Maximum quantity is 10'),
});

// Order validation schemas
export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.number().int().positive('Product ID must be a positive integer'),
        quantity: z.number().int().min(1, 'Quantity must be at least 1'),
        price: z.number().positive('Price must be positive'),
        size: z.string().optional(),
        color: z.string().optional(),
      }),
    )
    .min(1, 'At least one item is required'),
  shippingAddress: z.object({
    street: z.string().min(5, 'Street address must be at least 5 characters'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    postalCode: z.string().min(3, 'Postal code must be at least 3 characters'),
    country: z.string().min(2, 'Country must be at least 2 characters'),
  }),
  billingAddress: z
    .object({
      street: z.string().min(5, 'Street address must be at least 5 characters'),
      city: z.string().min(2, 'City must be at least 2 characters'),
      postalCode: z.string().min(3, 'Postal code must be at least 3 characters'),
      country: z.string().min(2, 'Country must be at least 2 characters'),
    })
    .optional(),
  paymentMethod: z.enum(['credit_card', 'debit_card', 'paypal', 'stripe'], {
    errorMap: () => ({ message: 'Payment method must be credit_card, debit_card, paypal, or stripe' }),
  }),
  subtotal: z.number().positive('Subtotal must be positive').optional(),
  tax: z.number().min(0, 'Tax must be non-negative').optional(),
  shipping: z.number().min(0, 'Shipping must be non-negative').optional(),
  total: z.number().positive('Total must be positive').optional(),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional().nullable(),
});

// Query parameter validation schemas
export const productQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  minPrice: z
    .string()
    .transform((val) => (val ? parseFloat(val) : undefined))
    .optional(),
  maxPrice: z
    .string()
    .transform((val) => (val ? parseFloat(val) : undefined))
    .optional(),
  discount: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional(),
  featured: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional(),
  newArrival: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional(),
  bestSeller: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional(),
  page: z
    .string()
    .transform((val) => parseInt(val) || 1)
    .optional(),
  limit: z
    .string()
    .transform((val) => parseInt(val) || 20)
    .optional(),
  sort: z.string().optional(),
});

// ID parameter validation
export const idParamSchema = z.object({
  id: z.string().transform((val) => {
    const num = parseInt(val);
    if (isNaN(num) || num <= 0) {
      throw new Error('ID must be a positive integer');
    }
    return num;
  }),
});
