import React from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer';
import ProductCard from '../../components/ui/ProductCard';

const PopularProducts = () => {
  return (
    <LayoutContainer className='my-20'>
      <div className='text-center'>
        <p className='text-gray-400'>Check out popular products</p>
        <h1 className='text-4xl font-bold'>Popular Products</h1>
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-8 gap-12 my-16'>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </LayoutContainer>
  );
};

export default PopularProducts;
