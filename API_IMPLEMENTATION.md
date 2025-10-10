# HypeMode E-Commerce API Implementation

## Backend Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   ├── responseFormatter.js
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   └── index.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── schemas/
│   │   └── validationSchemas.js
│   ├── tests/
│   │   ├── setup.js
│   │   ├── products.test.js
│   │   └── auth.test.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── hateoas.js
│   └── server.js
├── package.json
└── vitest.config.js
```

## Key Features

### Validation with Zod

```javascript
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password must contain uppercase, lowercase, number, and special character',
    ),
});
```

### HATEOAS Implementation

```javascript
export const generateLinks = (req, resource, id = null) => {
  const baseUrl = `${req.protocol}://${req.get('host')}/api`;
  const resourcePath = `/${resource}`;
  const resourceIdPath = id ? `${resourcePath}/${id}` : resourcePath;

  return {
    self: {
      href: `${baseUrl}${resourceIdPath}`,
      method: 'GET',
    },
    create: {
      href: `${baseUrl}${resourcePath}`,
      method: 'POST',
      title: `Create new ${resource}`,
    },
    update: id
      ? {
          href: `${baseUrl}${resourceIdPath}`,
          method: 'PUT',
          title: `Update ${resource}`,
        }
      : null,
    delete: id
      ? {
          href: `${baseUrl}${resourceIdPath}`,
          method: 'DELETE',
          title: `Delete ${resource}`,
        }
      : null,
  };
};
```

### Rate Limiting

```javascript
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
```

### Input Sanitization

```javascript
export const sanitizeInput = (req, res, next) => {
  const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();
  };

  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeString(req.body[key]);
      }
    });
  }

  next();
};
```

### Error Handling

```javascript
export const formatErrorResponse = (req, res, error, statusCode = 500) => {
  const response = {
    success: false,
    error: {
      message: error.message || 'Internal server error',
      code: error.code || 'INTERNAL_ERROR',
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method,
    },
  };

  if (error.errors) {
    response.error.details = error.errors;
  }

  return res.status(statusCode).json(response);
};
```

### Testing Setup

```javascript
import { beforeAll, afterAll, beforeEach } from 'vitest';
import sequelize from '../config/database.js';

beforeAll(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('✅ Test database synced successfully');
  } catch (error) {
    console.error('❌ Failed to sync test database:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    await sequelize.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
  }
});
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products

- `GET /api/products` - List products with pagination
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart

- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove cart item
- `DELETE /api/cart` - Clear cart

### Orders

- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `DELETE /api/orders/:id` - Delete order

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "_links": {
    "self": { "href": "/api/products/1", "method": "GET" },
    "update": { "href": "/api/products/1", "method": "PUT" },
    "delete": { "href": "/api/products/1", "method": "DELETE" }
  },
  "timestamp": "2025-01-08T12:00:00.000Z",
  "path": "/api/products/1",
  "method": "GET"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format",
        "code": "invalid_format"
      }
    ],
    "timestamp": "2025-01-08T12:00:00.000Z",
    "path": "/api/auth/register",
    "method": "POST"
  }
}
```

## Scripts

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "db:seed": "node src/seeders/seed.js"
  }
}
```

## Dependencies

```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-rate-limit": "^7.5.1",
    "helmet": "^7.1.0",
    "jsonwebtoken": "^9.0.2",
    "morgan": "^1.10.0",
    "mysql2": "^3.6.5",
    "sequelize": "^6.35.2",
    "stripe": "^14.10.0",
    "zod": "^4.1.12"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "supertest": "^7.1.4",
    "vitest": "^3.2.4"
  }
}
```
