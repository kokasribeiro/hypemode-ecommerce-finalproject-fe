// Validation Constants
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_UPPERCASE_REGEX: /[A-Z]/,
  PASSWORD_SPECIAL_CHAR_REGEX: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
  MIN_PASSWORD_LENGTH: 8,
  MIN_AGE_REQUIREMENT: 16,
};

export const FORM_FIELDS = {
  REQUIRED_REGISTRATION_FIELDS: [
    'firstName',
    'lastName',
    'dateOfBirth',
    'email',
    'username',
    'password',
    'confirmPassword',
  ],
};

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: (fieldName) =>
    `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1')} is required`,
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long',
  PASSWORD_NO_UPPERCASE: 'Password must contain at least one uppercase letter',
  PASSWORD_NO_SPECIAL_CHAR: 'Password must contain at least one special character',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  UNDERAGE: 'You must be at least 16 years old to register',
  FORM_VALIDATION_ERROR: 'Please fill all the required details and correct any errors.',
};

// Validation Functions
export const validateEmail = (email) => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

export const validatePassword = (password) => {
  const errors = [];

  if (!password || password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
    errors.push(ERROR_MESSAGES.PASSWORD_TOO_SHORT);
  }

  if (!VALIDATION.PASSWORD_UPPERCASE_REGEX.test(password)) {
    errors.push(ERROR_MESSAGES.PASSWORD_NO_UPPERCASE);
  }

  if (!VALIDATION.PASSWORD_SPECIAL_CHAR_REGEX.test(password)) {
    errors.push(ERROR_MESSAGES.PASSWORD_NO_SPECIAL_CHAR);
  }

  return errors.length > 0 ? errors.join('. ') : null;
};

export const validateAge = (dateOfBirth) => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  const isBeforeBirthday = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate());
  const calculatedAge = isBeforeBirthday ? age - 1 : age;

  return calculatedAge >= VALIDATION.MIN_AGE_REQUIREMENT;
};
