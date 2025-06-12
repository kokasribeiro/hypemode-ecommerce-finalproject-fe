import React from 'react';

const ProductSkeleton = ({ count = 1, className = '' }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div key={index} className={`animate-pulse ${className}`}>
      <div className='bg-gray-300 h-64 w-full rounded-lg mb-4'></div>
      <div className='space-y-2'>
        <div className='h-4 bg-gray-300 rounded w-3/4'></div>
        <div className='h-4 bg-gray-300 rounded w-1/2'></div>
        <div className='h-6 bg-gray-300 rounded w-1/3'></div>
      </div>
    </div>
  ));

  return count === 1 ? skeletons[0] : <>{skeletons}</>;
};

export default ProductSkeleton;
