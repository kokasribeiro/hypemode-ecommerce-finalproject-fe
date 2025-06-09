import React from 'react';

export default function ProductCardSkeleton() {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 h-full animate-pulse'>
      <div className='bg-gray-300 h-48 w-full rounded-md mb-4'></div>
      <div className='bg-gray-300 h-4 w-3/4 rounded mb-2'></div>
      <div className='bg-gray-300 h-4 w-1/2 rounded mb-2'></div>
      <div className='flex justify-between items-center mt-4'>
        <div className='bg-gray-300 h-5 w-1/4 rounded'></div>
        <div className='bg-gray-300 h-8 w-8 rounded-full'></div>
      </div>
    </div>
  );
}
