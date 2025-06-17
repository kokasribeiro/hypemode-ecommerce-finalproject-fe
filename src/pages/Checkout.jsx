import React, { useState } from 'react';
import LayoutContainer from '../components/layout/LayoutContainer';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import SEO from '../components/SEO';

export default function Checkout() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.cardNumber || !form.expiry || !form.cvc) {
      setError('Please fill in all fields.');
      return;
    }
    setSuccess(true);
  };

  if (success) {
    return (
      <LayoutContainer className='py-16 text-center'>
        <h1 className='text-3xl font-bold mb-4 text-green-600'>Payment Successful!</h1>
        <p className='text-gray-700 mb-6'>Thank you for your purchase. This was a fake checkout for demo purposes.</p>
        <a
          href='/'
          className='inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md'
        >
          Back to Home
        </a>
      </LayoutContainer>
    );
  }

  return (
    <>
      <SEO
        title='Checkout'
        description='Complete your purchase at HypeMode Store.'
        keywords='checkout, payment, order, complete purchase, online fashion'
        url='/checkout'
      />
      <SecondaryHeader title='Checkout' />
      <LayoutContainer className='py-16 max-w-lg mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-gray-800'>Checkout</h1>
        <form onSubmit={handleSubmit} className='space-y-6 bg-white border border-gray-200 rounded-xl shadow-lg p-8'>
          <div>
            <label className='block mb-1 font-semibold text-gray-700'>Name</label>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-500 transition placeholder-gray-400 bg-gray-50 text-gray-800'
              placeholder='Your full name'
            />
          </div>
          <div>
            <label className='block mb-1 font-semibold text-gray-700'>Email</label>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-500 transition placeholder-gray-400 bg-gray-50 text-gray-800'
              placeholder='you@email.com'
            />
          </div>
          <div>
            <label className='block mb-1 font-semibold text-gray-700'>Address</label>
            <input
              type='text'
              name='address'
              value={form.address}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-500 transition placeholder-gray-400 bg-gray-50 text-gray-800'
              placeholder='Shipping address'
            />
          </div>
          <div>
            <label className='block mb-1 font-semibold text-gray-700'>Card Number</label>
            <input
              type='text'
              name='cardNumber'
              value={form.cardNumber}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-500 transition placeholder-gray-400 bg-gray-50 text-gray-800 tracking-widest'
              maxLength={19}
              placeholder='1234 5678 9012 3456'
            />
          </div>
          <div className='flex space-x-4'>
            <div className='flex-1'>
              <label className='block mb-1 font-semibold text-gray-700'>Expiry</label>
              <input
                type='text'
                name='expiry'
                value={form.expiry}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-500 transition placeholder-gray-400 bg-gray-50 text-gray-800'
                placeholder='MM/YY'
                maxLength={5}
              />
            </div>
            <div className='flex-1'>
              <label className='block mb-1 font-semibold text-gray-700'>CVC</label>
              <input
                type='text'
                name='cvc'
                value={form.cvc}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-500 transition placeholder-gray-400 bg-gray-50 text-gray-800'
                maxLength={4}
                placeholder='CVC'
              />
            </div>
          </div>
          {error && <div className='text-red-500 text-sm font-medium'>{error}</div>}
          <button
            type='submit'
            className='w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors duration-200 text-lg tracking-wide mt-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2'
          >
            Pay Now
          </button>
        </form>
      </LayoutContainer>
    </>
  );
}
