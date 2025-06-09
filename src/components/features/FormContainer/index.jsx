import React from 'react';

const FormContainer = ({
  title,
  children,
  onSubmit,
  footerContent,
  className = '',
  showShadow = true,
  maxWidth = 'max-w-md',
}) => {
  return (
    <div className={`${maxWidth} mx-auto bg-white p-8 rounded-md ${showShadow ? 'shadow-md' : ''} ${className}`}>
      {title && <h2 className='text-2xl font-bold mb-6 text-center'>{title}</h2>}

      <form onSubmit={onSubmit}>{children}</form>

      {footerContent && <div className='mt-6 text-center text-gray-600'>{footerContent}</div>}
    </div>
  );
};

export default FormContainer;
