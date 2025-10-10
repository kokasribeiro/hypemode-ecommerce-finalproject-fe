// Legacy data file - DEPRECATED
// This file is kept for backward compatibility
// New code should import from the organized constants and utils

// Re-export from organized modules for backward compatibility
export { NAV_ITEMS as navItems } from './constants';
export { PRODUCT_CATEGORIES as categories } from './constants';
export { BENEFITS_DATA as benefitsData } from './constants';
export {
  VALIDATION,
  FORM_FIELDS,
  ERROR_MESSAGES,
  validateEmail,
  validatePassword,
  validateAge,
} from './constants/validation';
export { PRODUCT_SIZES as sizesData } from './constants';
export { CATEGORY_KEYWORDS } from './constants';

// Router configuration
export const routerConfig = [
  { path: '/', name: 'home' },
  { path: '/products', name: 'products' },
  { path: '/products/:id', name: 'productDetail' },
  { path: '/cart', name: 'cart' },
  { path: '/contact', name: 'contact' },
  { path: '/services', name: 'services' },
  { path: '/about', name: 'about' },
  { path: '/news', name: 'news' },
  { path: '/login', name: 'login' },
  { path: '/register', name: 'register' },
];

// Legacy category keywords (deprecated - use CATEGORY_KEYWORDS from constants)
export const clothingCategories = ['jacket', 'sweater', 't-shirt', 'jackets', 'sweaters', 't-shirts'];
export const shoesCategories = ['shoes', 'shoe', 'sneakers', 'sneaker'];
export const necklaceCategories = ['necklace', 'necklaces'];
export const backpackCategories = ['backpack', 'backpacks'];
