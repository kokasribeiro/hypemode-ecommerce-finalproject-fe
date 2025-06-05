import React from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutContainer from '../../components/layout/LayoutContainer';
import ProductCard from '../../components/ui/ProductCard';
import { getSaleProducts, shuffleArray } from '../../utils';

const FinalSale = ({ products = [] }) => {
  const navigate = useNavigate();

  const allSaleProducts = getSaleProducts(products);

  const shuffled = shuffleArray(allSaleProducts);
  const displayProducts = shuffled.slice(0, 3);

  const handleAllDealsClick = () => {
    navigate('/products?sale=true');
  };

  return (
    <div className='bg-black py-11'>
      <LayoutContainer>
        <div className='flex flex-col lg:flex-row gap-16 items-center'>
          <div className='flex-[2]'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} titleWhite={true} />
              ))}
            </div>
          </div>

          <div className='flex-[1] lg:max-w-xs text-center lg:text-left lg:ml-8'>
            <div className='text-red-500 text-xl font-bold mb-2'>$50 ONLY!</div>
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
