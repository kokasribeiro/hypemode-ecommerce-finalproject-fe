import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaSearch } from 'react-icons/fa';

export default function SelectInput({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  helperText,
  required = false,
  searchable = false,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef(null);
  const searchRef = useRef(null);

  // Filter options based on search term
  const filteredOptions = searchable
    ? options.filter((option) => option.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  // Get selected option
  const selectedOption = options.find((option) => option.name === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    onChange({
      target: {
        name,
        value: option.name,
      },
    });
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && searchable) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <label className='block text-sm font-medium text-gray-700 mb-2'>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>

      <div ref={selectRef} className='relative'>
        <button
          type='button'
          onClick={handleToggle}
          className={`w-full px-3 py-2 text-left border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 ${
            error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          } ${isOpen ? 'ring-2 ring-red-500 border-red-500' : ''}`}
        >
          <div className='flex items-center justify-between'>
            <span className={`${selectedOption ? 'text-gray-900' : 'text-gray-500'}`}>
              {selectedOption ? selectedOption.name : placeholder}
            </span>
            <FaChevronDown
              className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {isOpen && (
          <div className='absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden'>
            {searchable && (
              <div className='p-2 border-b border-gray-200'>
                <div className='relative'>
                  <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                  <input
                    ref={searchRef}
                    type='text'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder='Search countries...'
                    className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm'
                  />
                </div>
              </div>
            )}

            <div className='max-h-48 overflow-y-auto'>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <button
                    key={option.code || index}
                    type='button'
                    onClick={() => handleOptionClick(option)}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors duration-200 ${
                      selectedOption?.name === option.name ? 'bg-red-50 text-red-600 font-medium' : 'text-gray-900'
                    }`}
                  >
                    {option.name}
                  </button>
                ))
              ) : (
                <div className='px-3 py-2 text-gray-500 text-sm'>
                  {searchable ? 'No countries found' : 'No options available'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}

      {helperText && !error && <p className='mt-1 text-sm text-gray-500'>{helperText}</p>}
    </div>
  );
}
