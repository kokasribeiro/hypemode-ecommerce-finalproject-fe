import React from 'react';
import ButtonPrimary from '../../ui/ButtonPrimary';
import LayoutContainer from '../LayoutContainer';
import { useNavigate } from 'react-router-dom';

const HeaderMain = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/products');
  };

  return (
    <section className='relative py-32 bg-gray-300 w-full overflow-hidden'>
      <LayoutContainer>
        <div className='max-w-7xl mx-auto px-4 flex flex-wrap md:flex-nowrap items-center justify-between'>
          <div className='w-full md:w-1/2 z-10'>
            <h1 className='text-7xl font-bold leading-tight tracking-wide text-black'>
              Brand New
              <br />
              Collection
            </h1>
            <p className='mt-6 text-black text-lg'>
              Step into the season with fresh fits and bold essentials. Crafted <br /> for style built for comfort, and{' '}
              <br />
              designed to turn heads—your streetwear upgrade starts here.
            </p>
            <div className='mt-9 flex flex-wrap gap-9 text-black font-extrabold items-center'>
              <div className='flex items-center'>
                <svg
                  className='w-5 h-5 text-black mr-2'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='3'
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                </svg>
                <span>Top Brands</span>
              </div>
              <div className='flex items-center'>
                <svg
                  className='w-5 h-5 text-black mr-2'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='3'
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                </svg>
                <span>High Quality</span>
              </div>
              <div className='flex items-center'>
                <svg
                  className='w-5 h-5 text-black mr-2'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='3'
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                </svg>
                <span>Free Delivery</span>
              </div>
            </div>
            <div className='mt-8'>
              <ButtonPrimary buttonText='EXPLORE SHOP' onClick={handleExploreClick} />
            </div>
          </div>
          <div className='absolute right-110 top-0 h-full md:w-1/2 flex justify-end'>
            <img
              src='/public/images/home/header/ManSweatRemove.png'
              alt='Brand Collection'
              className='h-full opacity-90 object-cover max-w-full'
            />
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
};

export default HeaderMain;
