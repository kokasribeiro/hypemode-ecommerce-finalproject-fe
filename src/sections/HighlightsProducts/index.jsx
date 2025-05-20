import React from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer';
import { useNavigate } from 'react-router-dom';

const HighlightsProducts = ({ products = [] }) => {
  const navigate = useNavigate();

  const getRandomProducts = (arr, n) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  const randomProducts = getRandomProducts(products, 3);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <section className='flex items-center justify-center'>
      <LayoutContainer className='my-20'>
        <div className='text-center'>
          <p className='text-gray-400'>Check out our Highlights Products</p>
          <h1 className='text-4xl font-bold'>Highlights Products</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 my-16'>
          {randomProducts.map((product) => (
            <div key={product.id} onClick={() => handleProductClick(product.id)} className='cursor-pointer'>
              <img src={product.image} alt={product.title} className='w-full h-100 object-cover cursor-pointer' />
              <h2 className='text-2xl font-medium py-2 pt-8'>{product.title}</h2>
              <p className='text-gray-500 py-2'>{product.description}</p>
            </div>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
};

export default HighlightsProducts;
