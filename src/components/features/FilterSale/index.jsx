import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FilterSale = ({ onFilterChange, initialChecked = false }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const saleParam = params.get('sale');
    const newChecked = saleParam === 'true';
    setIsChecked(newChecked);

    // Notify parent component when URL changes
    if (onFilterChange) {
      onFilterChange(newChecked);
    }
  }, [location.search, onFilterChange]);

  useEffect(() => {
    setIsChecked(initialChecked);
  }, [initialChecked]);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);

    if (onFilterChange) {
      onFilterChange(newChecked);
    }

    const params = new URLSearchParams(location.search);
    if (newChecked) {
      params.set('sale', 'true');
    } else {
      params.delete('sale');
    }

    const newSearch = params.toString();
    const newPath = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;
    navigate(newPath, { replace: true, state: { preventScroll: true } });
  };

  return (
    <div className='w-full px-4'>
      <h3 className='font-bold mb-2'>Sale items only</h3>
      <div className='flex items-center'>
        <div
          className={`w-5 h-5 border rounded cursor-pointer mr-2 flex items-center justify-center transition-colors duration-200 
            ${
              isChecked
                ? 'bg-red-500 border-red-500 hover:bg-red-600'
                : 'border-gray-400 hover:border-red-500 hover:bg-red-50'
            }`}
          onClick={handleChange}
        >
          {isChecked && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3 w-3 text-white'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
          )}
        </div>
        <span className='text-sm'>Show sale items only</span>
      </div>
    </div>
  );
};

export default FilterSale;
