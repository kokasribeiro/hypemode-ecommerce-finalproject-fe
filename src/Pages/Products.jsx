import { useState, useEffect } from 'react';
import ProductCard from '../components/ui/ProductCard';
import LayoutContainer from '../components/layout/LayoutContainer';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import FilterPrice from '../components/ui/FilterPrice';
import FilterCategory from '../components/ui/FilterCategory';
import TopRatedProducts from '../components/ui/TopRatedProducts';
import { useLocation } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 20, max: 800 });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryFromUrl, setCategoryFromUrl] = useState(null);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search') || '';
    const categoryParam = params.get('category');

    setSearchTerm(query);

    if (categoryParam) {
      console.log('Category from URL:', categoryParam);
      setCategoryFromUrl(categoryParam);
      setSelectedCategories([categoryParam]);
    }
  }, [location.search]);

  useEffect(() => {
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

        console.log('Total products fetched:', productsWithRatings.length);
      });
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = allProducts.filter((product) => product.price >= priceRange.min && product.price <= priceRange.max);

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

    console.log('Filtered products count:', filtered.length);
    setProducts(filtered);
  }, [priceRange, allProducts, searchTerm, selectedCategories]);

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

  return (
    <>
      <SecondaryHeader title='Products' />
      <LayoutContainer>
        <h1 className='text-2xl font-bold my-6 md:my-10'>
          {searchTerm
            ? `Products starting with "${searchTerm}"`
            : categoryFromUrl
            ? `${categoryFromUrl} Products`
            : 'All Products'}
        </h1>
        <div className='flex flex-col md:flex-row gap-4 w-full'>
          <div className='w-full md:w-1/4 mb-6 md:mb-0'>
            <FilterPrice minPrice={10} maxPrice={200} onFilterChange={handleFilterPrice} />
            <FilterCategory
              onFilterChange={handleFilterCategory}
              initialSelected={categoryFromUrl ? [categoryFromUrl] : []}
            />
            <TopRatedProducts products={allProducts} />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 w-full'>
            {products.length > 0 ? (
              products.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <p className='col-span-full text-center py-20 font-bold text-3xl'>No products found matching your criteria.</p>
            )}
          </div>
        </div>
      </LayoutContainer>
    </>
  );
}
