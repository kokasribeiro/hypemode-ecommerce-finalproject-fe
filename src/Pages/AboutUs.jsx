import NewsletterUpdates from '../sections/NewsletterUpdates';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div>
      <SEO 
        title="Sobre Nós - Nossa História e Equipe"
        description="Conheça a HypeMode Store, nossa missão, valores e a equipe apaixonada por moda que trabalha para trazer as melhores tendências até você."
        keywords="sobre nós, equipe, história, missão, valores, moda, HypeMode Store, empresa"
        url="/about"
      />
      <div className='relative'>
        <div className='py-50 bg-stone-200 w-full text-center'>
          <nav className='text-sm text-gray-500 mb-2 max-w-4xl mx-auto px-4 text-left'>
            <Link to='/' className='hover:underline cursor-pointer'>
              Home
            </Link>
            <span className='mx-2'>/</span>
            <span className='text-black'>About Us</span>
          </nav>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>About Us</h1>
        </div>

        <div
          className='relative flex flex-col md:flex-row justify-center items-start max-w-4xl mx-auto mb-12 px-4'
          style={{ marginTop: '-90px' }}
        >
          <div className='bg-black text-white p-8 md:p-20 w-full'>
            <div className='flex flex-col md:flex-row md:items-center'>
              <div className='md:w-1/2 h-0 md:h-48'></div>
              <div className='md:w-1/2 pt-16 md:pt-0'>
                <h2 className='text-xl md:text-2xl font-mono font-bold mb-4'>Shoes Collection</h2>
                <div className='flex gap-4 md:gap-8 text-sm'>
                  <p className='w-1/2'>
                    Step into the spotlight with our latest Shoes Collection—where everyday comfort meets standout
                    design. Whether you're chasing clean classics or bold statement pairs, we've got the soles to match
                    your style
                  </p>
                  <p className='w-1/2'>
                    Built for movement, crafted for impact, and designed to keep you grounded while turning heads.
                    Discover the drop that completes your fit and takes your streetwear game to the next level.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='absolute left-4 right-auto md:left-12 top-[-30px] md:top-[-50px] z-10 w-56 md:w-80 h-56 md:h-80 shadow-xl rounded-lg overflow-hidden'>
            <img src='public/images/AboutUs/ShoesCardAboutUs.png' alt='Premium sneaker collection featuring modern streetwear footwear designs' className='w-full h-full object-cover' />
          </div>
        </div>
      </div>
      <div className='py-12 md:py-16 bg-white'>
        <div className='max-w-6xl mx-auto text-center px-4'>
          <p className='text-gray-600 mb-2 font-bold text-xl md:text-2xl'>Ready to help you</p>
          <h2 className='text-black text-2xl md:text-4xl font-bold font-mono mb-8 md:mb-10'>Our Team</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8'>
            <div className='flex flex-col items-center'>
              <img
                src='/images/AboutUs/TeamMember1.png'
                alt='Miguel Silva - Creative Designer specializing in streetwear fashion'
                className='w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 object-cover rounded'
              />
              <h3 className='mt-2 md:mt-4 text-base md:text-xl font-bold font-mono text-black'>Miguel Silva</h3>
              <span className='text-red-500 text-xs md:text-sm mt-1'>Designer</span>
            </div>
            <div className='flex flex-col items-center'>
              <img
                src='public/images/AboutUs/TeamMember2.png'
                alt='Steffi Brucce - Operations Manager overseeing team coordination and business strategy'
                className='w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 object-cover rounded'
              />
              <h3 className='mt-2 md:mt-4 text-base md:text-xl font-bold font-mono text-black'>Steffi Brucce</h3>
              <span className='text-red-500 text-xs md:text-sm mt-1'>Manager</span>
            </div>
            <div className='flex flex-col items-center'>
              <img
                src='public/images/AboutUs/TeamMember3.png'
                alt='Miguel Angelo - Fashion Consultant providing expert styling advice and trend insights'
                className='w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 object-cover rounded'
              />
              <h3 className='mt-2 md:mt-4 text-base md:text-xl font-bold font-mono text-black'>Miguel Angelo</h3>
              <span className='text-red-500 text-xs md:text-sm mt-1'>Consultant</span>
            </div>
            <div className='flex flex-col items-center'>
              <img
                src='public/images/AboutUs/TeamMember4.png'
                alt='Enzo Sebastian - Personal Stylist creating custom looks and fashion guidance'
                className='w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 object-cover rounded'
              />
              <h3 className='mt-2 md:mt-4 text-base md:text-xl font-bold font-mono text-black'>Enzo Sebastian</h3>
              <span className='text-red-500 text-xs md:text-sm mt-1'>Stylist</span>
            </div>
          </div>
        </div>
      </div>
      <div className='py-12 md:py-16 bg-white'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='relative flex flex-col md:flex-row'>
            <div className='w-full md:w-2/3 relative md:-ml-14 md:overflow-visible'>
              <img
                src='/images/AboutUs/TestimonialCard.png'
                alt='Professional portrait of satisfied customer showcasing fashionable outfit'
                className='w-full object-cover'
                style={{ height: '700px', objectPosition: 'left center' }}
                loading='lazy'
              />
            </div>
            <div className='w-full md:w-5/12 md:absolute md:right-10 md:top-1/2 md:transform md:-translate-y-1/2 bg-black text-white p-6 md:p-16 md:z-10'>
              <h2 className='text-2xl md:text-4xl font-bold font-mono mb-4 md:mb-8'>Testimonials</h2>
              <p className='text-gray-300 text-sm md:text-base mb-8 md:mb-16'>
                Absolutely love this store! The quality of the pieces is amazing, and everything I ordered fit
                perfectly. The shipping was fast and the customer service was super helpful. Definitely coming back for
                more.
              </p>
              <div className='flex items-center'>
                <div className='w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden mr-4'>
                  <img
                    src='/images/AboutUs/TestimonialFace.png'
                    alt='Jane Blayck - Happy customer profile photo'
                    className='w-full h-full object-cover'
                    loading='lazy'
                  />
                </div>
                <span className='text-red-500 text-sm md:text-base'>Jane Blayck</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewsletterUpdates />
    </div>
  );
}
