import { formatErrorResponse } from './responseFormatter.js';

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  let error = { ...err };
  error.message = err.message;

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    const message = err.errors.map((e) => e.message).join(', ');
    error = { message, statusCode: 400, code: 'VALIDATION_ERROR' };
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400, code: 'DUPLICATE_ERROR' };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = { message, statusCode: 401, code: 'INVALID_TOKEN' };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { message, statusCode: 401, code: 'TOKEN_EXPIRED' };
  }

  // Cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    const message = 'Invalid ID format';
    error = { message, statusCode: 400, code: 'INVALID_ID' };
  }

  return formatErrorResponse(req, res, error, error.statusCode || 500);
};

export default errorHandler;
