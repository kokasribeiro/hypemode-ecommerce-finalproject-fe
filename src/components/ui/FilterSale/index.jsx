import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FilterSale = ({ onFilterChange, initialChecked = false }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const saleParam = params.get('sale');
    setIsChecked(saleParam === 'true');
  }, [location.search]);

  const handleChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    
    if (onFilterChange) {
      onFilterChange(checked);
    }
    
    const params = new URLSearchParams(location.search);
    if (checked) {
      params.set('sale', 'true');
    } else {
      params.delete('sale');
    }
    
    const newSearch = params.toString();
    const newPath = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;
    navigate(newPath, { replace: true });
  };

  return (
    <div className="filter-sale">
      <h3 className="font-bold text-lg md:text-xl mb-4">Products on Sale</h3>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="sale-filter"
          checked={isChecked}
          onChange={handleChange}
          className="w-5 h-5 border-gray-300 rounded "
        />
        <label htmlFor="sale-filter" className="ml-2 text-gray-700 cursor-pointer">
          Sale items only
        </label>
      </div>
    </div>
  );
};

export default FilterSale; 