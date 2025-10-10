import React, { useState, useEffect } from 'react';
import { PRODUCT_CATEGORIES as categories } from '../../../constants';

const FilterCategory = ({ onFilterChange, initialSelected = [] }) => {
  const [selectedCategories, setSelectedCategories] = useState(initialSelected);

  const handleCategorySelect = (category) => {
    let newSelected;
    if (selectedCategories.includes(category)) {
      newSelected = selectedCategories.filter((cat) => cat !== category);
    } else {
      newSelected = [...selectedCategories, category];
    }
    setSelectedCategories(newSelected);
    onFilterChange(newSelected);
  };

  return (
    <div className='w-full px-4'>
      <h3 className='font-bold mb-2'>Filter by category</h3>
      <div className='flex flex-col space-y-2'>
        {categories.map((category) => (
          <div key={category.id} className='flex items-center'>
            <div
              className={`w-5 h-5 border rounded cursor-pointer mr-2 flex items-center justify-center transition-colors duration-200 
                ${
                  selectedCategories.includes(category.category)
                    ? 'bg-red-500 border-red-500 hover:bg-red-600'
                    : 'border-gray-400 hover:border-red-500 hover:bg-red-50'
                }`}
              onClick={() => handleCategorySelect(category.category)}
            >
              {selectedCategories.includes(category.category) && (
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
            <span className='text-sm'>{category.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCategory;
