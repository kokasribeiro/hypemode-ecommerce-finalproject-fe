import React from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer';
import ProductCard from '../../components/ui/ProductCard';

const PopularProducts = ({ products }) => {
  const topRatedProducts = [...products]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 4)
    .map((product) => {
      // Set all popular products to have 5 stars
      return { ...product, displayRating: 5 };
    });

  return (
    <LayoutContainer className='my-20'>
      <div className='text-center'>
        <p className='text-gray-400'>Check out popular products</p>
        <h1 className='text-4xl font-bold'>Popular Products</h1>
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-8 gap-12 my-16'>
        {topRatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </LayoutContainer>
  );
};

export default PopularProducts;
