import React from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutContainer from '../LayoutContainer';

const Footer = () => {
  const navigate = useNavigate();

  const handleMyAccountClick = () => {
    navigate('/login');
  };

  const handleMyCartClick = () => {
    navigate('/cart');
  };

  const handleNewProductsClick = () => {
    navigate('/products?sort=recent&clearFilters=true');
  };

  const handleBestSellersClick = () => {
    navigate('/products?sort=best-sellers&clearFilters=true');
  };

  const handleSpecialsClick = () => {
    navigate('/products?sale=true&clearFilters=true');
  };

  return (
    <footer className='bg-white dark:bg-gray-900 py-12 md:py-16 border-t border-gray-200 dark:border-gray-700 mt-12'>
      <LayoutContainer>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
          <div>
            <h5 className='font-bold mb-4 text-gray-900 dark:text-white'>About Us</h5>
            <p className='text-gray-600 dark:text-gray-300 text-sm mb-3'>
              Hypemode is a Geneva-born streetwear brand blending urban. We create limited-run pieces inspired by city
              life, youth culture, and underground vibes. Every piece is made to stand out.
            </p>
            <p className='text-gray-600 dark:text-gray-300 text-sm'>
              Our mission? To bring raw street energy to everyday wear. More than fashion — its a mindset. Welcome to
              Hypemode.
            </p>
          </div>

          <div>
            <h5 className='font-bold mb-4 text-gray-900 dark:text-white'>Account</h5>
            <ul className='space-y-2'>
              <li>
                <button
                  onClick={handleMyAccountClick}
                  className='text-gray-600 dark:text-gray-300 hover:text-red-700 text-sm cursor-pointer bg-transparent border-none p-0 text-left'
                >
                  My Account
                </button>
              </li>
              <li>
                <button
                  onClick={handleMyCartClick}
                  className='text-gray-600 dark:text-gray-300 hover:text-red-700 text-sm cursor-pointer bg-transparent border-none p-0 text-left'
                >
                  My Cart
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className='font-bold mb-4 text-gray-900 dark:text-white'>Shipping</h5>
            <ul className='space-y-2'>
              <li>
                <button
                  onClick={handleNewProductsClick}
                  className='text-gray-600 dark:text-gray-300 hover:text-red-700 text-sm cursor-pointer bg-transparent border-none p-0 text-left'
                >
                  New Products
                </button>
              </li>
              <li>
                <button
                  onClick={handleBestSellersClick}
                  className='text-gray-600 dark:text-gray-300 hover:text-red-700 text-sm cursor-pointer bg-transparent border-none p-0 text-left'
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={handleSpecialsClick}
                  className='text-gray-600 dark:text-gray-300 hover:text-red-700 text-sm cursor-pointer bg-transparent border-none p-0 text-left'
                >
                  On Sale
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className='font-bold mb-4 text-gray-900 dark:text-white'>Contact Us</h5>
            <address className='not-italic text-gray-600 dark:text-gray-300 text-sm'>
              <p>Phone: (+41) 77 973 97 80</p>
              <p>Fax: (+63) 555 0100</p>
              <br />
              <p>Geneve</p>
              <p>Rue de Lyon 118, 1203 Genève, Suíça</p>
            </address>
          </div>
        </div>

        <div className='text-center pt-9 border-t border-gray-200'>
          <img
            src='/images/OfficialLogoPage/logo-ecommerce.png'
            alt='HypeMode Store - Streetwear fashion brand logo'
            className='h-15 mx-auto'
          />
          <span className='text-xl font-semibold'>HypeMode</span>
        </div>
      </LayoutContainer>
    </footer>
  );
};

export default Footer;
