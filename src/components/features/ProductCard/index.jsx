import React, { useState, useRef } from 'react';
import ButtonPrimary from '../ButtonPrimary';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import { createFlyToCartAnimation } from '../../../utils';
import { clothingCategories, shoesCategories, necklaceCategories, backpackCategories, sizesData } from '../../../data';

const getProductType = (product) => {
  const isClothing = product.category && clothingCategories.includes(product.category.toLowerCase().trim());
  const isShoes = product.category && shoesCategories.includes(product.category.toLowerCase().trim());
  const isNecklace =
    (product.category && necklaceCategories.includes(product.category.toLowerCase().trim())) ||
    (product.name && necklaceCategories.some((word) => product.name.toLowerCase().includes(word)));
  const isBackpack = product.name && backpackCategories.some((word) => product.name.toLowerCase().includes(word));

  return { isClothing, isShoes, isNecklace, isBackpack };
};

const needsSizeSelection = (productTypes) => {
  const { isClothing, isShoes, isNecklace, isBackpack } = productTypes;
  return isClothing || isShoes || isNecklace || isBackpack;
};

const getSizesForProduct = (productTypes) => {
  const { isShoes, isNecklace, isBackpack } = productTypes;

  if (isShoes) return sizesData.shoes;
  if (isNecklace) return sizesData.necklace;
  if (isBackpack) return sizesData.backpack;
  return sizesData.clothing;
};

const calculateSalePrice = (originalPrice, productId) => {
  const productIdNumber = parseInt(productId, 10);
  const discountBase = productIdNumber ? (productIdNumber % 11) / 100 + 0.1 : 0.15;
  const discountedPrice = originalPrice * (1 - discountBase);
  return Number(discountedPrice.toFixed(2));
};

const StarRating = ({ rating = 5, titleWhite }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={`star-${i}`}
        className={`h-4 w-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
      />,
    );
  }
  return <div className={`flex items-center mt-2 ${titleWhite ? 'text-white' : ''}`}>{stars}</div>;
};

const SizeSelector = ({ sizes, selectedSize, onSizeToggle }) => (
  <div className='my-3 h-20'>
    <p className='text-xs font-medium mb-2'>Select Size:</p>
    <div className='flex flex-wrap gap-1'>
      {sizes.map((size) => (
        <button
          key={size}
          onClick={(e) => onSizeToggle(size, e)}
          className={`text-xs px-2 py-1 border rounded ${
            selectedSize === size ? 'border-red-500 bg-red-500 text-white' : 'border-gray-300 hover:border-red-500'
          } transition-colors duration-200`}
        >
          {size}
        </button>
      ))}
    </div>
    {selectedSize && <p className='text-xs text-red-600 mt-1'>Selected: {selectedSize}</p>}
  </div>
);

const PriceDisplay = ({ product, titleWhite }) => {
  if (product.sale) {
    const salePrice = calculateSalePrice(product.price, product.id);
    return (
      <div className='flex items-center space-x-2'>
        <span className='text-red-600 text-sm font-bold'>{salePrice} €</span>
        <span className={`text-sm font-medium line-through ${titleWhite ? 'text-white' : 'text-gray-400'}`}>
          {product.price} €
        </span>
      </div>
    );
  }

  return <p className={`text-sm font-bold ${titleWhite ? 'text-white' : 'text-gray-400'}`}>{product.price} €</p>;
};

const ProductCard = ({ className, product, titleWhite }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const productImageRef = useRef(null);

  const productTypes = getProductType(product);
  const needsSize = needsSizeSelection(productTypes);
  const sizes = getSizesForProduct(productTypes);

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleSizeToggle = (size, e) => {
    e.stopPropagation();
    setSelectedSize((prev) => {
      return prev === size ? null : size;
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (needsSize && !selectedSize) {
      alert('Please select a size first');
      return;
    }

    addToCart(product, selectedSize);
    if (productImageRef.current) {
      createFlyToCartAnimation(productImageRef.current, product.image);
    }
  };

  return (
    <div className={`w-full h-full ${className}`}>
      <div className='flex flex-col h-full'>
        <div className='relative'>
          <img
            ref={productImageRef}
            src={product.image}
            alt={product.name}
            className='w-full h-72 object-cover cursor-pointer transition-transform duration-500 ease-in-out hover:scale-110'
            onClick={handleProductClick}
          />
          {product.sale && (
            <div className='absolute top-0 right-0 bg-red-600 border border-black p-1 m-2'>
              <p className='text-white text-sm font-bold'>ON SALE</p>
            </div>
          )}
        </div>

        <div className='flex flex-col flex-grow mt-4 pb-4'>
          <h2
            className={`text-lg font-semibold ${
              titleWhite ? 'text-white' : 'text-gray-800'
            } cursor-pointer hover:underline h-14 line-clamp-2 leading-relaxed`}
            onClick={handleProductClick}
            title={product.name}
          >
            {product.name}
          </h2>

          {needsSize && <SizeSelector sizes={sizes} selectedSize={selectedSize} onSizeToggle={handleSizeToggle} />}

          <StarRating rating={product.displayRating} titleWhite={titleWhite} />

          <div className='mb-2'>
            <PriceDisplay product={product} titleWhite={titleWhite} />
          </div>

          <p className={`text-sm mb-4 ${titleWhite ? 'text-white' : 'text-gray-500'}`}>{product.category}</p>

          <div className='mt-auto'>
            <ButtonPrimary buttonText='Add to cart' onClick={handleAddToCart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
