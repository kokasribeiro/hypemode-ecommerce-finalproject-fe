import React from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutContainer from '../../components/layout/LayoutContainer';
import { Star } from 'lucide-react';
import { getSaleProducts, shuffleArray } from '../../utils';

const SaleProductCard = ({ product, titleWhite }) => {
  const navigate = useNavigate();

  const renderStars = () => {
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

  const calculateSalePrice = (originalPrice) => {
    const productIdNumber = parseInt(product.id, 10);
    const discountBase = productIdNumber ? (productIdNumber % 11) / 100 + 0.1 : 0.15;
    const discountedPrice = originalPrice * (1 - discountBase);
    return Number(discountedPrice.toFixed(2));
  };

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className='cursor-pointer' onClick={handleProductClick}>
      <div className='relative'>
        <img
          src={product.image}
          alt={product.name}
          className='w-full h-92 object-cover transition-transform duration-500 ease-in-out hover:scale-110'
        />
        <div className='absolute top-0 right-0 bg-red-600 border border-black p-1 m-2'>
          <p className='text-white text-sm font-bold'>ON SALE</p>
        </div>
      </div>
      <div className='mt-4'>
        <h2 className={`text-lg font-semibold ${titleWhite ? 'text-white' : 'text-gray-800'} hover:underline`}>
          {product.name}
        </h2>
        <div className={`flex items-center mt-2 ${titleWhite ? 'text-white' : ''}`}>{renderStars()}</div>
        <div className='flex items-center space-x-2 mt-2'>
          <span className='text-red-600 text-sm font-bold'>{calculateSalePrice(product.price)} €</span>
          <span className={`text-sm font-medium line-through ${titleWhite ? 'text-white' : 'text-gray-400'}`}>
            {product.price} €
          </span>
        </div>
      </div>
    </div>
  );
};

const FinalSale = ({ products = [] }) => {
  const navigate = useNavigate();

  const allSaleProducts = getSaleProducts(products);
  const shuffled = shuffleArray(allSaleProducts);
  const displayProducts = shuffled.slice(0, 3);

  const handleAllDealsClick = () => {
    navigate('/products?sale=true&clearFilters=true');
  };

  return (
    <div className='bg-black py-11'>
      <LayoutContainer>
        <div className='flex flex-col lg:flex-row gap-16 items-center'>
          <div className='flex-[2]'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
              {displayProducts.map((product) => (
                <SaleProductCard key={product.id} product={product} titleWhite={true} />
              ))}
            </div>
          </div>

          <div className='flex-[1] lg:max-w-xs text-center lg:text-left lg:ml-8'>
            <div className='text-red-500 text-xl font-bold mb-2'>Big Deals!</div>
            <h2 className='text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight'>Final Sale</h2>
            <p className='text-gray-300 mb-4 leading-relaxed text-sm'>
              Limited-time clearance on premium streetwear pieces.
            </p>
            <p className='text-gray-300 mb-8 leading-relaxed text-sm'>
              All sales final - no returns, just pure savings on authentic HypeMode gear.
            </p>
            <button
              onClick={handleAllDealsClick}
              className='bg-transparent border-2 border-white text-white px-6 py-3 font-semibold hover:bg-red-500 hover:border-red-500 transition-colors duration-300'
            >
              ALL DEALS
            </button>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default FinalSale;
