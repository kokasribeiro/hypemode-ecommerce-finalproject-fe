import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../server.js';
import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';

describe('Authentication API', () => {
  let testUser;

  beforeAll(async () => {
    // Create a test user
    const hashedPassword = await bcrypt.hash('TestPassword123!', 10);
    testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      phone: '+1234567890',
      address: '123 Test Street',
      city: 'Test City',
      postalCode: '12345',
      country: 'Test Country',
    });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user with validation', async () => {
      const userData = {
        name: 'New Test User',
        email: 'newuser@example.com',
        password: 'NewPassword123!',
        phone: '+9876543210',
        address: '456 New Street',
        city: 'New City',
        postalCode: '54321',
        country: 'New Country',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.token).toBeDefined();
      expect(response.body._links).toBeDefined();
      expect(response.body._links.login).toBeDefined();
      expect(response.body._links.profile).toBeDefined();
    });

    it('should validate password requirements', async () => {
      const invalidUserData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'weak', // Invalid: too weak
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidUserData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.details).toBeDefined();
    });

    it('should validate email format', async () => {
      const invalidUserData = {
        name: 'Test User',
        email: 'invalid-email', // Invalid: not a valid email
        password: 'ValidPassword123!',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidUserData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should prevent duplicate email registration', async () => {
      const duplicateUserData = {
        name: 'Another Test User',
        email: 'test@example.com', // Same email as existing user
        password: 'AnotherPassword123!',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(duplicateUserData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'TestPassword123!',
        rememberMe: false,
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.token).toBeDefined();
      expect(response.body._links).toBeDefined();
      expect(response.body._links.profile).toBeDefined();
      expect(response.body._links.logout).toBeDefined();
    });

    it('should login with remember me option', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'TestPassword123!',
        rememberMe: true,
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();
    });

    it('should reject invalid credentials', async () => {
      const invalidLoginData = {
        email: 'test@example.com',
        password: 'WrongPassword123!',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(invalidLoginData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Invalid credentials');
    });

    it('should validate required fields', async () => {
      const incompleteLoginData = {
        email: 'test@example.com',
        // Missing password
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(incompleteLoginData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/auth/me', () => {
    let authToken;

    beforeAll(async () => {
      // Login to get token
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'TestPassword123!',
        });

      authToken = loginResponse.body.data.token;
    });

    it('should return user profile with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.email).toBe('test@example.com');
    });

    it('should reject requests without token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('UNAUTHORIZED');
    });

    it('should reject requests with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('INVALID_TOKEN');
    });
  });

  describe('Rate Limiting', () => {
    it('should apply rate limiting to auth endpoints', async () => {
      // Make multiple login attempts quickly
      const requests = Array(10).fill().map(() => 
        request(app)
          .post('/api/auth/login')
          .send({
            email: 'test@example.com',
            password: 'WrongPassword123!',
          })
      );

      const responses = await Promise.all(requests);
      
      // At least one request should be rate limited (429 status)
      const rateLimitedResponses = responses.filter(res => res.status === 429);
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });
});
