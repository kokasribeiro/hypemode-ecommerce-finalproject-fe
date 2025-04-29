import React from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer';

const HighlightsProducts = () => {
  // Products data array
  const highlightProducts = [
    {
      id: 1,
      image: './images/HightlightsCard1.png',
      alt: 'Highlights card 1',
      title: 'Hype Jacket',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore…',
    },
    {
      id: 2,
      image: './images/HightlightsCard2.png',
      alt: 'Highlights card 2',
      title: 'Hype Jacket',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inc',
    },
    {
      id: 3,
      image: './images/HightlightsCard3.png',
      alt: 'Highlights card 3',
      title: 'Hype Jacket',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore…',
    },
  ];

  return (
    <section className='flex items-center justify-center'>
      <LayoutContainer className='my-20'>
        <div className='text-center'>
          <p className='text-gray-400'>Check out our Highlights Produtcs</p>
          <h1 className='text-4xl font-bold'>Highlights Products</h1>
        </div>
        <div className='grid grid-cols-3 gap-10 my-16'>
          {highlightProducts.map((product) => (
            <div key={product.id}>
              <img src={product.image} alt={product.alt} className='w-full h-100 object-cover cursor-pointer' />
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
