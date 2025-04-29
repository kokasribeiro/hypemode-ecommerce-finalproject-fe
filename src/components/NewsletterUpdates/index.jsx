import React from 'react';
import LayoutContainer from '../ui/LayoutContainer';

const NewsletterUpdates = () => {
  return (
    <LayoutContainer className='my-20'>
      <div className='relastive w-full h-screen max-h-96 flex items-center justify-center overflow-hidden'>
        ,<img src='./images/NewsletterCard.png' alt='' className='w-full h-full object-cover opacity-70' />
      </div>
      <div className='  flex justify-center items-center '>
        <h2 className='text-3xl font-bold text-red-600 mb-4'>Newsletter Updates</h2>
        <p className='text-xl text-red-600 mb-8'>
          Subscribe to receive emails on new product arrivals & special offers
        </p>
        <input
          type='email'
          placeholder='Enter your email'
          className='w-full max-w-md p-3 bg-gray-200 text-black placeholder-gray-500'
        />
      </div>
    </LayoutContainer>
  );
};

export default NewsletterUpdates;
