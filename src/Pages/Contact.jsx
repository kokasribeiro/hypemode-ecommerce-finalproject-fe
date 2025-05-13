import LayoutContainer from '../components/layout/LayoutContainer';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import NewArrivals from '../sections/NewArrivals';
import NewsletterUpdates from '../sections/NewsletterUpdates';

export default function Contact() {
  return (
    <>
      <SecondaryHeader title='Contact' />
      <LayoutContainer>
        <h1 className='text-2xl font-bold'>My contacts</h1>
        <div className='container mx-auto px-4 py-12'>
          <div className='flex flex-col md:flex-row items-start justify-center gap-8 md:gap-16'>
            <div className='md:w-1/2 flex justify-center md:justify-end'>
              <div className='relative max-w-md w-full'>
                <div className='absolute inset-0 transform -translate-x-4 -translate-y-4 z-0'></div>
                <img
                  src='/images/contact-image.png'
                  alt='Woman with headphones'
                  className='relative z-10 w-full h-auto object-cover'
                />
              </div>
            </div>
            <div className='md:w-1/2 max-w-md'>
              <h2 className='text-3xl font-bold mb-6'>Contact with us</h2>
              <form>
                <div className='mb-4'>
                  <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                    Name *
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    required
                    className='w-full p-3 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500'
                  />
                </div>
                <div className='mb-4'>
                  <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-1'>
                    Phone *
                  </label>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    required
                    className='w-full p-3 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500'
                  />
                </div>
                <div className='mb-4'>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                    Email Address *
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    className='w-full p-3 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500'
                  />
                </div>
                <div className='mb-6'>
                  <label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-1'>
                    Your Message *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    rows='5'
                    required
                    className='w-full p-3 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500'
                  ></textarea>
                </div>
                <button
                  type='submit'
                  className='bg-red-600 text-white py-3 px-6 rounded hover:bg-red-700 transition duration-300'
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className='container mx-auto px-4 py-8'>
          <NewArrivals showViewAll={true} />
        </div>
        <div className='container mx-auto px-4 py-12'>
          <NewsletterUpdates />
        </div>
      </LayoutContainer>
    </>
  );
}
