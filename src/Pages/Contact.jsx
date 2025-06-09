import LayoutContainer from '../components/layout/LayoutContainer';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import NewArrivals from '../sections/NewArrivals';
import NewsletterUpdates from '../sections/NewsletterUpdates';
import { useState, useEffect } from 'react';
import { validateEmail } from '../data';
import { fetchProducts } from '../utils/api/mockapi';

export default function Contact() {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError('Your email is not valid');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Your email is not valid');
      return;
    }

    console.log('Form submitted');
    setMessageSent(true);
  };

  return (
    <>
      <SecondaryHeader title='Contact' />
      <LayoutContainer>
        <div className='container mx-auto px-4 py-8 md:py-12'>
          <div className='flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-16'>
            <div className='w-full md:w-1/2 flex justify-center md:justify-end order-2 md:order-1'>
              <div className='relative max-w-md w-full'>
                <div className='absolute inset-0 transform -translate-x-2 -translate-y-2 md:-translate-x-4 md:-translate-y-4 z-0'></div>
                <img
                  src='public/images/contact/contact-image.png'
                  alt='Woman with headphones'
                  className='relative z-10 w-full h-auto object-cover'
                />
              </div>
            </div>
            <div className='w-full md:w-1/2 max-w-md order-1 md:order-2'>
              <h2 className='text-2xl md:text-3xl font-bold mb-4 md:mb-6'>Contact with us</h2>

              {messageSent ? (
                <div className='bg-green-50 border border-green-200 rounded-lg p-6 text-center'>
                  <div className='flex justify-center mb-4'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-16 w-16 text-green-500'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                    </svg>
                  </div>
                  <h3 className='text-xl font-semibold text-green-800 mb-2'>Message Sent Successfully!</h3>
                  <p className='text-green-700 mb-4'>Thank you for reaching out. We will get back to you soon.</p>
                  <button
                    onClick={() => setMessageSent(false)}
                    className='bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300'
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className='mb-3 md:mb-4'>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                      Name *
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      required
                      className='w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500'
                    />
                  </div>
                  <div className='mb-3 md:mb-4'>
                    <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-1'>
                      Phone *
                    </label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      required
                      className='w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500'
                    />
                  </div>
                  <div className='mb-3 md:mb-4'>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                      Email Address *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={email}
                      onChange={handleEmailChange}
                      required
                      className={`w-full p-2 md:p-3 border ${
                        emailError ? 'border-red-500' : 'border-gray-300'
                      } rounded focus:ring-red-500 focus:border-red-500`}
                    />
                    {emailError && <p className='text-red-500 text-xs md:text-sm mt-1'>{emailError}</p>}
                  </div>
                  <div className='mb-4 md:mb-6'>
                    <label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-1'>
                      Your Message *
                    </label>
                    <textarea
                      id='message'
                      name='message'
                      rows='4'
                      required
                      className='w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500'
                    ></textarea>
                  </div>
                  <button
                    type='submit'
                    className='bg-red-600 text-white py-2 md:py-3 px-4 md:px-6 rounded hover:bg-red-700 transition duration-300 w-full md:w-auto'
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className='container mx-auto px-4 py-8'>
          <NewArrivals showViewAll={true} products={products} />
        </div>
        <div className='container mx-auto px-4 py-8 md:py-12'>
          <NewsletterUpdates />
        </div>
      </LayoutContainer>
    </>
  );
}
