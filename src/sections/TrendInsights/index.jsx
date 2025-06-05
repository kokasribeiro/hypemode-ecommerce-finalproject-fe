import React from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer';

const TrendInsights = () => {
  return (
    <LayoutContainer className='my-20'>
      <div className='flex justify-end relative'>
        <img src='./public/images/home/insight/insightDress.png' alt='WomenInsightDress' className='md:w-150 h-auto' />

        <div className='absolute top-16 left-1/3 bg-black bg-opacity-90 text-white py-19 px-12 max-w-xs z-10'>
          <h3 className='text-3xl font-semibold mb-4'>
            Trend <br /> Insights
          </h3>
          <p className='text-sm font-light mb-6 leading-relaxed'>
            Mauris vitae ultricies leo integer malesuada. Odio tempor orci dapibus ultrices in. Egestas diam in arcu
            cursus euismod. Dictum purus viverra accumsan in nisl. Tempor id eu.
          </p>

          <div className='mt-6'>
            <p className='text-2xl font-script mb-1'>Brucce D</p>
            <p className='text-xs text-gray-300'>Brucce D, CEO</p>
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default TrendInsights;
