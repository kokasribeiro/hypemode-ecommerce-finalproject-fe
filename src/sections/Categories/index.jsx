import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutContainer from '../../components/layout/LayoutContainer';
import { categories } from '../../data';
const Categories = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    console.log(`Navigating to category: ${categoryName}`);
    navigate(`/products?category=${categoryName}`);
  };

  return (
    <section className='bg-black flex items-center justify-center'>
      <LayoutContainer className='my-20 !px-2'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-4xl font-bold text-white'>Categories</h1>
            <p className='text-gray-400'>Explore our product collections</p>
          </div>
        </div>
        <div className='grid md:grid-cols-5 my-16 w-full'>
          {categories.map((category) => (
            <div
              key={category.id}
              className='w-full relative cursor-pointer'
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCategoryClick(category.category)}
            >
              <div className='mx-4'>
                <img
                  src={category.image}
                  alt={category.alt}
                  className='w-full h-120 object-cover transition duration-300 ease-in-out'
                />
                {hoveredCard === category.id && (
                  <div className='absolute inset-0 bg-black/20 transition-opacity duration-300'></div>
                )}
              </div>
              <div
                className={`absolute bottom-0 py-20 px-10 left-0 bg-black/80 text-white transition-all duration-300 ease-in-out
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
