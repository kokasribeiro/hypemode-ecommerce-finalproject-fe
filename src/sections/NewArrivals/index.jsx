import React from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer';
import ProductCard from '../../components/ui/ProductCard';

const NewArrivals = ({ showViewAll = false, products = [] }) => {
  const recentProducts = [...products].sort((a, b) => b.id - a.id).slice(0, 4);

  return (
    <LayoutContainer className='my-20'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-gray-400'>Check out latest products </p>
          <h1 className='text-4xl font-bold'>New Arrivals</h1>
        </div>
        {showViewAll && (
          <div className='flex justify-between items-center mb-6'>
            <button className='border border-gray-400 text-gray-700 py-2 px-5 text-sm font-medium hover:bg-red-500 transition duration-200'>
              VIEW ALL
            </button>
          </div>
        )}
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 my-16'>
        {recentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </LayoutContainer>
  );
};

export default NewArrivals;
