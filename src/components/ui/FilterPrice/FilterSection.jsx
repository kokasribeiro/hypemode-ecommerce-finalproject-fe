import React from 'react';
import FilterPrice from '.';
import TopRatedProducts from '../TopRatedProducts';

const FilterSection = ({ onPriceFilterChange }) => {
  return (
    <div className='w-full'>
      <FilterPrice minPrice={10} maxPrice={200} onFilterChange={onPriceFilterChange} />

      <TopRatedProducts />
    </div>
  );
};

export default FilterSection;
