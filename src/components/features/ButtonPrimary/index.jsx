import React from 'react';

const ButtonPrimary = ({ buttonText, onClick, children, type = 'button', disabled = false, className = '' }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`mt-8 bg-red-600 hover:bg-red-700 text-white cursor-pointer py-3 px-6 rounded font-bold uppercase disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
    >
      {children || buttonText}
    </button>
  );
};

export default ButtonPrimary;
