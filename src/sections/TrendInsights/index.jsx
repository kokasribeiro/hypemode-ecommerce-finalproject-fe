import React from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer';

const TrendInsights = () => {
  return (
    <LayoutContainer className='my-20'>
      <div className='flex justify-end relative'>
        {/* todo: alt tem q ser bem descritivo */}
        <img src='/Images/Home/Insight/insightDress.png' alt='WomenInsightDress' className='md:w-150 h-auto' />

        <div className='absolute top-50 right-130 bg-black bg-opacity-90 text-white py-19 px-10 max-w-sm z-10'>
          <h3 className='text-3xl font-semibold mb-4'>
            Trend <br /> Insight
          </h3>
          <p className='text-sm font-light mb-6 leading-relaxed'>
            We’re seeing a remarkable shift in consumer behavior this season—shoppers are leaning into sustainability
            and minimalist aesthetics more than ever. Our curated collections reflect this evolution, ensuring our
            customers stay ahead of the curve without compromising on quality or style.
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
