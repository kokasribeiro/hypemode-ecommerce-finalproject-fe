import React from 'react';
import ButtonPrimary from '../ButtonPrimary';

const ProductCard = ({ className }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className=''>
        <img
          src='./images/tshirt.png '
          alt='t-shirt white'
          className='w-full h-92 object-cover cursor-pointer transition-transform duration-500 ease-in-out hover:scale-110'
        />
        <div className='mt-8'>
          <h2 className='text-lg font-semibold text-gray-800'>Hype T-Shirt</h2>
          <p className='text-gray-400 text-sm font-bold mt-3'>50.00€</p>
          <p className='text-gray-500 text-sm mt-2'>T-shirt</p>
        </div>
        <ButtonPrimary buttonText='Add to cart' />
      </div>
    </div>
  );
};

export default ProductCard;
