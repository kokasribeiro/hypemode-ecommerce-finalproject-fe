/**
 * Response formatter middleware
 * Ensures consistent API responses following REST principles
 */

export const formatSuccessResponse = (req, res, data, statusCode = 200, message = null) => {
  const response = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method
  };

  if (message) {
    response.message = message;
  }

  return res.status(statusCode).json(response);
};

export const formatErrorResponse = (req, res, error, statusCode = 500) => {
  const response = {
    success: false,
    error: {
      message: error.message || 'Internal server error',
      code: error.code || 'INTERNAL_ERROR',
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    }
  };

  // Add validation errors if they exist
  if (error.errors) {
    response.error.details = error.errors;
  }

  // Add stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.error.stack = error.stack;
  }

  return res.status(statusCode).json(response);
};

export const formatValidationError = (req, res, errors) => {
  const response = {
    success: false,
    error: {
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: errors,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    }
  };

  return res.status(400).json(response);
};

export const formatNotFoundError = (req, res, resource = 'Resource') => {
  const response = {
    success: false,
    error: {
      message: `${resource} not found`,
      code: 'NOT_FOUND',
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    }
  };

  return res.status(404).json(response);
};

export const formatUnauthorizedError = (req, res, message = 'Unauthorized') => {
  const response = {
    success: false,
    error: {
      message,
      code: 'UNAUTHORIZED',
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    }
  };

  return res.status(401).json(response);
};

export const formatForbiddenError = (req, res, message = 'Forbidden') => {
  const response = {
    success: false,
    error: {
      message,
      code: 'FORBIDDEN',
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    }
  };

  return res.status(403).json(response);
};
