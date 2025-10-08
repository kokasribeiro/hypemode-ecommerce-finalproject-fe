import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LayoutContainer from '../components/layout/LayoutContainer';
import ProductCard from '../components/features/ProductCard';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import SEO from '../components/SEO';
import { addRatingToProducts } from '../utils';
import { productAPI } from '../utils/api/apiService';

export default function Search() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await productAPI.getAll();
        const data = response.data || [];
        const productsWithRatings = addRatingToProducts(data);
        setProducts(productsWithRatings);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (!query) return false;

    const searchQuery = query.toLowerCase().trim();

    if (!product.name) return false;

    const words = product.name.toLowerCase().split(/\s+/);

    return words.some((word) => word.startsWith(searchQuery));
  });

  if (loading) {
    return (
      <>
        <SEO
          title={query ? `Search: ${query} - Results` : 'Search Products'}
          description={
            query
              ? `Search results for "${query}" at HypeMode Store. Find fashion products that match your style.`
              : 'Search for fashion products at HypeMode Store. Clothing, shoes, and accessories from the best brands.'
          }
          keywords={
            query
              ? `search, ${query}, products, results, fashion`
              : 'search, research, products, fashion, clothing, shoes'
          }
          url={`/search${query ? `?q=${encodeURIComponent(query)}` : ''}`}
        />
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
      <SEO
        title={query ? `Search: ${query} - Results` : 'Search Products'}
        description={
          query
            ? `Search results for "${query}" at HypeMode Store. Find fashion products that match your style.`
            : 'Search for fashion products at HypeMode Store. Clothing, shoes, and accessories from the best brands.'
        }
        keywords={
          query
            ? `search, ${query}, products, results, fashion`
            : 'search, research, products, fashion, clothing, shoes'
        }
        url={`/search${query ? `?q=${encodeURIComponent(query)}` : ''}`}
      />
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
