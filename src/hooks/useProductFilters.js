import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const useProductFilters = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const shouldClearFilters = searchParams.get('clearFilters') === 'true';

  const initialCategories = () => {
    if (shouldClearFilters) {
      const urlCategory = searchParams.get('category');
      return urlCategory ? [urlCategory] : [];
    }

    const savedCategories = localStorage.getItem('selectedCategories');
    const urlCategory = searchParams.get('category');
    const parsedCategories = savedCategories ? JSON.parse(savedCategories) : [];
    return urlCategory && !parsedCategories.includes(urlCategory)
      ? [...parsedCategories, urlCategory]
      : parsedCategories;
  };

  const initialSortOption = () => {
    const urlSort = searchParams.get('sort');

    if (shouldClearFilters) {
      return urlSort || 'recent';
    }

    const savedSort = localStorage.getItem('sortOption');
    return urlSort || savedSort || 'recent';
  };

  const initialSaleFilter = () => {
    if (shouldClearFilters) {
      return searchParams.get('sale') === 'true';
    }

    const saved = localStorage.getItem('showSaleOnly');
    const urlSale = searchParams.get('sale') === 'true';
    return urlSale || (saved ? JSON.parse(saved) : false);
  };

  const initialPriceRange = () => {
    if (shouldClearFilters) {
      return { min: 5, max: 200 };
    }

    const savedPriceRange = localStorage.getItem('priceRange');
    return savedPriceRange ? JSON.parse(savedPriceRange) : { min: 5, max: 200 };
  };

  const [selectedCategories, setSelectedCategories] = useState(initialCategories);
  const [showSaleOnly, setShowSaleOnly] = useState(initialSaleFilter);
  const [sortOption, setSortOption] = useState(initialSortOption);
  const [priceRange, setPriceRange] = useState(initialPriceRange);

  useEffect(() => {
    if (shouldClearFilters) {
      localStorage.removeItem('selectedCategories');
      localStorage.removeItem('showSaleOnly');
      localStorage.removeItem('sortOption');
      localStorage.removeItem('priceRange');
    }
  }, [shouldClearFilters]);

  useEffect(() => {
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    localStorage.setItem('showSaleOnly', JSON.stringify(showSaleOnly));
    localStorage.setItem('sortOption', sortOption);
    localStorage.setItem('priceRange', JSON.stringify(priceRange));
  }, [selectedCategories, showSaleOnly, sortOption, priceRange]);

  const handleCategoryChange = useCallback((newCategories) => {
    setSelectedCategories(newCategories);
  }, []);

  const handleSaleFilterChange = useCallback((isChecked) => {
    setShowSaleOnly(isChecked);
  }, []);

  const handleSortChange = useCallback((event) => {
    setSortOption(event.target.value);
  }, []);

  const handlePriceFilterChange = useCallback((newPriceRange) => {
    setPriceRange(newPriceRange);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedCategories([]);
    setShowSaleOnly(false);
    setSortOption('recent');
    setPriceRange({ min: 5, max: 200 });
    
    navigate('/products', { replace: true });
  }, [navigate]);

  const filterAndSortProducts = useCallback(
    (products) => {
      return products
        .filter((product) => {
          const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
          const saleMatch = !showSaleOnly || product.sale || product.discount;
          const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;
          return categoryMatch && saleMatch && priceMatch;
        })
        .sort((a, b) => {
          switch (sortOption) {
            case 'price-low-high':
              return a.price - b.price;
            case 'price-high-low':
              return b.price - a.price;
            case 'best-sellers':
              return b.displayRating - a.displayRating;
            case 'recent':
              return b.id - a.id;
            default:
              return b.id - a.id;
          }
        });
    },
    [selectedCategories, showSaleOnly, priceRange, sortOption],
  );

  return {
    selectedCategories,
    showSaleOnly,
    sortOption,
    priceRange,

    handleCategoryChange,
    handleSaleFilterChange,
    handleSortChange,
    handlePriceFilterChange,
    handleClearFilters,

    filterAndSortProducts,
  };
};
