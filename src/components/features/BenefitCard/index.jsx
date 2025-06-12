import React from 'react';

const BenefitCard = ({ title, subtitle, icon }) => {
  return (
    <section className='text-white py-15'>
      <div className='flex flex-col items-center text-center space-y-2'>
        {icon}
        <h3 className='text-lg font-semibold'>{title}</h3>
        <p className='text-sm text-gray-300'>{subtitle}</p>
      </div>
    </section>
  );
};

export default BenefitCard;
