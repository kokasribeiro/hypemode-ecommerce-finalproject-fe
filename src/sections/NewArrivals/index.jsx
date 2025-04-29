import React from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer';
import ProductCard from '../../components/ui/ProductCard';

const NewArrivals = () => {
  return (
    <LayoutContainer className='my-20'>
      <p className='text-gray-400'>Check out latest products </p>
      <h1 className='text-4xl font-bold'>New Arrivals</h1>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 my-16'>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </LayoutContainer>
  );
};

export default NewArrivals;
