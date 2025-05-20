import React from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutContainer from '../../components/layout/LayoutContainer';
import ProductCard from '../../components/ui/ProductCard';

const PopularProducts = ({ products, showViewAll = false }) => {
  const navigate = useNavigate();

  const topRatedProducts = [...products]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 4)
    .map((product) => {
      return { ...product, displayRating: 5 };
    });

  const handleViewAll = () => {
    navigate('/products?sort=relevance');
  };

  return (
    <LayoutContainer className='my-20'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-gray-400'>Check out popular products</p>
          <h1 className='text-4xl font-bold'>Popular Products</h1>
        </div>
        {showViewAll && (
          <div className='flex justify-between items-center mb-6'>
            <button
              onClick={handleViewAll}
              className='border border-gray-400 text-gray-700 py-2 px-5 text-sm font-medium hover:bg-red-500 transition duration-200'
            >
              VIEW ALL
            </button>
          </div>
        )}
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-8 gap-12 my-16'>
        {topRatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </LayoutContainer>
  );
};

export default PopularProducts;
