import { navItems } from '../../../data';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const handleSearchButtonClick = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='bg-black'>
      <div className=' text-gray-400 text-sm py-2 px-2 max-w-7xl mx-auto'>
        Don't miss our <u className='cursor-pointer hover:text-white'>holiday offer</u> - up to 50% OFF!
      </div>

      <nav className='bg-white py-6 px-8 text-gray-600 hidden md:block'>
        <div className='flex justify-between items-center max-w-7xl mx-auto'>
          <img src='/public/images/OfficialLogoPage/logo-ecommerce.png' alt='Logo' className='h-10 cursor-pointer' />

          <ul className='flex gap-9 cursor-pointer uppercase font-bold'>
            {navItems.map((item) => (
              <li
                key={item.id}
                className='hover:text-black hover:underline relative after:bg-red-500 after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300'
              >
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>

          <div className='flex gap-3 cursor-pointer items-center relative'>
            <div className='flex items-center' ref={searchRef}>
              <div
                className={`flex items-center transition-all duration-300 overflow-hidden ${
                  showSearch ? 'w-48' : 'w-0'
                }`}
              >
                <form onSubmit={handleSearchSubmit} className='flex w-full'>
                  <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search products...'
                    className='border border-r-0 border-gray-300 rounded-l px-2 py-1 w-full outline-none text-sm'
                    autoFocus={showSearch}
                  />
                  <button
                    type='button'
                    onClick={handleSearchButtonClick}
                    className='p-1 bg-red-500 text-white border border-red-500 rounded-r cursor-pointer hover:bg-red-600 active:bg-red-700'
                  >
                    <FaSearch className='text-sm' />
                  </button>
                </form>
              </div>
              <FaSearch className='text-xl hover:text-red-500 ml-2' onClick={() => setShowSearch(!showSearch)} />
            </div>
            <FaUser className='text-xl hover:text-red-500' />
            <FaShoppingCart className='text-xl hover:text-red-500' />
          </div>
        </div>
      </nav>
    </div>
  );
}
