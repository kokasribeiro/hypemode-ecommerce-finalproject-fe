import React, { useState, useEffect } from 'react';

const FilterCategory = ({
  categories = ['Jackets', 'Sweaters', 'T-Shirts', 'Accessories', 'Shoes'],
  onFilterChange,
  initialSelected = [],
}) => {
  const [selectedCategories, setSelectedCategories] = useState(initialSelected);

  useEffect(() => {
    if (initialSelected.length > 0) {
      setSelectedCategories(initialSelected);
    }
  }, [initialSelected]);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(selectedCategories);
    }
  }, [selectedCategories, onFilterChange]);

  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className='w-full px-4 mt-6'>
      <h3 className='font-bold mb-2'>Filter by category</h3>

      <div className='flex flex-col space-y-2'>
        {categories.map((category, index) => (
          <div key={index} className='flex items-center'>
            <div
              className={`w-5 h-5 border rounded cursor-pointer mr-2 ${
                selectedCategories.includes(category) ? 'bg-red-500 border-red-500' : 'border-gray-400'
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              {selectedCategories.includes(category) && (
                <div className='flex items-center justify-center h-full'>
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
                </div>
              )}
            </div>
            <span className='text-sm'>{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCategory;
