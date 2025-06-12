import React from 'react';

const SecondaryHeader = ({ title }) => {
  return (
    <div className=' py-50 bg-stone-200 w-full text-center'>
      <h1 className='text-4xl font-bold text-gray-800'>{title}</h1>
    </div>
  );
};

export default SecondaryHeader;
