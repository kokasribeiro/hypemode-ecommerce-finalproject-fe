import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import LayoutContainer from '../components/layout/LayoutContainer';
import ProductCard from '../components/ui/ProductCard';
import FilterCategory from '../components/ui/FilterCategory';
import FilterSale from '../components/ui/FilterSale';
import FilterPrice from '../components/ui/FilterPrice';
import TopRatedProducts from '../components/ui/TopRatedProducts';
import { addRatingToProducts, assignProductRating } from '../utils';
import { fetchProducts } from '../utils/api/mockapi';

// Skeleton component for loading state
const ProductSkeleton = () => (
  <div className='animate-pulse'>
    <div className='bg-gray-300 h-64 w-full rounded-lg mb-4'></div>
    <div className='space-y-2'>
      <div className='h-4 bg-gray-300 rounded w-3/4'></div>
      <div className='h-4 bg-gray-300 rounded w-1/2'></div>
      <div className='h-6 bg-gray-300 rounded w-1/3'></div>
    </div>
  </div>
);

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(9);

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

  const updateRandomRatings = useCallback(() => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];

      const numberOfProductsToUpdate = Math.floor(updatedProducts.length * 0.25);
      const productsToUpdate = [];

      while (productsToUpdate.length < numberOfProductsToUpdate) {
        const randomIndex = Math.floor(Math.random() * updatedProducts.length);
        if (!productsToUpdate.includes(randomIndex)) {
          productsToUpdate.push(randomIndex);
        }
      }

      productsToUpdate.forEach((index) => {
        const possibleRatings = [2, 3, 4, 5];
        const newRating = possibleRatings[Math.floor(Math.random() * possibleRatings.length)];
        updatedProducts[index] = {
          ...updatedProducts[index],
          displayRating: newRating,
        };
      });

      console.log(`Updated ratings for ${numberOfProductsToUpdate} products`);
      return updatedProducts;
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchProductsData = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        if (!isMounted) return;
        if (isMounted) {
          const productsWithRatings = addRatingToProducts(data);
          setProducts(productsWithRatings);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProductsData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      updateRandomRatings();
    }, 20 * 60 * 1000);

    return () => clearInterval(interval);
  }, [products.length, updateRandomRatings]);

  useEffect(() => {
    setDisplayCount(9);
  }, [selectedCategories, showSaleOnly, sortOption, priceRange]);

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
  }, []);

  const handleShowMore = useCallback(() => {
    setDisplayCount((prev) => prev + 9);
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const saleMatch = !showSaleOnly || product.sale;
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

  // Get products to display based on displayCount
  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMoreProducts = displayCount < filteredProducts.length;

  return (
    <LayoutContainer className='my-20'>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='w-full md:w-1/4 space-y-6'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-semibold'>Filters</h2>
            <button
              onClick={handleClearFilters}
              className='text-sm text-red-500 hover:text-red-700 transition duration-200 border border-red-500 hover:border-red-700 px-3 py-1 rounded-md hover:bg-red-50'
            >
              Clear All
            </button>
          </div>

          <FilterPrice
            minPrice={5}
            maxPrice={200}
            onFilterChange={handlePriceFilterChange}
            initialValues={priceRange}
            key={`price-${priceRange.min}-${priceRange.max}`}
          />
          <FilterCategory
            initialSelected={selectedCategories}
            onFilterChange={handleCategoryChange}
            key={`category-${selectedCategories.length}`}
          />
          <FilterSale onFilterChange={handleSaleFilterChange} initialChecked={showSaleOnly} />
          <TopRatedProducts products={products} />
        </div>

        <div className='w-full md:w-3/4'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-semibold'>Products ({filteredProducts.length} found)</h2>
            <div className='flex items-center space-x-2'>
              <label htmlFor='sort' className='text-sm font-medium text-gray-700'>
                Sort By:
              </label>
              <select
                id='sort'
                value={sortOption}
                onChange={handleSortChange}
                className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm'
                disabled={loading}
              >
                <option value='recent'>New Arrivals</option>
                <option value='price-low-high'>Price: Low to High</option>
                <option value='price-high-low'>Price: High to Low</option>
                <option value='best-sellers'>Best Sellers</option>
              </select>
            </div>
          </div>

          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
            {loading
              ? // Show skeleton UI while loading
                Array.from({ length: 9 }).map((_, index) => <ProductSkeleton key={index} />)
              : // Show actual products when loaded
                displayedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>

          {/* Show More Button */}
          {!loading && hasMoreProducts && (
            <div className='flex justify-center mt-12'>
              <button
                onClick={handleShowMore}
                className='bg-red-500 text-white px-8 py-3 font-semibold hover:bg-red-600 transition-colors duration-200 border-2 border-red-500 hover:border-red-600'
              >
                Show More
              </button>
            </div>
          )}

          {/* No products message */}
          {!loading && filteredProducts.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-gray-500 text-lg'>No products found matching your criteria.</p>
              <button onClick={handleClearFilters} className='mt-4 text-red-500 hover:text-red-700 font-medium'>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Products;
