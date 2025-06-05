import { useState, useEffect } from 'react';
import ProductCard from '../components/ui/ProductCard';
import ProductCardSkeleton from '../components/ui/SkeletonUiLoading/ProductCardSkeleton';
import LayoutContainer from '../components/layout/LayoutContainer';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import FilterPrice from '../components/ui/FilterPrice';
import FilterCategory from '../components/ui/FilterCategory';
import FilterSale from '../components/ui/FilterSale';
import TopRatedProducts from '../components/ui/TopRatedProducts';
import { useLocation } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 20, max: 800 });
  const [searchTerm, setSearchTerm] = useState('');
  const [localSearch, setLocalSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryFromUrl, setCategoryFromUrl] = useState(null);
  const [sortOption, setSortOption] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [showSaleOnly, setShowSaleOnly] = useState(false);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search') || '';
    const categoryParam = params.get('category');
    const sortParam = params.get('sort');
    const saleParam = params.get('sale');

    setSearchTerm(query);
    setLocalSearch(query);

    if (categoryParam) {
      console.log('Category from URL:', categoryParam);
      setCategoryFromUrl(categoryParam);
      setSelectedCategories([categoryParam]);
    }

    if (sortParam === 'recent') {
      setSortOption('recent');
    }

    if (sortParam === 'best-sellers') {
      setSortOption('best-sellers');
    }

    if (saleParam === 'true') {
      setShowSaleOnly(true);
    } else {
      setShowSaleOnly(false);
    }
  }, [location.search]);

  useEffect(() => {
    setLoading(true);
    fetch('https://681b1c4d17018fe5057a0e51.mockapi.io/products')
      .then((response) => response.json())
      .then((data) => {
        const productsWithRatings = data.map((product) => {
          const randomRating = Math.floor(Math.random() * 3) + 3;
          const normalizedProduct = {
            ...product,
            displayRating: randomRating,
            category: product.category || '',
          };
          return normalizedProduct;
        });

        setAllProducts(productsWithRatings);
        setLoading(false);
        console.log('Total products fetched:', productsWithRatings.length);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = allProducts.filter((product) => {
      const regularPriceInRange = product.price >= priceRange.min && product.price <= priceRange.max;
      if (product.sale) {
        const calculateSalePrice = (originalPrice) => {
          const discountRate = Math.random() * 0.1 + 0.1;
          const discountedPrice = originalPrice * (1 - discountRate);
          return Number(discountedPrice.toFixed(2));
        };

        const salePrice = calculateSalePrice(product.price);
        const salePriceInRange = salePrice >= priceRange.min && salePrice <= priceRange.max;

        return regularPriceInRange || salePriceInRange;
      }

      return regularPriceInRange;
    });

    if (searchTerm) {
      const term = searchTerm.toUpperCase();
      filtered = filtered.filter((product) => product.name.toUpperCase().startsWith(term));
    }

    if (selectedCategories.length > 0) {
      console.log('Filtering by categories:', selectedCategories);
      filtered = filtered.filter((product) => {
        if (!product.category) return false;

        const isIncluded = selectedCategories.some(
          (selectedCat) => product.category.toLowerCase() === selectedCat.toLowerCase(),
        );

        return isIncluded;
      });

      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (showSaleOnly) {
      filtered = filtered.filter((product) => product.sale === true);
    }

    switch (sortOption) {
      case 'price-low-high':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'recent':
        filtered = [...filtered].sort((a, b) => b.id - a.id);
        break;
      case 'best-sellers':
        filtered = [...filtered].sort((a, b) => b.displayRating - a.displayRating);
        break;
      case 'relevance':
      default:
        break;
    }

    console.log('Filtered products count:', filtered.length);
    setProducts(filtered);
  }, [priceRange, allProducts, searchTerm, selectedCategories, sortOption, showSaleOnly]);

  const handleFilterPrice = (range) => {
    setPriceRange(range);
  };

  const handleFilterCategory = (categories) => {
    console.log('Filter categories changed to:', categories);
    if (categoryFromUrl && categories.length === 0) {
      setCategoryFromUrl(null);
    }
    setSelectedCategories(categories);
  };

  const handleFilterSale = (showSale) => {
    setShowSaleOnly(showSale);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setLocalSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(localSearch);
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    setSearchTerm('');
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      <SecondaryHeader title='Products' />
      <LayoutContainer>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center my-4 md:my-10 px-4 md:px-0'>
          <h1 className='text-xl md:text-2xl font-bold'>
            {searchTerm
              ? `Products starting with "${searchTerm}"`
              : categoryFromUrl
              ? `${categoryFromUrl} Products`
              : showSaleOnly
              ? 'Sale Items'
              : sortOption === 'recent'
              ? 'New Arrivals'
              : sortOption === 'best-sellers'
              ? 'Best Sellers'
              : 'All Products'}
          </h1>
          <div className='flex items-center gap-3 mt-3 md:mt-0'>
            <button
              onClick={toggleFilters}
              className='md:hidden flex items-center bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded'
            >
              <span className='mr-1'>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              <span className='text-sm'>{showFilters ? '↑' : '↓'}</span>
            </button>
            <div className='sort-container'>
              <label className='inline-flex items-center'>
                <span className='mr-2 text-gray-700 text-sm md:text-base'>Sort by:</span>
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className='border border-gray-300 rounded-md py-1 px-2 md:px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base'
                >
                  <option value='relevance'>Relevance</option>
                  <option value='recent'>Most Recent</option>
                  <option value='best-sellers'>Best Sellers</option>
                  <option value='price-low-high'>Price, low to high</option>
                  <option value='price-high-low'>Price, high to low</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-4 w-full px-4 md:px-0'>
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-1/4 mb-6 md:mb-0`}>
            <div className='mb-6 bg-white p-4 shadow-md rounded-lg'>
              <h3 className='font-bold text-lg md:text-xl mb-4'>Search Products</h3>
              <form onSubmit={handleSearchSubmit} className='relative'>
                <input
                  type='text'
                  placeholder='Search by name...'
                  value={localSearch}
                  onChange={handleSearchInputChange}
                  className='w-full border border-gray-300 rounded-md py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <div className='absolute right-0 top-0 h-full flex items-center'>
                  {localSearch && (
                    <button
                      type='button'
                      onClick={handleClearSearch}
                      className='h-full px-2 text-gray-500 hover:text-gray-700'
                    >
                      ✕
                    </button>
                  )}
                  <button type='submit' className='h-full px-3 text-gray-600 hover:text-gray-800'>
                    🔍
                  </button>
                </div>
              </form>
            </div>
            <div className='mb-6 bg-white p-4 shadow-md rounded-lg'>
              <FilterPrice minPrice={10} maxPrice={200} onFilterChange={handleFilterPrice} />
            </div>
            <div className='mb-6 bg-white p-4 shadow-md rounded-lg'>
              <FilterCategory
                onFilterChange={handleFilterCategory}
                initialSelected={categoryFromUrl ? [categoryFromUrl] : []}
              />
            </div>
            <div className='mb-6 bg-white p-4 shadow-md rounded-lg'>
              <FilterSale onFilterChange={handleFilterSale} initialChecked={showSaleOnly} />
            </div>
            <div className='bg-white p-4 shadow-md rounded-lg'>
              <TopRatedProducts products={allProducts} />
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full'>
            {loading ? (
              Array(9)
                .fill()
                .map((_, index) => <ProductCardSkeleton key={index} />)
            ) : products.length > 0 ? (
              products.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <p className='col-span-full text-center py-10 md:py-20 font-bold text-xl md:text-3xl'>
                No products found matching your criteria.
              </p>
            )}
          </div>
        </div>
      </LayoutContainer>
    </>
  );
}
