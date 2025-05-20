import NewsletterUpdates from '../sections/NewsletterUpdates';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div>
      <div className='py-50 bg-stone-200 w-full text-center'>
        <nav className='text-sm text-gray-500 mb-2 max-w-4xl mx-auto px-4 text-left'>
          <Link to='/' className='hover:underline cursor-pointer'>
            Home
          </Link>{' '}
          <span className='mx-2'>/</span>
          <span className='text-black'>About Us</span>
        </nav>
        <h1 className='text-4xl font-bold text-gray-800'>About Us</h1>
      </div>
      <div className='relative flex justify-center items-start max-w-4xl mx-auto mb-12' style={{ minHeight: '320px' }}>
        <div className='bg-black text-white p-20 w-full -mt-20'>
          <div className='flex flex-col md:flex-row md:items-center'>
            <div className='md:w-1/2 h-0 md:h-48'></div>
            <div className='md:w-1/2'>
              <h2 className='text-2xl font-mono font-bold mb-4'>Shoes Collection</h2>
              <div className='flex gap-8 text-sm flex-col md:flex-row'>
                <p>
                  Step into the spotlight with our latest Shoes Collection—where everyday comfort meets standout design.
                  Whether you're chasing clean classics or bold statement pairs, we've got the soles to match your style
                </p>
                <p>
                  Built for movement, crafted for impact, and designed to keep you grounded while turning heads.
                  Discover the drop that completes your fit and takes your streetwear game to the next level.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='absolute left-0 right-auto md:left-12 top-[-120px] z-10 w-80 h-80 shadow-xl rounded-lg overflow-hidden'>
          <img src='public/images/AboutUs/ShoesCardAboutUs.png' alt='Shoes' className='w-full h-full object-cover' />
        </div>
      </div>
      <div className='py-16 bg-white'>
        <div className='max-w-6xl mx-auto text-center'>
          <p className='text-gray-600 mb-2 font-bold text-2xl'>Ready to help you</p>
          <h2 className='text-black text-3xl md:text-4xl font-bold font-mono mb-10'>Our Team</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
            <div className='flex flex-col items-center'>
              <img
                src='/public/images/AboutUs/TeamMember1.png'
                alt='Miguel Silva'
                className='w-56 h-56 object-cover rounded'
              />
              <h3 className='mt-4 text-xl font-bold font-mono text-black'>Miguel Silva</h3>
              <span className='text-red-500 text-sm mt-1'>Designer</span>
            </div>
            <div className='flex flex-col items-center'>
              <img
                src='public/images/AboutUs/TeamMember2.png'
                alt='Steffi Brucce'
                className='w-56 h-56 object-cover rounded'
              />
              <h3 className='mt-4 text-xl font-bold font-mono text-black'>Steffi Brucce</h3>
              <span className='text-red-500 text-sm mt-1'>Manager</span>
            </div>
            <div className='flex flex-col items-center'>
              <img
                src='public/images/AboutUs/TeamMember3.png'
                alt='Miguel Angelo'
                className='w-56 h-56 object-cover rounded'
              />
              <h3 className='mt-4 text-xl font-bold font-mono text-black'>Miguel Angelo</h3>
              <span className='text-red-500 text-sm mt-1'>Consultant</span>
            </div>
            <div className='flex flex-col items-center'>
              <img
                src='public/images/AboutUs/TeamMember4.png'
                alt='Enzo Sebastian'
                className='w-56 h-56 object-cover rounded'
              />
              <h3 className='mt-4 text-xl font-bold font-mono text-black'>Enzo Sebastian</h3>
              <span className='text-red-500 text-sm mt-1'>Stylist</span>
            </div>
          </div>
        </div>
      </div>
      <div className='py-16 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='relative flex flex-col md:flex-row'>
            <div className='md:w-3/5 relative'>
              <img
                src='/public/images/AboutUs/TestimonialCard.png'
                alt='Fashion model'
                className='w-full object-cover'
                style={{ height: '600px' }}
              />
            </div>
            <div
              className='md:w-5/12 md:absolute md:right-10 md:top-1/2 md:transform md:-translate-y-1/2 bg-black text-white p-10 md:p-16 md:z-10'
              style={{ minHeight: '450px' }}
            >
              <h2 className='text-3xl md:text-4xl font-bold font-mono mb-8'>Testimonials</h2>
              <p className='text-gray-300 mb-16'>
                Absolutely love this store! The quality of the pieces is amazing, and everything I ordered fit
                perfectly. The shipping was fast and the customer service was super helpful. Definitely coming back for
                more.
              </p>
              <div className='flex items-center'>
                <div className='w-12 h-12 rounded-full overflow-hidden mr-4'>
                  <img
                    src='/public/images/AboutUs/TestimonialFace.png'
                    alt='Jane Blayck'
                    className='w-full h-full object-cover'
                  />
                </div>
                <span className='text-red-500'>Jane Blayck</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewsletterUpdates />
    </div>
  );
}
