import React from 'react';
import { Check, CheckCircle } from 'lucide-react';

const SuccessMessage = ({
  title,
  message,
  buttonText,
  onButtonClick,
  icon = 'check',
  className = '',
  variant = 'default',
}) => {
  const getIconComponent = () => {
    if (icon === 'check-circle') {
      return <CheckCircle className='h-16 w-16 text-green-500' />;
    }
    return (
      <div className='flex justify-center mb-4'>
        <Check className='h-16 w-16 text-green-500' />
      </div>
    );
  };

  const getContainerClasses = () => {
    const baseClasses = `${className}`;

    if (variant === 'green') {
      return `${baseClasses} bg-green-50 border border-green-200 rounded-lg p-6 text-center`;
    }

    if (variant === 'centered') {
      return `${baseClasses} max-w-md mx-auto bg-white p-8 shadow-md rounded-md text-center`;
    }

    return `${baseClasses} text-center`;
  };

  const getTitleClasses = () => {
    if (variant === 'green') {
      return 'text-xl font-semibold text-green-800 mb-2';
    }
    return 'text-2xl font-bold text-green-600 mb-3';
  };

  const getMessageClasses = () => {
    if (variant === 'green') {
      return 'text-green-700 mb-4';
    }
    return 'text-gray-600 mt-3';
  };

  const getButtonClasses = () => {
    if (variant === 'green') {
      return 'bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300';
    }
    return 'w-full py-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors';
  };

  return (
    <div className={getContainerClasses()}>
      {(variant === 'centered' || variant === 'green') && <div className='mb-6'>{getIconComponent()}</div>}

      <h2 className={getTitleClasses()}>{title}</h2>
      {message && <p className={getMessageClasses()}>{message}</p>}

      {buttonText && onButtonClick && (
        <button onClick={onButtonClick} className={getButtonClasses()}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default SuccessMessage;
