import React, { useState } from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer';
import { validateEmail } from '../../data';
import newsletterCardImage from '../../assets/images/newsletterCard.png';

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
        className='w-full min-h-[384px] flex flex-col justify-center items-center text-center p-8 relative bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${newsletterCardImage})`,
        }}
      >
        <h2 className='text-3xl font-bold text-white mb-4'>Newsletter Updates</h2>
        <p className='text-xl text-white mb-8'>Subscribe to receive emails on new product arrivals & special offers</p>
        <div className='flex flex-col w-full max-w-md px-4'>
          <div className='flex flex-col sm:flex-row w-full'>
            <input
              type='email'
              placeholder='Enter your email'
              className='flex-grow p-3 bg-white text-black placeholder-gray-500 rounded-t sm:rounded-l sm:rounded-tr-none'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
                if (success) setSuccess(false);
              }}
            />
            <button
              className='bg-black text-white px-6 py-3 font-medium rounded-b sm:rounded-r sm:rounded-bl-none hover:bg-gray-800 transition-colors cursor-pointer'
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
