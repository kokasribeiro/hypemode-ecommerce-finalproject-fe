import React from 'react';

const ButtonPrimary = ({ buttonText, onClick }) => {
  return (
    <button
      className='mt-8 bg-red-600 hover:bg-red-700 text-white cursor-pointer py-3 px-6 rounded font-bold uppercase'
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default ButtonPrimary;
