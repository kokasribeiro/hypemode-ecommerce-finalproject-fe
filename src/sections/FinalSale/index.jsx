import React from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer';
import ProductCard from '../../components/ui/ProductCard';

const FinalSale = () => {
  const textContent = (
    <>
      <h1 className='text-white text-4xl font-bold'>Final Sale</h1>
      <p className='text-white'>
        Mauris vitae ultricies leo integer malesuada cursus. Odio tempor orci dapibus ultrices in. Egestas diam in
        arcu cursus euismod dictum purus viverra accumsan.{' '}
      </p>
    </>
  );

  return (
    <div className='bg-black'>
      <LayoutContainer>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-16'>
          <ProductCard />
          <div className='hidden md:block lg:hidden'>
            {textContent}
          </div>
          <ProductCard />
          <ProductCard />
         <div className='block md:hidden lg:block'>
            {textContent}
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default FinalSale;
