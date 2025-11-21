// Application Constants
export const APP_CONFIG = {
  API_BASE_URL: 'http://localhost:3000/api',
  APP_NAME: 'HypeMode E-Commerce',
  VERSION: '1.0.0',
};

// Navigation Configuration
export const NAV_ITEMS = [
  { id: 1, title: 'Home', link: '/', active: true },
  { id: 2, title: 'Products', link: '/products', active: false },
  { id: 3, title: 'Services', link: '/services', active: false },
  { id: 4, title: 'About Us', link: '/about', active: false },
  { id: 5, title: 'Contact', link: '/contact', active: false },
];

// Product Categories
export const PRODUCT_CATEGORIES = [
  {
    id: 1,
    image: '/images/Home/Categories/hypemode-jacket.png',
    alt: 'Stylish urban jacket collection featuring modern streetwear designs and premium materials',
    count: '61 articles',
    title: 'Jackets',
    category: 'Jackets',
  },
  {
    id: 2,
    image: '/images/Home/Categories/sweater-hypemode.png',
    alt: 'Cozy sweater collection showcasing comfortable knitwear in various colors and styles',
    count: '89 articles',
    title: 'Sweaters',
    category: 'Sweaters',
  },
  {
    id: 3,
    image: '/images/Home/Categories/TshirtCategory.png',
    alt: 'Trendy t-shirt collection featuring graphic designs and essential streetwear basics',
    count: '45 articles',
    title: 'T-Shirts',
    category: 'T-Shirts',
  },
  {
    id: 4,
    image: '/images/Home/Categories/acessories-hypemode.png',
    alt: 'Fashion accessories collection including bags, jewelry, and lifestyle items',
    count: '20 articles',
    title: 'Accessories',
    category: 'Accessories',
  },
  {
    id: 5,
    image: '/images/Home/Categories/ShoesCategory.png',
    alt: 'Premium footwear collection featuring sneakers, boots, and stylish shoe designs',
    count: '30 articles',
    title: 'Shoes',
    category: 'Shoes',
  },
];

// Benefits Data
export const BENEFITS_DATA = [
  {
    title: 'Secure Payment',
    subtitle: '100% secure payment',
    icon: 'credit-card',
  },
  {
    title: '30 Days Return',
    subtitle: 'If goods have problems',
    icon: 'money',
  },
  {
    title: '24/7 Support',
    subtitle: 'Dedicated support',
    icon: 'support',
  },
  {
    title: 'Free Delivery',
    subtitle: 'For all order over 80€',
    icon: 'truck',
  },
];

// Product Sizes
export const PRODUCT_SIZES = {
  shoes: ['38', '39', '40', '42'],
  necklace: ['16"', '18"', '20"', '24"'],
  backpack: ['15L', '25L', '35L', '45L'],
  clothing: ['S', 'M', 'L', 'XL'],
};

// Category Keywords
export const CATEGORY_KEYWORDS = {
  clothing: ['jacket', 'sweater', 't-shirt', 'jackets', 'sweaters', 't-shirts'],
  shoes: ['shoes', 'shoe', 'sneakers', 'sneaker'],
  necklace: ['necklace', 'necklaces'],
  backpack: ['backpack', 'backpacks'],
};
