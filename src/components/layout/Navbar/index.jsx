import { navItems } from '../../../data';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaSearch } from 'react-icons/fa';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useCart } from '../../../Pages/CartContext';
import CartDropdown from '../../ui/CartDropdown';

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const cartRef = useRef(null);
  const { cartItemCount } = useCart();

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setShowSearch(false);
        setSearchQuery('');
      }
    },
    [searchQuery, navigate],
  );

  const toggleSearch = useCallback(() => {
    setShowSearch((prev) => !prev);
    setShowCartDropdown(false);
  }, []);

  const toggleCart = useCallback((e) => {
    e.stopPropagation();
    setShowCartDropdown((prev) => !prev);
    setShowSearch(false);
  }, []);

  const closeDropdowns = useCallback(() => {
    setShowCartDropdown(false);
    setShowSearch(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCartDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className='bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Link to='/' className='flex-shrink-0'>
              <img className='h-8 w-auto' src='/images/OfficialLogoPage/logo-ecommerce.png' alt='Logo' />
            </Link>
          </div>

          <div className='hidden md:flex md:items-center md:space-x-6'>
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className='relative text-gray-600 hover:text-gray-800 transition-colors duration-200 pb-1 group text-lg font-medium'
              >
                {item.title}
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full'></span>
              </Link>
            ))}
          </div>

          <div className='flex items-center space-x-4'>
            <div ref={searchRef} className='relative'>
              <button
                onClick={toggleSearch}
                className='p-2 text-gray-600 hover:text-red-500 transition-colors duration-200 cursor-pointer'
                aria-label='Search'
              >
                <FaSearch className='h-5 w-5' />
              </button>

              {showSearch && (
                <div
                  className={`absolute right-0 top-full mt-2 w-80 bg-white shadow-xl rounded-lg border border-gray-200 z-50 transform transition-all duration-300 ${
                    showSearch ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'
                  }`}
                >
                  <form onSubmit={handleSearchSubmit} className='p-4'>
                    <div className='mb-3'>
                      <h3 className='text-lg font-bold text-black mb-2'>Search Products</h3>
                    </div>
                    <input
                      type='text'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder='Search for products...'
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black placeholder-gray-500'
                      autoFocus
                    />
                  </form>
                </div>
              )}
            </div>

            <div ref={cartRef} className='relative'>
              <button
                onClick={toggleCart}
                className='p-2 text-gray-600 hover:text-red-500 transition-colors duration-200 relative cursor-pointer'
                aria-label='Shopping cart'
              >
                <FaShoppingCart className='h-5 w-5' />
                {cartItemCount > 0 && (
                  <span className='absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                    {cartItemCount}
                  </span>
                )}
              </button>

              <CartDropdown isOpen={showCartDropdown} onClose={() => setShowCartDropdown(false)} />
            </div>

            <Link
              to='/login'
              className='p-2 text-gray-600 hover:text-red-500 transition-colors duration-200 cursor-pointer'
              aria-label='User account'
            >
              <FaUser className='h-5 w-5' />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
