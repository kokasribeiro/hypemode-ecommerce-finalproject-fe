import React from 'react';
import LayoutContainer from '../ui/LayoutContainer';
import ProductCard from '../ui/ProductCard';

const FinalSale = () => {
  return (
    <div className='bg-black'>
      <LayoutContainer>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 my-16'>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <div className=''>
            <h1 className='text-white text-4xl font-bold'>Final Sale</h1>
            <p className='text-white'>
              Mauris vitae ultricies leo integer malesuada cursus. Odio tempor orci dapibus ultrices in. Egestas diam in
              arcu cursus euismod dictum purus viverra accumsan.{' '}
            </p>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default FinalSale;
