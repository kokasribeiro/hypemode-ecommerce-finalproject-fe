import React from 'react';
import ButtonPrimary from '../../ui/ButtonPrimary';
import LayoutContainer from '../LayoutContainer';

const HeaderMain = () => {
  return (
    <LayoutContainer>
      <header>
        <section className='py-32'>
          <div className='mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12'></div>
          <div>
            <h1 className='text-7xl font-bold leading-tight tracking-wide text-gray-900'>
              Brand New
              <br />
              Collection
            </h1>
            <p className='mt-6 text-gray-600 text-lg'>
              Mauris vitae ultricies leo integer malesuada tempor orci dapibus ultricies <br /> diam in arcu cursus
              euismod purus viverra accumsan.
            </p>
            <div className='mt-9 flex flex-wrap gap-9 text-gray-700 items-center space-x-2 '>
              <div className='flex'>
                <svg
                  className='w-5 h-5 text-black'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='3'
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                </svg>
                <span>Top Brands</span>
              </div>
              <div className='flex '>
                <svg
                  className='w-5 h-5 text-black'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='3'
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                </svg>
                <span>High Quality</span>
              </div>
              <div className='flex '>
                <svg
                  className='w-5 h-5 text-black'
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
            <ButtonPrimary buttonText='Explore Shop' />
          </div>
        </section>
      </header>
    </LayoutContainer>
  );
};

export default HeaderMain;
