export default function AboutUs() {
  return (
    <div>
      <div className='py-50 bg-stone-200 w-full text-center'>
        <nav className='text-sm text-gray-500 mb-2 max-w-4xl mx-auto px-4 text-left'>
          <span className='hover:underline cursor-pointer'>Home</span> <span className='mx-2'>/</span>
          <span className='text-black'>About Us</span>
        </nav>
        <h1 className='text-4xl font-bold'>About Us</h1>
      </div>
      <div className='relative flex justify-center items-start max-w-4xl mx-auto mb-12' style={{ minHeight: '320px' }}>
        <div className='bg-black text-white p-20 w-full -mt-20'>
          <div className='flex flex-col md:flex-row md:items-center'>
            <div className='md:w-1/2 h-0 md:h-48'></div>
            <div className='md:w-1/2'>
              <h2 className='text-2xl font-mono font-bold mb-4'>Shoes Collection</h2>
              <div className='flex gap-8 text-sm flex-col md:flex-row'>
                <p>
                  Fusce at nisi eget dolor rhoncus facilisis. Mauris ante nisi,consectetur et luctus et, porta ut dolor.
                </p>
                <p>
                  Mauris ante nisi, consectetur et luctus et, porta ut dolor. Nullam convallis, erat ut varius
                  ultricies.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='absolute left-0 right-auto md:left-12 top-[-120px] z-10 w-80 h-80 shadow-xl rounded-lg overflow-hidden'>
          <img src='/images/ShoesCardAboutUs.png' alt='Shoes' className='w-full h-full object-cover' />
        </div>
      </div>
      <div className='py-16 bg-white'>
        <div className='max-w-6xl mx-auto text-center'>
          <p className='text-gray-400 mb-2'>Ready to help you</p>
          <h2 className='text-3xl md:text-4xl font-bold font-mono mb-10'>Our Team</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
            <div className='flex flex-col items-center'>
              <img src='/images/team1.jpg' alt='Jerry Hill' className='w-56 h-56 object-cover rounded' />
              <h3 className='mt-4 text-xl font-bold font-mono'>Jerry Hill</h3>
              <span className='text-red-500 text-sm mt-1'>Designer</span>
            </div>
            <div className='flex flex-col items-center'>
              <img src='/images/team2.jpg' alt='Roger Jones' className='w-56 h-56 object-cover rounded' />
              <h3 className='mt-4 text-xl font-bold font-mono'>Roger Jones</h3>
              <span className='text-red-500 text-sm mt-1'>Manager</span>
            </div>
            <div className='flex flex-col items-center'>
              <img src='/images/team3.jpg' alt='Bianca Oliver' className='w-56 h-56 object-cover rounded' />
              <h3 className='mt-4 text-xl font-bold font-mono'>Bianca Oliver</h3>
              <span className='text-red-500 text-sm mt-1'>Consultant</span>
            </div>
            <div className='flex flex-col items-center'>
              <img src='/images/team4.jpg' alt='Mike Miller' className='w-56 h-56 object-cover rounded' />
              <h3 className='mt-4 text-xl font-bold font-mono'>Mike Miller</h3>
              <span className='text-red-500 text-sm mt-1'>Stylist</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
