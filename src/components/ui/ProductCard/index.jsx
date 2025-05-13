import React from 'react';
import ButtonPrimary from '../ButtonPrimary';

const ProductCard = ({ className, product, titleWhite }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className=''>
        <img
          src={product.image}
          alt={product.name}
          className='w-full h-92 object-cover cursor-pointer transition-transform duration-500 ease-in-out hover:scale-110'
        />
        <div className='mt-8'>
          <h2 className={`text-lg font-semibold ${titleWhite ? 'text-white' : 'text-gray-800'}`}>{product.name}</h2>
          <p className='text-gray-400 text-sm font-bold mt-3'>{product.price} €</p>
          <p className='text-gray-500 text-sm mt-2'>{product.category}</p>
        </div>
        <ButtonPrimary buttonText='Add to cart' />
      </div>
    </div>
  );
};

export default ProductCard;
