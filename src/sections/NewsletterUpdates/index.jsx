import React, { useState } from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer';
import { validateEmail } from '../../data';

const NewsletterUpdates = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = () => {
    setSuccess(false);

    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    console.log('Subscribing with email:', email);
    setEmail('');
    setSuccess(true);
  };

  return (
    <LayoutContainer className='my-20'>
      <div
        className='w-full h-96 flex flex-col justify-center items-center text-center p-8'
        style={{
          backgroundImage: "url('/images/Home/Newsletter/NewsletterCard.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h2 className='text-3xl font-bold text-white mb-4'>Newsletter Updates</h2>
        <p className='text-xl text-white mb-8'>Subscribe to receive emails on new product arrivals & special offers</p>
        <div className='flex flex-col w-full max-w-md'>
          <div className='flex w-full'>
            <input
              type='email'
              placeholder='Enter your email'
              className='flex-grow p-3 bg-white text-black placeholder-gray-500 rounded-l'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
                if (success) setSuccess(false);
              }}
            />
            <button
              className='bg-black text-white px-6 py-3 font-medium rounded-r hover:bg-gray-800 transition-colors cursor-pointer'
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>
          {error && <p className='text-red-500 mt-2 text-sm text-left'>{error}</p>}
          {success && <p className='text-green-500 mt-2 text-sm text-left'>Your subscription was successful!</p>}
        </div>
      </div>
    </LayoutContainer>
  );
};

export default NewsletterUpdates;
