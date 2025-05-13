import React, { useState, useEffect } from 'react';
import LayoutContainer from '../components/layout/LayoutContainer';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import NewArrivals from '../sections/NewArrivals';
import NewsletterUpdates from '../sections/NewsletterUpdates';

function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className='border-b py-4'>
      <button
        className='flex items-center justify-between w-full font-semibold text-left focus:outline-none'
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <span className='text-2xl ml-4'>{open ? '−' : '+'}</span>
      </button>
      {open && <div className='mt-2 text-gray-600'>{children}</div>}
    </div>
  );
}

export default function Services() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://681b1c4d17018fe5057a0e51.mockapi.io/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <SecondaryHeader title='Our Services' />
      <LayoutContainer>
        <div className='w-full max-w-6xl mx-auto px-2 md:px-4 -mt-20 z-10 relative'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10'>
            <div className='bg-black text-white p-6 md:p-12 rounded-lg min-h-[180px] md:min-h-[220px] flex flex-col justify-center shadow-xl hover:bg-red-600 transition text-center md:text-left'>
              <h2 className='font-bold text-2xl mb-2'>Personal Stylist</h2>
              <p>
                Get 1-on-1 sessions with fashion experts who help you elevate your drip. From chill fits to bold
                statements, we've got you.
              </p>
            </div>
            <div className='bg-black text-white p-6 md:p-12 rounded-lg min-h-[180px] md:min-h-[220px] flex flex-col justify-center shadow-xl hover:bg-red-600 transition text-center md:text-left'>
              <h2 className='font-bold text-2xl mb-2'>Cloth Assortment</h2>
              <p>
                Browse exclusive fabrics and streetwear staples handpicked for hype and comfort. Find your perfect
                texture and tone.
              </p>
            </div>
            <div className='bg-black text-white p-6 md:p-12 rounded-lg min-h-[180px] md:min-h-[220px] flex flex-col justify-center shadow-xl hover:bg-red-600 transition text-center md:text-left'>
              <h2 className='font-bold text-2xl mb-2'>Taking Measurements</h2>
              <p>We make sizing stress-free. Get professionally fitted so every piece hugs right and hits hard.</p>
            </div>
            <div className='bg-black text-white p-6 md:p-12 rounded-lg min-h-[180px] md:min-h-[220px] flex flex-col justify-center shadow-xl hover:bg-red-600 transition text-center md:text-left'>
              <h2 className='font-bold text-2xl mb-2'>Dry Cleaning</h2>
              <p>
                Keep your heat fresh. Drop your gear for top-tier care with quick turnaround and streetwear-safe
                treatment.
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap justify-center gap-4 md:gap-8 my-6 md:my-8'>
          <img src='/images/logo-nike-sponsers1.png' alt='Logo Nike' className='h-30 mx-auto' />
          <img src='/images/urbancore-sponser2.png' alt='Logo Lv' className='h-30 mx-auto' />
          <img src='/images/badbunny-logo-sponser3.png' alt='Logo BadBunny' className='h-30 mx-auto' />
          <img src='/images/hypemode-sponser4.png' alt='Logo Adidas' className='h-30 mx-auto' />
        </div>
        <div className='max-w-6xl mx-auto my-10 md:my-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start px-2 md:px-0'>
          <div className='flex flex-col items-center md:items-start w-full'>
            <img
              src='/images/WomenPhoto-ServicesCard.png'
              alt='Serviço'
              className='rounded w-full object-cover max-h-[300px] md:max-h-[400px] mb-6'
            />
            <h2 className='text-3xl md:text-4xl font-bold mb-2 text-left w-full'>
              Condimentum Mattis Pellentesque Bibendum
            </h2>
            <p className='mb-4 text-gray-600 text-left w-full'>
              Integer at faucibus urna. Nullam condimentum leo id elit sagittis auctor. Curabitur elementum nunc a leo
              imperdiet, nec elementum diam elementum. Etiam elementum euismod commodo.
            </p>
            <div className='w-full'>
              <AccordionItem title='Pellentesque tincidunt tristique neque?'>
                Description for this block. Use this space for describing your block. Any text will do. Description for
                this block. You can use this space for describing your block.
              </AccordionItem>
              <AccordionItem title='Suspendisse sed ultricies nisl, pharetra rutrum mauris?'>
                Description for this block. Use this space for describing your block. Any text will do. Description for
                this block. You can use this space for describing your block.
              </AccordionItem>
              <AccordionItem title='Fusce at egestas libero convallis egestasullamcorper?'>
                Description for this block. Use this space for describing your block. Any text will do. Description for
                this block. You can use this space for describing your block.
              </AccordionItem>
            </div>
            <button className='mt-6 border border-black px-6 py-2 font-medium hover:bg-red-500 hover:text-white transition self-start'>
              MORE DETAILS
            </button>
          </div>
          <div className='flex flex-col items-start justify-start'>
            <h3 className='text-red-500 font-bold mb-4 md:mb-6'>OUR MISSION</h3>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>Your Personal Styling Team Always Here</h2>
            <p className='mb-6 md:mb-8 text-gray-600 text-base md:text-lg'>
              Integer at faucibus urna. Nullam condimentum leo id elit sagittis auctor. Curabitur elementum nunc a leo
              imperdiet, nec elementum diam elementum. Etiam elementum euismod commodo. Proin eleifend eget quam ut
              efficitur. Mauris a accumsan mauris. Phasellus egestas et risus sit amet hendrerit. Nulla facilisi.
            </p>
            <button className='border border-black px-6 py-2 font-medium hover:bg-red-500 hover:text-white transition mb-6'>
              MORE DETAILS
            </button>
            <img
              src='/images/clothes-ServicesCard.png'
              alt='Other Service'
              className='rounded w-full object-cover max-h-[350px] md:max-h-[470px] mt-2'
            />
          </div>
        </div>
        <NewsletterUpdates />
        <NewArrivals products={products} />
      </LayoutContainer>
    </>
  );
}
