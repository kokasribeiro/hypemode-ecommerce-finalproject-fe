import React from 'react';
import ButtonPrimary from '../ButtonPrimary';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ className, product, titleWhite }) => {
  const navigate = useNavigate();

  const renderStars = () => {
    const rating = product.displayRating || 5;

    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className={`h-4 w-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
        />,
      );
    }
    return stars;
  };

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className=''>
        <img
          src={product.image}
          alt={product.name}
          className='w-full h-92 object-cover cursor-pointer transition-transform duration-500 ease-in-out hover:scale-110'
          onClick={handleProductClick}
        />
        <div className='mt-8'>
          <h2
            className={`text-lg font-semibold ${
              titleWhite ? 'text-white' : 'text-gray-800'
            } cursor-pointer hover:underline`}
            onClick={handleProductClick}
          >
            {product.name}
          </h2>
          <div className={`flex items-center mt-2 ${titleWhite ? 'text-white' : ''}`}>{renderStars()}</div>
          <p className='text-gray-400 text-sm font-bold mt-3'>{product.price} €</p>
          <p className='text-gray-500 text-sm mt-2'>{product.category}</p>
        </div>
        <ButtonPrimary buttonText='Add to cart' />
      </div>
    </div>
  );
};

export default ProductCard;
