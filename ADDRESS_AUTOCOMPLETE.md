# Address Autocomplete

## Component Code

```jsx
import { useState, useRef, useEffect } from 'react';
import { FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import { CITIES_DATABASE } from '../../../data/cities';

export default function AddressAutocomplete({
  label,
  name,
  value,
  onChange,
  onCityChange,
  onPostalCodeChange,
  error,
  helperText,
  required = false,
  className = '',
  placeholder = 'Start typing your address...',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || '');
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getAddressSuggestions = async (query) => {
    if (query.length < 3) return [];

    await new Promise((resolve) => setTimeout(resolve, 300));

    const queryLower = query.toLowerCase();

    const getSmartSuggestions = (query) => {
      const queryLower = query.toLowerCase();

      let detectedCity = null;
      for (const [cityKey, cityData] of Object.entries(CITIES_DATABASE)) {
        if (queryLower.includes(cityKey)) {
          detectedCity = cityData;
          break;
        }
      }

      if (detectedCity) {
        return [
          {
            id: 1,
            address: query,
            city: detectedCity.city,
            country: detectedCity.country,
            postalCode: detectedCity.postalCode,
            fullAddress: `${query}, ${detectedCity.city}, ${detectedCity.postalCode}, ${detectedCity.country}`,
          },
          {
            id: 2,
            address: query,
            city: detectedCity.city,
            country: detectedCity.country,
            postalCode: detectedCity.postalCode,
            fullAddress: `${query}, ${detectedCity.postalCode} ${detectedCity.city}, ${detectedCity.country}`,
          },
          {
            id: 3,
            address: query,
            city: detectedCity.city,
            country: detectedCity.country,
            postalCode: detectedCity.postalCode,
            fullAddress: `${query}, ${detectedCity.city} ${detectedCity.postalCode}, ${detectedCity.country}`,
          },
        ];
      }

      return [
        {
          id: 1,
          address: query,
          city: 'Zurich',
          country: 'Switzerland',
          postalCode: '8001',
          fullAddress: `${query}, Zurich, 8001, Switzerland`,
        },
        {
          id: 2,
          address: query,
          city: 'Geneva',
          country: 'Switzerland',
          postalCode: '1201',
          fullAddress: `${query}, Geneva, 1201, Switzerland`,
        },
        {
          id: 3,
          address: query,
          city: 'Paris',
          country: 'France',
          postalCode: '75001',
          fullAddress: `${query}, Paris, 75001, France`,
        },
      ];
    };

    return getSmartSuggestions(query);
  };

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    onChange({
      target: {
        name,
        value: query,
      },
    });

    if (query.length >= 3) {
      setIsLoading(true);
      setIsOpen(true);

      try {
        const suggestions = await getAddressSuggestions(query);
        setSuggestions(suggestions);
      } catch (error) {
        console.error('Error fetching address suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsOpen(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.address);
    setIsOpen(false);

    onChange({
      target: {
        name,
        value: suggestion.address,
      },
    });

    if (onCityChange) {
      onCityChange(suggestion.city);
    }

    if (onPostalCodeChange) {
      onPostalCodeChange(suggestion.postalCode);
    }
  };

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <label className='block text-sm font-medium text-gray-700 mb-2'>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>

      <div ref={autocompleteRef} className='relative'>
        <div className='relative'>
          <input
            ref={inputRef}
            type='text'
            name={name}
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleFocus}
            placeholder={placeholder}
            className={`w-full px-3 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            autoComplete='off'
          />
          <FaMapMarkerAlt className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
          {isLoading && (
            <FaSpinner className='absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 animate-spin' />
          )}
        </div>

        {isOpen && (suggestions.length > 0 || isLoading) && (
          <div className='absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden'>
            {isLoading ? (
              <div className='px-3 py-2 text-gray-500 text-sm flex items-center'>
                <FaSpinner className='h-4 w-4 mr-2 animate-spin' />
                Searching addresses...
              </div>
            ) : (
              <div className='max-h-48 overflow-y-auto'>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type='button'
                    onClick={() => handleSuggestionClick(suggestion)}
                    className='w-full px-3 py-3 text-left hover:bg-gray-100 transition-colors duration-200 border-b border-gray-100 last:border-b-0'
                  >
                    <div className='flex items-start'>
                      <FaMapMarkerAlt className='h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0' />
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-gray-900 truncate'>{suggestion.address}</p>
                        <p className='text-xs text-gray-500'>
                          {suggestion.city}, {suggestion.postalCode}, {suggestion.country}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}

      {helperText && !error && <p className='mt-1 text-sm text-gray-500'>{helperText}</p>}
    </div>
  );
}
```

## Usage

```jsx
<AddressAutocomplete
  label='Address'
  name='address'
  value={formData.address}
  onChange={handleChange}
  onCityChange={(city) => setFormData((prev) => ({ ...prev, city }))}
  onPostalCodeChange={(postalCode) => setFormData((prev) => ({ ...prev, postalCode }))}
  error={errors.address}
  helperText='Start typing your address'
  placeholder='Start typing your address...'
/>
```
