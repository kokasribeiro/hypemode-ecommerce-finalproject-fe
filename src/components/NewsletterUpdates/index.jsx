import React from 'react';
import LayoutContainer from '../ui/LayoutContainer';

const NewsletterUpdates = () => {
  return (
    <LayoutContainer className='my-20'>
      <div
        className='w-full h-96 flex flex-col justify-center items-center text-center p-8'
        style={{
          backgroundImage: "url('./images/NewsletterCard.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h2 className='text-3xl font-bold text-white mb-4'>Newsletter Updates</h2>
        <p className='text-xl text-white mb-8'>
          Subscribe to receive emails on new product arrivals & special offers
        </p>
        <input
          type='email'
          placeholder='Enter your email'
          className='w-full max-w-md p-3 bg-white text-black placeholder-gray-500 rounded'
        />
      </div>
    </LayoutContainer>
  );
};

export default NewsletterUpdates;
