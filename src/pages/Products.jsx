import React, { useState, useEffect, useCallback } from 'react';
import LayoutContainer from '../components/layout/LayoutContainer';
import ProductCard from '../components/features/ProductCard';
import ProductSkeleton from '../components/features/SkeletonUiLoading/ProductSkeleton';
import FilterCategory from '../components/features/FilterCategory';
import FilterSale from '../components/features/FilterSale';
import FilterPrice from '../components/features/FilterPrice';
import TopRatedProducts from '../components/features/TopRatedProducts';
import SEO from '../components/SEO';
import { addRatingToProducts, assignProductRating } from '../utils';
import { fetchProducts } from '../utils/api/mockapi';
import { useProductFilters } from '../hooks/useProductFilters';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(9);

  const {
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
  } = useProductFilters();

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

        const productsWithRatings = addRatingToProducts(data);
        setProducts(productsWithRatings);
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

  const handleShowMore = useCallback(() => {
    setDisplayCount((prev) => prev + 9);
  }, []);

  const filteredProducts = filterAndSortProducts(products);
  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMoreProducts = displayCount < filteredProducts.length;

  return (
    <LayoutContainer className='my-20'>
      <SEO
        title='Products - Complete Catalog'
        description='Explore our complete collection of fashion products. Clothing, shoes, and accessories with filters by category, price, and more. Find your ideal style!'
        keywords='products, catalog, clothing, shoes, accessories, filters, men fashion, women fashion, offers'
        url='/products'
      />
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
          <FilterSale
            onFilterChange={handleSaleFilterChange}
            initialChecked={showSaleOnly}
            key={`sale-${showSaleOnly}`}
          />
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
              ? Array.from({ length: 9 }).map((_, index) => <ProductSkeleton key={index} />)
              : displayedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>

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
