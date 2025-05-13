import React from 'react';
import ButtonPrimary from '../../ui/ButtonPrimary';
import LayoutContainer from '../LayoutContainer';

const HeaderMain = () => {
  return (
    <section
      className='py-32 bg-gray-200 bg-right bg-no-repeat bg-cover w-full'
      style={{ backgroundImage: "url('images/WomenBgHeaderHome.png')" }}
    >
      <LayoutContainer>
        <div className='max-w-7xl mx-auto px-4'>
          <h1 className='text-7xl font-bold leading-tight tracking-wide text-black'>
            Brand New
            <br />
            Collection
          </h1>
          <p className='mt-6 text-black text-lg'>
            Mauris vitae ultricies leo integer malesuada tempor orci dapibus ultricies <br /> diam in arcu cursus
            euismod purus viverra accumsan.
          </p>
          <div className='mt-9 flex flex-wrap gap-9 text-black font-extrabold items-center space-x-2 '>
            <div className='flex'>
              <svg className='w-5 h-5 text-black' fill='none' stroke='currentColor' strokeWidth='3' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
              </svg>
              <span>Top Brands</span>
            </div>
            <div className='flex '>
              <svg className='w-5 h-5 text-black' fill='none' stroke='currentColor' strokeWidth='3' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
              </svg>
              <span>High Quality</span>
            </div>
            <div className='flex '>
              <svg className='w-5 h-5 text-black' fill='none' stroke='currentColor' strokeWidth='3' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
              </svg>
              <span>Free Delivery</span>
            </div>
          </div>
          <ButtonPrimary buttonText='Explore Shop' />
        </div>
      </LayoutContainer>
    </section>
  );
};

export default HeaderMain;
