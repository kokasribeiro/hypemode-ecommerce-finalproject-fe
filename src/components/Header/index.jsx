import React from 'react';
import ButtonPrimary from '../ui/ButtonPrimary';

const Header = () => {
  return (
    <header>
      <section class='max-w-7xl mx-auto py-32 px-4'>
        <div class=' mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12'></div>
        <div>
          <h1 class='text-5xl font-bold leading-tight tracking-wide text-gray-900'>
            Brand New
            <br />
            Collection
          </h1>
          <p class='mt-6 text-gray-600 text-lg'>
            Mauris vitae ultricies leo integer malesuada tempor orci dapibus ultricies <br /> diam in arcu cursus
            euismod purus viverra accumsan.
          </p>
          <div class='mt-9 flex flex-wrap gap-9 text-gray-700 items-center space-x-2 '>
            <div class='flex'>
              <svg class='w-5 h-5 text-black' fill='none' stroke='currentColor' stroke-width='3' viewBox='0 0 24 24'>
                <path stroke-linecap='round' stroke-linejoin='round' d='M5 13l4 4L19 7' />
              </svg>
              <span>Top Brands</span>
            </div>
            <div class='flex '>
              <svg class='w-5 h-5 text-black' fill='none' stroke='currentColor' stroke-width='3' viewBox='0 0 24 24'>
                <path stroke-linecap='round' stroke-linejoin='round' d='M5 13l4 4L19 7' />
              </svg>
              <span>High Quality</span>
            </div>
            <div class='flex '>
              <svg class='w-5 h-5 text-black' fill='none' stroke='currentColor' stroke-width='3' viewBox='0 0 24 24'>
                <path stroke-linecap='round' stroke-linejoin='round' d='M5 13l4 4L19 7' />
              </svg>
              <span>Free Delivery</span>
            </div>
          </div>
          <ButtonPrimary buttonText='Explore Shop' />
        </div>
      </section>
    </header>
  );
};

export default Header;
