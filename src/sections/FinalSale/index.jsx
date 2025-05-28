import React from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutContainer from '../../components/layout/LayoutContainer';
import ProductCard from '../../components/ui/ProductCard';

const FinalSale = ({ products = [] }) => {
  const navigate = useNavigate();

  const allSaleProducts = [...products].filter((product) => product.sale === true);

  const getRandomSaleProducts = () => {
    const shuffled = [...allSaleProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const saleProducts = getRandomSaleProducts();

  const handleAllDealsClick = () => {
    navigate('/products?sale=true');
  };

  const textContent = (
    <div className='flex flex-col h-full'>
      <div>
        <h1 className='text-red-500 text-4xl font-bold pt-8'>Final Sale</h1>
        <p className='text-white pt-8'>
          This is your last chance to grab the pieces you've been eyeing. Our Final Sale is all about no restocks, and
          no second chances. From everyday essentials to standout statement pieces, it's now or never. Stock is
          limited—and once it's gone, it's gone for good. Don't sleep on it
        </p>
      </div>
      <div className='mt-8'>
        <button
          onClick={handleAllDealsClick}
          className='
            border border-white text-white
            font-semibold
            py-2 px-6
            hover:bg-red-500 hover:border-red-500 hover:text-white
            transition-colors duration-200 ease-in-out'
        >
          ALL DEALS
        </button>
      </div>
    </div>
  );

  return (
    <div className='bg-black'>
      <LayoutContainer>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-20 '>
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} titleWhite />
          ))}
          <div className='hidden md:block lg:hidden'>{textContent}</div>
          <div className='block md:hidden lg:block'>{textContent}</div>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default FinalSale;
