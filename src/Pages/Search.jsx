import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LayoutContainer from '../components/layout/LayoutContainer';
import ProductCard from '../components/features/ProductCard';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import SEO from '../components/SEO';
import { addRatingToProducts } from '../utils';
import { fetchProducts } from '../utils/api/mockapi';

export default function Search() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
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
    

    return words.some(word => word.startsWith(searchQuery));
  });

  if (loading) {
    return (
      <>
        <SEO 
          title={query ? `Busca: ${query} - Resultados` : 'Buscar Produtos'}
          description={query ? `Resultados da busca por "${query}" na HypeMode Store. Encontre produtos de moda que combinam com seu estilo.` : 'Busque por produtos de moda na HypeMode Store. Roupas, calçados e acessórios das melhores marcas.'}
          keywords={query ? `busca, ${query}, produtos, resultados, moda` : 'busca, pesquisa, produtos, moda, roupas, calçados'}
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
        title={query ? `Busca: ${query} - Resultados` : 'Buscar Produtos'}
        description={query ? `Resultados da busca por "${query}" na HypeMode Store. Encontre produtos de moda que combinam com seu estilo.` : 'Busque por produtos de moda na HypeMode Store. Roupas, calçados e acessórios das melhores marcas.'}
        keywords={query ? `busca, ${query}, produtos, resultados, moda` : 'busca, pesquisa, produtos, moda, roupas, calçados'}
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
