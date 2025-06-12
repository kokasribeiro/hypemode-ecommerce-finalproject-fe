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
  return products.filter((product) => product.sale);
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

export const createFlyToCartAnimation = (sourceElement, productImage, onComplete) => {
  if (!sourceElement) return;

  const cartIcon =
    document.querySelector('[aria-label="Shopping cart"]') ||
    document.querySelector('button[aria-label="Shopping cart"]') ||
    document.querySelector('[data-cart-icon]');

  if (!cartIcon) return;

  const sourceRect = sourceElement.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  const flyingElement = document.createElement('div');
  flyingElement.innerHTML = `<img src="${productImage}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;" />`;
  flyingElement.style.cssText = `
    position: fixed;
    top: ${sourceRect.top + sourceRect.height / 2 - 25}px;
    left: ${sourceRect.left + sourceRect.width / 2 - 25}px;
    width: 50px;
    height: 50px;
    z-index: 9999;
    pointer-events: none;
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  `;

  document.body.appendChild(flyingElement);

  setTimeout(() => {
    flyingElement.style.top = `${cartRect.top + cartRect.height / 2 - 25}px`;
    flyingElement.style.left = `${cartRect.left + cartRect.width / 2 - 25}px`;
    flyingElement.style.transform = 'scale(0.3)';
    flyingElement.style.opacity = '0.8';
  }, 50);

  setTimeout(() => {
    document.body.removeChild(flyingElement);
    if (onComplete) onComplete();
  }, 900);

  if (cartIcon) {
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
      cartIcon.style.transform = 'scale(1)';
    }, 200);
  }

  const notification = document.createElement('div');
  notification.textContent = 'Added to cart!';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #22c55e;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    z-index: 10000;
    box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
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
