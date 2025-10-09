import { navItems } from '../../../data';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaBars } from 'react-icons/fa';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useCart } from '../../../contexts/CartContext';
import CartDropdown from '../../features/CartDropdown';
import UserDropdown from '../../features/UserDropdown';
import { productAPI } from '../../../utils/api/apiService';
import { addRatingToProducts } from '../../../utils';

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const cartRef = useRef(null);
  const userRef = useRef(null);
  const { cartItemCount } = useCart();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await productAPI.getAll();
        const data = response.data || [];
        const productsWithRatings = addRatingToProducts(data);
        setAllProducts(productsWithRatings);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    loadProducts();
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const filterProducts = () => {
      const query = searchQuery.toLowerCase().trim();

      const filtered = allProducts.filter((product) => {
        if (!product.name) return false;

        const words = product.name.toLowerCase().split(/\s+/);

        return words.some((word) => word.startsWith(query));
      });

      setSearchResults(filtered.slice(0, 6));
    };

    filterProducts();
  }, [searchQuery, allProducts]);

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setShowSearch(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    },
    [searchQuery, navigate],
  );

  const handleProductClick = useCallback(
    (productId) => {
      navigate(`/products/${productId}`);
      setShowSearch(false);
      setSearchQuery('');
      setSearchResults([]);
    },
    [navigate],
  );

  const toggleSearch = useCallback(() => {
    setShowSearch((prev) => !prev);
    setShowCartDropdown(false);
  }, []);

  const toggleCart = useCallback((e) => {
    e.stopPropagation();
    setShowCartDropdown((prev) => !prev);
    setShowSearch(false);
    setShowUserDropdown(false);
  }, []);

  const toggleUser = useCallback((e) => {
    e.stopPropagation();
    setShowUserDropdown((prev) => !prev);
    setShowSearch(false);
    setShowCartDropdown(false);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setShowUserDropdown(false);
  }, []);

  const closeDropdowns = useCallback(() => {
    setShowCartDropdown(false);
    setShowSearch(false);
    setShowUserDropdown(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCartDropdown(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className='bg-white dark:bg-gray-900 shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Link to='/' className='flex-shrink-0'>
              <img
                className='h-8 w-auto'
                src='/images/OfficialLogoPage/logo-ecommerce.png'
                alt='HypeMode Store - Streetwear fashion brand logo'
              />
            </Link>
          </div>

          <div className='hidden md:flex md:items-center md:space-x-6'>
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className='relative text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200 pb-1 group text-lg font-medium'
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
                className='p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors duration-200 cursor-pointer'
                aria-label='Search'
              >
                <FaSearch className='h-5 w-5' />
              </button>

              {showSearch && (
                <div
                  className={`fixed left-1/2 -translate-x-1/2 top-20 mt-2 w-full max-w-sm md:absolute md:right-0 md:left-auto md:translate-x-0 md:top-full md:w-96 bg-white shadow-xl rounded-lg border border-gray-200 z-50 transform transition-all duration-300 ${
                    showSearch ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'
                  }`}
                >
                  <form onSubmit={handleSearchSubmit} className='p-4'>
                    <div className='mb-3'>
                      <h3 className='text-lg font-bold text-black mb-2'>Search Products</h3>
                    </div>
                    <div className='flex'>
                      <input
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Search for products...'
                        className='flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black placeholder-gray-500'
                        autoFocus
                      />
                      <button
                        type='submit'
                        className='px-4 py-2 bg-red-500 text-white rounded-r-lg hover:bg-red-600 transition-colors duration-200'
                      >
                        Search
                      </button>
                    </div>
                    {searchQuery.trim() && (
                      <div className='mt-3 max-h-80 overflow-y-auto'>
                        {searchResults.length > 0 ? (
                          <>
                            <div className='text-sm text-gray-600 mb-2 px-2'>
                              Showing {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                            </div>
                            <div className='space-y-2'>
                              {searchResults.map((product) => (
                                <div
                                  key={product.id}
                                  onClick={() => handleProductClick(product.id)}
                                  className='flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200'
                                >
                                  <img
                                    src={product.image || '/images/placeholder.png'}
                                    alt={product.name}
                                    className='w-12 h-12 object-cover rounded-md mr-3'
                                  />
                                  <div className='flex-1 min-w-0'>
                                    <p className='text-sm font-medium text-gray-900 truncate'>{product.name}</p>
                                    <p className='text-sm text-gray-500'>${product.price}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {searchResults.length === 6 && (
                              <div className='mt-3 pt-3 border-t border-gray-200'>
                                <button
                                  type='submit'
                                  className='w-full text-center text-sm text-red-500 hover:text-red-600 font-medium'
                                >
                                  View all results for "{searchQuery}"
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className='text-center py-4 text-gray-500'>
                            <p className='text-sm'>No products found starting with "{searchQuery}"</p>
                            <p className='text-xs mt-1'>Try different keywords</p>
                          </div>
                        )}
                      </div>
                    )}
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

            {user ? (
              <div ref={userRef} className='relative'>
                <button
                  onClick={toggleUser}
                  className='p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors duration-200 cursor-pointer'
                  aria-label='User account'
                >
                  <FaUser className='h-5 w-5' />
                </button>

                <UserDropdown
                  isOpen={showUserDropdown}
                  onClose={() => setShowUserDropdown(false)}
                  user={user}
                  onLogout={handleLogout}
                />
              </div>
            ) : (
              <Link
                to='/login'
                className='p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors duration-200 cursor-pointer'
                aria-label='User account'
              >
                <FaUser className='h-5 w-5' />
              </Link>
            )}

            <button
              className='p-2 text-gray-600 hover:text-red-500 transition-colors duration-200 cursor-pointer md:hidden'
              aria-label='Open menu'
              onClick={() => setShowMobileMenu(true)}
            >
              <FaBars className='h-6 w-6' />
            </button>
          </div>
        </div>
      </div>

      {showMobileMenu && (
        <div className='fixed inset-0 z-50 flex'>
          <div
            className='fixed inset-0 bg-black bg-opacity-30 transition-opacity z-10'
            onClick={() => setShowMobileMenu(false)}
          ></div>
          <div
            ref={mobileMenuRef}
            className='ml-auto w-64 max-w-full h-full bg-white shadow-lg p-6 flex flex-col space-y-6 animate-slide-in-right z-20'
          >
            <button
              className='self-end mb-4 p-2 text-gray-600 hover:text-red-500 transition-colors duration-200'
              aria-label='Close menu'
              onClick={() => setShowMobileMenu(false)}
            >
              ✕
            </button>
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className='text-gray-700 text-lg font-medium hover:text-red-500 transition-colors duration-200'
                onClick={() => setShowMobileMenu(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
