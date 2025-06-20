import React, { useState, useEffect } from 'react';
import LayoutContainer from '../components/layout/LayoutContainer';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import SEO from '../components/SEO';
import NewArrivals from '../sections/NewArrivals';
import NewsletterUpdates from '../sections/NewsletterUpdates';
import TrendInsights from '../sections/TrendInsights';
import { fetchProducts } from '../utils/api/mockapi';

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
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <>
      <SEO
        title='Our Services - Personal Stylist and More'
        description='Discover our exclusive services: personal stylist, custom measurements, laundry, and fashion consulting. Elevate your style with us!'
        keywords='services, personal stylist, fashion consulting, measurements, laundry, styling, custom fashion'
        url='/services'
      />
      <SecondaryHeader title='Our Services' />
      <LayoutContainer>
        <div className='w-full max-w-6xl mx-auto px-4 -mt-16 md:-mt-20 z-10 relative'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10'>
            <div className='bg-black text-white p-6 md:p-12 rounded-lg min-h-[160px] md:min-h-[220px] flex flex-col justify-center shadow-xl active:bg-red-600 md:hover:bg-red-600 transition text-center md:text-left'>
              <h2 className='font-bold text-xl md:text-2xl mb-2'>Personal Stylist</h2>
              <p className='text-sm md:text-base'>
                Get 1-on-1 sessions with fashion experts who help you elevate your drip. From chill fits to bold
                statements, we've got you.
              </p>
            </div>
            <div className='bg-black text-white p-6 md:p-12 rounded-lg min-h-[160px] md:min-h-[220px] flex flex-col justify-center shadow-xl active:bg-red-600 md:hover:bg-red-600 transition text-center md:text-left'>
              <h2 className='font-bold text-xl md:text-2xl mb-2'>Cloth Assortment</h2>
              <p className='text-sm md:text-base'>
                Browse exclusive fabrics and streetwear staples handpicked for hype and comfort. Find your perfect
                texture and tone.
              </p>
            </div>
            <div className='bg-black text-white p-6 md:p-12 rounded-lg min-h-[160px] md:min-h-[220px] flex flex-col justify-center shadow-xl active:bg-red-600 md:hover:bg-red-600 transition text-center md:text-left'>
              <h2 className='font-bold text-xl md:text-2xl mb-2'>Taking Measurements</h2>
              <p className='text-sm md:text-base'>
                We make sizing stress-free. Get professionally fitted so every piece hugs right and hits hard.
              </p>
            </div>
            <div className='bg-black text-white p-6 md:p-12 rounded-lg min-h-[160px] md:min-h-[220px] flex flex-col justify-center shadow-xl active:bg-red-600 md:hover:bg-red-600 transition text-center md:text-left'>
              <h2 className='font-bold text-xl md:text-2xl mb-2'>Dry Cleaning</h2>
              <p className='text-sm md:text-base'>
                Keep your heat fresh. Drop your gear for top-tier care with quick turnaround and streetwear-safe
                treatment.
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap justify-center gap-4 my-6 md:my-8 px-4'>
          <img
            src='/images/Services/logo-nike-sponsers1.png'
            alt='Nike brand logo - Official sponsor partner'
            className='h-20 md:h-30 mx-2'
          />
          <img
            src='/images/Services/urbancore-sponser2.png'
            alt='Urban Core brand logo - Fashion partner'
            className='h-20 md:h-30 mx-2'
          />
          <img
            src='/images/Services/badbunny-logo-sponser3.png'
            alt='Bad Bunny artist logo - Music collaboration partner'
            className='h-20 md:h-30 mx-2'
          />
          <img
            src='/images/Services/hypemode-sponser4.png'
            alt='Adidas brand logo - Athletic wear sponsor'
            className='h-20 md:h-30 mx-2'
          />
        </div>
        <div className='max-w-6xl mx-auto my-10 md:my-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start px-4 md:px-0'>
          <div className='flex flex-col items-center md:items-start w-full'>
            <img
              src='/images/Services/WomenPhoto-ServicesCard.png'
              alt='Stylish woman wearing trendy fashion outfit showcasing our styling services'
              className='rounded w-full object-cover max-h-[250px] md:max-h-[400px] mb-6'
            />
            <h2 className='text-2xl md:text-4xl font-bold mb-2 text-center md:text-left w-full'>
              Style That Delivers More Than Just Looks
            </h2>
            <p className='mb-4 text-gray-600 text-center md:text-left w-full text-sm md:text-base'>
              We don't just sell clothes—we build the experience. From exclusive drops to reliable support, we're here
              to bring you quality, confidence, and culture. Explore how we've got your back, from first click to final
              fit.
            </p>
            <div className='w-full'>
              <AccordionItem title='How do I know if a product will fit me?'>
                Every product page includes a detailed size guide. If you're between sizes, we recommend sizing up for
                that perfect streetwear fit.
              </AccordionItem>
              <AccordionItem title="Can I return or exchange items if they don't work out?">
                Yes! You have 14 days to return or exchange any unworn items. Just keep the tags on and use the return
                form in your package or online.
              </AccordionItem>
              <AccordionItem title='Do you offer limited edition or exclusive drops?'>
                Absolutely. We regularly launch exclusive drops and collabs—sign up for our newsletter or follow us on
                Instagram so you never miss out.
              </AccordionItem>
            </div>
          </div>
          <div className='flex flex-col items-start justify-start px-4 md:px-0'>
            <h3 className='text-red-500 font-bold mb-4 md:mb-6'>OUR MISSION</h3>
            <h2 className='text-2xl md:text-4xl font-bold mb-4'>Your Personal Styling Team Always Here</h2>
            <p className='mb-6 md:mb-8 text-gray-600 text-sm md:text-lg'>
              We're here to do more than deliver clothes—we help you craft your identity. Whether you're chasing trends
              or defining your own, our mission is to bring confidence, culture, and comfort to every fit. Style isn't
              just what you wear—it's how you wear it.
            </p>
            <img
              src='/images/Services/clothes-ServicesCard.png'
              alt='Collection of premium streetwear clothing hanging in organized display'
              className='rounded w-full object-cover max-h-[250px] md:max-h-[470px] mt-2'
            />
          </div>
        </div>
        <NewsletterUpdates />
        <NewArrivals products={products} showViewAll={true} />
      </LayoutContainer>
    </>
  );
}
