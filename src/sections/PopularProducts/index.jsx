import React from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutContainer from '../../components/layout/LayoutContainer';
import ProductCard from '../../components/features/ProductCard';
import { getRandomPopularProducts } from '../../utils';

const PopularProducts = ({ products = [] }) => {
  const navigate = useNavigate();

  const randomPopularProducts = getRandomPopularProducts(products);

  const handleViewAll = () => {
    navigate('/products?sort=best-sellers&clearFilters=true');
  };

  return (
    <LayoutContainer className='my-20'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-4xl font-bold'>Popular Products</h1>
          <p className='text-gray-400'>Check out our top-rated products</p>
        </div>
        <div className='flex justify-between items-center mb-6'>
          <button
            onClick={handleViewAll}
            className='border-4 border-gray-400 text-gray-700 py-2 px-5 text-sm font-medium hover:bg-red-500 hover:text-white hover:border-red-500 transition duration-200'
          >
            VIEW ALL
          </button>
        </div>
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 my-16'>
        {randomPopularProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </LayoutContainer>
  );
};

export default PopularProducts;
