export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getRandomSubset = (array, count) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const sortByRating = (products) => {
  return [...products].sort((a, b) => (b.displayRating || 0) - (a.displayRating || 0));
};

export const getSaleProducts = (products) => {
  return products.filter((product) => product.sale || product.discount);
};

export const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

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

export const assignProductRating = (productId) => {
  const seed = productId * 17;
  const rating = (seed % 4) + 2;
  return Math.min(rating, 5);
};

export const addRatingToProducts = (products) => {
  return products.map((product) => ({
    ...product,
    displayRating: assignProductRating(product.id),
  }));
};

export const getRandomPopularProducts = (products) => {
  const topRated = sortByRating(products).slice(0, 10);
  const shuffled = [...topRated].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
};

export const getRecentProducts = (products) => {
  return [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4)
    .map((product) => {
      const consistentRating = assignProductRating(product.id);
      return { ...product, displayRating: consistentRating };
    });
};
