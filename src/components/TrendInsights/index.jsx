import React from 'react';
import LayoutContainer from '../ui/LayoutContainer';

const TrendInsights = () => {
  return (
    <LayoutContainer className='my-20'>
      <div className='flex justify-end relative'>
        <img src='./images/insightDress.png' alt='WomenInsightDress' className='md:w-200 h-auto' />

        {/* <div class='absolute top-70 left-1 bg-black bg-opacity-70 text-white p-20'>
          <h3 class='text-5xl font-semibold '>
            New Cloth <br /> Technologies
          </h3>
          <p class='md:text-md font-light max-w-[400px] my-8'>
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut laborLorem ipsum
            dolor sit amet consectetur adipiscing elit sed do eiusmLorem ipsum dolor sit amet consectetur adipiscing
            elit sed do eiusmLorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmLorem ipsum dolor sit
            amet consectetur adipiscing elit sed do eiusmLorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmLorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusme
          </p>

          <p>Nome</p>
          <p>desc</p>
        </div> */}
      </div>
    </LayoutContainer>
  );
};

export default TrendInsights;
