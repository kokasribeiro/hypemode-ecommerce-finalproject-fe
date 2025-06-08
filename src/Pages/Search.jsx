import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LayoutContainer from '../components/layout/LayoutContainer';
import ProductCard from '../components/ui/ProductCard';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import { addRatingToProducts } from '../utils';

export default function Search() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://681b1c4d17018fe5057a0e51.mockapi.io/products');
        const data = await response.json();
        const productsWithRatings = addRatingToProducts(data);
        setProducts(productsWithRatings);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (!query) return false;

    const searchQuery = query.toLowerCase();
    return product.name && product.name.toLowerCase().includes(searchQuery);
  });

  if (loading) {
    return (
      <>
        <SecondaryHeader title={`Search Results`} />
        <LayoutContainer>
          <div className='flex justify-center items-center min-h-[200px] p-4'>
            <p>Loading search results...</p>
          </div>
        </LayoutContainer>
      </>
    );
  }

  return (
    <>
      <SecondaryHeader title={`Search Results for "${query}"`} />
      <LayoutContainer className='my-20'>
        {query ? (
          <>
            <h2 className='text-xl font-semibold mb-6'>
              Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} for "{query}"
            </h2>
            {filteredProducts.length > 0 ? (
              <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className='text-center py-12'>
                <p className='text-gray-500 text-lg'>No products found for "{query}"</p>
                <p className='text-gray-400 mt-2'>Try searching with different keywords</p>
              </div>
            )}
          </>
        ) : (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>Please enter a search term</p>
          </div>
        )}
      </LayoutContainer>
    </>
  );
}
