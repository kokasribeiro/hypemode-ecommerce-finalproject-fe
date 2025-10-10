import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../server.js';
import { Product } from '../models/index.js';

describe('Products API', () => {
  let testProduct;

  beforeAll(async () => {
    // Create a test product
    testProduct = await Product.create({
      name: 'Test Product',
      description: 'A test product for testing purposes',
      price: 99.99,
      category: 'Test',
      subcategory: 'Testing',
      sizes: ['S', 'M', 'L'],
      colors: ['Red', 'Blue'],
      stock: 10,
      rating: 4.5,
      reviewsCount: 5,
      featured: true,
      newArrival: true,
      bestSeller: false,
      active: true,
    });
  });

  describe('GET /api/products', () => {
    it('should return all products with HATEOAS links', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body._links).toBeDefined();
      expect(response.body._links.self).toBeDefined();
      expect(response.body._links.create).toBeDefined();
    });

    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/products?page=1&limit=1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.currentPage).toBe(1);
      expect(response.body.totalPages).toBeDefined();
      expect(response.body._page).toBeDefined();
    });

    it('should support filtering by category', async () => {
      const response = await request(app)
        .get('/api/products?category=Test')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should support search functionality', async () => {
      const response = await request(app)
        .get('/api/products?search=Test')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return a single product with HATEOAS links', async () => {
      const response = await request(app)
        .get(`/api/products/${testProduct.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBe(testProduct.id);
      expect(response.body._links).toBeDefined();
      expect(response.body._links.self).toBeDefined();
      expect(response.body._links.update).toBeDefined();
      expect(response.body._links.delete).toBeDefined();
      expect(response.body._links.addToCart).toBeDefined();
    });

    it('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .get('/api/products/99999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('NOT_FOUND');
    });

    it('should validate product ID parameter', async () => {
      const response = await request(app)
        .get('/api/products/invalid-id')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product with validation', async () => {
      const productData = {
        name: 'New Test Product',
        description: 'A new test product with proper validation',
        price: 149.99,
        category: 'New Category',
        subcategory: 'New Subcategory',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White'],
        stock: 25,
        rating: 4.8,
        reviewsCount: 10,
        featured: false,
        newArrival: true,
        bestSeller: false,
        active: true,
      };

      const response = await request(app)
        .post('/api/products')
        .send(productData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.name).toBe(productData.name);
    });

    it('should validate required fields', async () => {
      const invalidProductData = {
        name: '', // Invalid: empty name
        price: -10, // Invalid: negative price
        category: 'Test',
      };

      const response = await request(app)
        .post('/api/products')
        .send(invalidProductData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.details).toBeDefined();
    });

    it('should sanitize input data', async () => {
      const productWithXSS = {
        name: '<script>alert("xss")</script>Test Product',
        description: 'A test product with <script>alert("xss")</script>',
        price: 99.99,
        category: 'Test',
        subcategory: 'Testing',
        sizes: ['S', 'M', 'L'],
        colors: ['Red', 'Blue'],
        stock: 10,
        active: true,
      };

      const response = await request(app)
        .post('/api/products')
        .send(productWithXSS)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).not.toContain('<script>');
      expect(response.body.data.description).not.toContain('<script>');
    });
  });

  describe('Rate Limiting', () => {
    it('should apply rate limiting to product endpoints', async () => {
      // Make multiple requests quickly to test rate limiting
      const requests = Array(10).fill().map(() => 
        request(app).get('/api/products')
      );

      const responses = await Promise.all(requests);
      
      // At least one request should be rate limited (429 status)
      const rateLimitedResponses = responses.filter(res => res.status === 429);
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });
});
