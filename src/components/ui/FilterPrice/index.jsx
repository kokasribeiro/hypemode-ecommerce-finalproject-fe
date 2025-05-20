import React, { useState, useEffect, useRef, useCallback } from 'react';

const FilterPrice = ({ minPrice = 0, maxPrice = 100, onFilterChange }) => {
  const [minValue, setMinValue] = useState(minPrice);
  const [maxValue, setMaxValue] = useState(maxPrice);
  const [isDragging, setIsDragging] = useState(false);
  const [activeDot, setActiveDot] = useState(null);
  const sliderRef = useRef(null);

  const minPos = ((minValue - minPrice) / (maxPrice - minPrice)) * 100;
  const maxPos = ((maxValue - minPrice) / (maxPrice - minPrice)) * 100;

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({ min: minValue, max: maxValue });
    }
  }, [minValue, maxValue, onFilterChange]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
  };

  const handleMinInputChange = (e) => {
    const value = Number(e.target.value);
    if (value >= minPrice && value < maxValue) {
      setMinValue(value);
    }
  };

  const handleMaxInputChange = (e) => {
    const value = Number(e.target.value);
    if (value <= maxPrice && value > minValue) {
      setMaxValue(value);
    }
  };

  const handleMouseDown = (e, dot) => {
    e.preventDefault();
    setIsDragging(true);
    setActiveDot(dot);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !sliderRef.current) return;

      const slider = sliderRef.current;
      const rect = slider.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const value = Math.round(minPrice + pos * (maxPrice - minPrice));

      if (activeDot === 'min') {
        const newValue = Math.min(Math.max(value, minPrice), maxValue - 1);
        setMinValue(newValue);
      } else {
        const newValue = Math.max(Math.min(value, maxPrice), minValue + 1);
        setMaxValue(newValue);
      }
    },
    [isDragging, activeDot, minPrice, maxPrice, minValue, maxValue, setMinValue, setMaxValue],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setActiveDot(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className='w-full px-4'>
      <h3 className='font-bold mb-2'>Filter by price</h3>

      <div className='relative h-7 mb-4' ref={sliderRef}>
        <div className='absolute h-1 bg-red-500 rounded w-full top-3'></div>

        <input
          type='range'
          min={minPrice}
          max={maxPrice}
          value={minValue}
          onChange={handleMinChange}
          className='absolute w-full h-1 appearance-none bg-transparent cursor-pointer'
          style={{
            zIndex: 1,
            pointerEvents: isDragging ? 'none' : 'auto',
            opacity: 0,
          }}
        />

        <input
          type='range'
          min={minPrice}
          max={maxPrice}
          value={maxValue}
          onChange={handleMaxChange}
          className='absolute w-full h-1 appearance-none bg-transparent cursor-pointer'
          style={{
            zIndex: 1,
            pointerEvents: isDragging ? 'none' : 'auto',
            opacity: 0,
          }}
        />

        <div
          className='absolute w-4 h-4 bg-white border-2 border-red-500 rounded-full -mt-1.5 transform -translate-x-1/2 cursor-pointer'
          style={{ left: `${minPos}%`, top: '12px', zIndex: 4 }}
          onMouseDown={(e) => handleMouseDown(e, 'min')}
        ></div>
        <div
          className='absolute w-4 h-4 bg-white border-2 border-red-500 rounded-full -mt-1.5 transform -translate-x-1/2 cursor-pointer'
          style={{ left: `${maxPos}%`, top: '12px', zIndex: 4 }}
          onMouseDown={(e) => handleMouseDown(e, 'max')}
        ></div>
      </div>

      <div className='flex justify-between gap-2 mt-2'>
        <div className='border rounded p-2 w-24 text-center'>
          <input
            type='number'
            value={minValue}
            onChange={handleMinInputChange}
            className='w-full text-center focus:outline-none'
            min={minPrice}
            max={maxValue - 1}
          />
        </div>
        <div className='border rounded p-2 w-24 text-center'>
          <input
            type='number'
            value={maxValue}
            onChange={handleMaxInputChange}
            className='w-full text-center focus:outline-none'
            min={minValue + 1}
            max={maxPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPrice;
