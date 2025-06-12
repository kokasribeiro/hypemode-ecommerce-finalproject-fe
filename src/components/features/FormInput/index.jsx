import React, { forwardRef } from 'react';

const FormInput = forwardRef(
  (
    {
      label,
      name,
      type = 'text',
      value,
      onChange,
      error,
      required = false,
      placeholder,
      helperText,
      className = '',
      inputClassName = '',
      rows,
      ...rest
    },
    ref,
  ) => {
    const baseInputClasses = `w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
      error ? 'border-red-500' : 'border-gray-300'
    } ${inputClassName}`;

    const InputComponent = type === 'textarea' ? 'textarea' : 'input';

    return (
      <div className={`mb-4 ${className}`}>
        {label && (
          <label htmlFor={name} className='block text-gray-700 mb-2 font-medium'>
            {label} {required && <span className='text-red-500'>*</span>}
          </label>
        )}

        <InputComponent
          ref={ref}
          type={type !== 'textarea' ? type : undefined}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={type === 'textarea' ? rows : undefined}
          className={baseInputClasses}
          {...rest}
        />

        {helperText && <p className='text-gray-600 text-sm mt-1'>{helperText}</p>}

        {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';

export default FormInput;
