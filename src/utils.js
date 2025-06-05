
/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} - A new shuffled array
 */
export const shuffleArray = (array) => {
  return [...array].sort(() => 0.5 - Math.random());
};

/**
 * Gets a random subset of items from an array
 * @param {Array} array - The source array
 * @param {number} count - Number of items to return
 * @returns {Array} - Random subset of the array
 */
export const getRandomSubset = (array, count) => {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
};

/**
 * Sorts products by rating in descending order
 * @param {Array} products - Array of product objects
 * @returns {Array} - Sorted array by rating
 */
export const sortByRating = (products) => {
  return [...products].sort((a, b) => (b.displayRating || 0) - (a.displayRating || 0));
};

/**
 * Filters products that are on sale
 * @param {Array} products - Array of product objects
 * @returns {Array} - Filtered array of sale products
 */
export const getSaleProducts = (products) => {
  return products.filter((product) => product.sale === true);
};

/**
 * Capitalizes the first letter of each word in a string
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
export const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} - The debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
