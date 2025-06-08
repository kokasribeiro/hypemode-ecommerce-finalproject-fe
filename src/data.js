import React from 'react';
import { FaCreditCard } from 'react-icons/fa';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';

export const navItems = [
  {
    id: 1,
    title: 'Home',
    link: '/',
    active: true,
  },
  { id: 2, title: 'Products', link: '/products', active: false },
  { id: 3, title: 'Services', link: '/services', active: false },
  { id: 4, title: 'About Us', link: '/about', active: false },
  { id: 5, title: 'Contact', link: '/contact', active: false },
];

export const categories = [
  {
    id: 1,
    image: './public/images/home/categories/hypemode-jacket.png',
    alt: 'jacket category',
    count: '61 articles',
    title: 'Jackets',
    category: 'Jackets',
  },
  {
    id: 2,
    image: './public/images/home/categories/sweater-hypemode.png',
    alt: 'sweater category',
    count: '89 articles',
    title: 'Sweaters',
    category: 'Sweaters',
  },
  {
    id: 3,
    image: '/public/images/Home/Categories/TshirtCategory.png',
    alt: 'T-shirts category',
    count: '45 articles',
    title: 'T-Shirts',
    category: 'T-Shirts',
  },
  {
    id: 4,
    image: './public/images/home/categories/acessories-hypemode.png',
    alt: 'Accessories category',
    count: '20 articles',
    title: 'Accessories',
    category: 'Accessories',
  },
  {
    id: 5,
    image: '/public/images/Home/Categories/ShoesCategory.png',
    alt: 'Shoes category',
    count: '30 articles',
    title: 'Shoes',
    category: 'Shoes',
  },
];

export const benefitsData = [
  {
    title: 'Secure Payment',
    subtitle: '100% secure payment',
    icon: React.createElement(FaCreditCard, { className: 'text-5xl' }),
  },
  {
    title: '30 Days Return',
    subtitle: 'If goods have problems',
    icon: React.createElement(RiMoneyDollarCircleFill, { className: 'text-5xl' }),
  },
  {
    title: '24/7 Support',
    subtitle: 'Dedicated support',
    icon: React.createElement(MdOutlineSupportAgent, { className: 'text-5xl' }),
  },
  {
    title: 'Free Delivery',
    subtitle: 'For all order over 80$',
    icon: React.createElement(TbTruckDelivery, { className: 'text-5xl' }),
  },
];

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

export const routerConfig = [
  {
    path: '/',
    name: 'home',
  },
  {
    path: '/products',
    name: 'products',
  },
  {
    path: '/products/:id',
    name: 'productDetail',
  },
  {
    path: '/cart',
    name: 'cart',
  },
  {
    path: '/contact',
    name: 'contact',
  },
  {
    path: '/services',
    name: 'services',
  },
  {
    path: '/about',
    name: 'about',
  },
  {
    path: '/news',
    name: 'news',
  },
  {
    path: '/login',
    name: 'login',
  },
  {
    path: '/register',
    name: 'register',
  },
];

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
