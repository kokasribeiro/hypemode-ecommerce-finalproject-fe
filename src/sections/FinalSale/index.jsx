import React from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer';
import ProductCard from '../../components/ui/ProductCard';

const FinalSale = () => {
  const textContent = (
    <div className="flex flex-col h-full"> 
      <div> {/* Keep content grouped */}
        <h1 className='text-red-500 text-2xl font-bold'>50€ ONLY! </h1>
        <h1 className='text-white text-4xl font-bold pt-8'>Final Sale</h1>
        <p className='text-white pt-8'>
          Mauris vitae ultricies leo integer malesuada cursus. Odio tempor orci dapibus ultrices in. Egestas diam in
          arcu cursus euismod dictum purus viverra accumsan.{' '}
        </p>
      </div>
      
      <div className="mt-8"> 
        <button
          className="
            border border-white text-white
            font-semibold
            py-2 px-6
            hover:bg-red-500 hover:border-red-500 hover:text-white
            transition-colors duration-200 ease-in-out
          "
        >
          ALL DEALS
        </button>
      </div>
    </div>
  );

  return (
    <div className='bg-black'>
      <LayoutContainer>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-20 '>
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
