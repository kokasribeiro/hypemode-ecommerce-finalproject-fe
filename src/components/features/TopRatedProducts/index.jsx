import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopRatedProducts = ({ products = [] }) => {
  const navigate = useNavigate();
  const isLoading = products.length === 0;

  const ratedProducts = [...products].sort((a, b) => (b.displayRating || 0) - (a.displayRating || 0)).slice(0, 5);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const renderStars = (product) => {
    const rating = product.displayRating || 5;

    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className={`h-4 w-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
        />,
      );
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className='w-full px-4 mt-6'>
        <h3 className='font-bold mb-4'>Top rated products</h3>
        <div className='space-y-4'>
          <p className='text-sm text-gray-500'>Loading top products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full px-4 mt-6'>
      <h3 className='font-bold mb-4'>Top rated products</h3>
      <div className='space-y-4'>
        {ratedProducts.map((product) => (
          <div
            key={product.id}
            className='flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors'
            onClick={() => handleProductClick(product.id)}
          >
            <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100 flex items-center justify-center'>
              {product.image ? (
                <img src={product.image} alt={product.name || product.title} className='h-full w-full object-cover' />
              ) : (
                <div className='text-xl text-gray-400'>{(product.name || product.title || 'P').charAt(0)}</div>
              )}
            </div>
            <div>
              <h4 className='text-sm font-medium text-gray-900'>{product.name || product.title}</h4>
              <div className='flex items-center'>{renderStars(product)}</div>
              <div className='flex items-center space-x-2'>
                <span className='font-medium'>{Number(product.price).toFixed(2)} €</span>
                {product.originalPrice && (
                  <span className='text-gray-400 line-through text-sm'>
                    {Number(product.originalPrice).toFixed(2)} €
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedProducts;
