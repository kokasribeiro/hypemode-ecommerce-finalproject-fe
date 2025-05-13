import React, { useState } from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer';

const Categories = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    {
      id: 1,
      image: './images/hypemode-jacket.png',
      alt: 'jacket category',
      count: '461 articles',
      title: 'Jackets',
    },
    {
      id: 2,
      image: './images/sweater-hypemode.png',
      alt: 'sweater category',
      count: '289 articles',
      title: 'Sweaters',
    },
    {
      id: 3,
      image: './images/acessories-hypemode.png',
      alt: 'accessories category',
      count: '345 articles',
      title: 'Accessories',
    },
  ];

  return (
    <section className='bg-black flex items-center justify-center'>
      <LayoutContainer className='my-20 !px-2'>
        <div className='grid md:grid-cols-3 gap-10 my-16 w-full'>
          {categories.map((category) => (
            <div
              key={category.id}
              className='w-full relative cursor'
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className='mx-4'>
                <img
                  src={category.image}
                  alt={category.alt}
                  className='w-full h-120 object-cover cursor-pointer transition duration-300 ease-in-out'
                />
                {hoveredCard === category.id && (
                  <div className='absolute inset-0 bg-black/20 transition-opacity duration-300'></div>
                )}
              </div>
              <div
                className={`absolute bottom-0 py-20 px-10 left-0 bg-black/80 text-white cursor-pointer transition-all duration-300 ease-in-out
                  ${hoveredCard === category.id ? 'w-full bg-red-600' : 'lg:w-9/12 w-full'}`}
              >
                <h3 className='text-sm font-semibold'>{category.count}</h3>
                <h2 className='text-3xl text-white'>{category.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
};

export default Categories;
