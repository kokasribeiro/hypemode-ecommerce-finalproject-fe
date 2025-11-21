import { ZodError } from 'zod';
import { formatValidationError } from './responseFormatter.js';

/**
 * Validation middleware factory
 * Creates middleware functions for validating request data using Zod schemas
 */
export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    try {
      const data = req[property];
      const validatedData = schema.parse(data);
      req[property] = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues || error.errors || [];
        const errors = issues.map((err) => ({
          field: Array.isArray(err.path) ? err.path.join('.') : err.path,
          message: err.message,
          code: err.code,
        }));
        return formatValidationError(req, res, errors);
      }
      next(error);
    }
  };
};

/**
 * Validate request body
 */
export const validateBody = (schema) => validate(schema, 'body');

/**
 * Validate request query parameters
 */
export const validateQuery = (schema) => validate(schema, 'query');

/**
 * Validate request parameters
 */
export const validateParams = (schema) => validate(schema, 'params');

/**
 * Validate multiple properties at once
 */
export const validateMultiple = (schemas) => {
  return (req, res, next) => {
    try {
      Object.keys(schemas).forEach((property) => {
        const schema = schemas[property];
        const data = req[property];
        const validatedData = schema.parse(data);
        req[property] = validatedData;
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues || error.errors || [];
        const errors = issues.map((err) => ({
          field: Array.isArray(err.path) ? err.path.join('.') : err.path,
          message: err.message,
          code: err.code,
        }));
        return formatValidationError(req, res, errors);
      }
      next(error);
    }
  };
};

/**
 * Sanitize and validate input data
 */
export const sanitizeInput = (req, res, next) => {
  // Remove any potential XSS attempts
  const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();
  };

  // Sanitize body
  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeString(req.body[key]);
      }
    });
  }

  // Sanitize query
  if (req.query && typeof req.query === 'object') {
    Object.keys(req.query).forEach((key) => {
      if (typeof req.query[key] === 'string') {
        req.query[key] = sanitizeString(req.query[key]);
      }
    });
  }

  next();
};

/**
 * Validate file uploads
 */
export const validateFileUpload = (options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxFiles = 5,
  } = options;

  return (req, res, next) => {
    if (!req.files || req.files.length === 0) {
      return next();
    }

    const files = Array.isArray(req.files) ? req.files : [req.files];

    if (files.length > maxFiles) {
      return res.status(400).json({
        success: false,
        error: {
          message: `Maximum ${maxFiles} files allowed`,
          code: 'TOO_MANY_FILES',
          timestamp: new Date().toISOString(),
          path: req.originalUrl,
          method: req.method,
        },
      });
    }

    for (const file of files) {
      if (file.size > maxSize) {
        return res.status(400).json({
          success: false,
          error: {
            message: `File ${file.name} is too large. Maximum size is ${maxSize / 1024 / 1024}MB`,
            code: 'FILE_TOO_LARGE',
            timestamp: new Date().toISOString(),
            path: req.originalUrl,
            method: req.method,
          },
        });
      }

      if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({
          success: false,
          error: {
            message: `File type ${file.mimetype} not allowed. Allowed types: ${allowedTypes.join(', ')}`,
            code: 'INVALID_FILE_TYPE',
            timestamp: new Date().toISOString(),
            path: req.originalUrl,
            method: req.method,
          },
        });
      }
    }

    next();
  };
};
