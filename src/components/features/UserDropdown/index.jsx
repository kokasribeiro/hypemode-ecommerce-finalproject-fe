import { useState, useRef, useEffect } from 'react';
import { FaUser, FaMoon, FaSun, FaSignOutAlt, FaEdit, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function UserDropdown({ isOpen, onClose, user, onLogout }) {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if dark mode is already enabled
    return document.documentElement.classList.contains('dark') || localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    // Apply dark mode on component mount
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedEmail');
    localStorage.removeItem('rememberMe');

    // Close dropdown
    onClose();

    // Call parent logout handler
    if (onLogout) {
      onLogout();
    }

    // Navigate to home
    navigate('/');
  };

  const handleProfileClick = () => {
    onClose();
    navigate('/profile');
  };

  const handleChangePasswordClick = () => {
    onClose();
    navigate('/change-password');
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    // Toggle dark mode on document
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className='absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-50 transform transition-all duration-300 opacity-100 scale-100 translate-y-0'
    >
      {/* Header */}
      <div className='p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-700 dark:to-gray-600'>
        <div className='flex items-center space-x-3'>
          <div className='w-12 h-12 bg-red-500 rounded-full flex items-center justify-center'>
            <FaUser className='h-6 w-6 text-white' />
          </div>
          <div className='flex-1 min-w-0'>
            <h3 className='text-lg font-bold text-gray-900 dark:text-white truncate'>{user?.name || 'User'}</h3>
            <p className='text-sm text-gray-600 dark:text-gray-300 truncate'>{user?.email || 'user@example.com'}</p>
            <span className='inline-block px-2 py-1 text-xs font-medium text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded-full mt-1'>
              {user?.role === 'admin' ? 'Administrator' : 'Customer'}
            </span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className='py-2'>
        {/* Profile */}
        <button
          onClick={handleProfileClick}
          className='w-full flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200'
        >
          <FaUser className='h-4 w-4 mr-3 text-gray-500 dark:text-gray-400' />
          <span className='text-sm font-medium'>My Profile</span>
        </button>

        {/* Change Password */}
        <button
          onClick={handleChangePasswordClick}
          className='w-full flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200'
        >
          <FaLock className='h-4 w-4 mr-3 text-gray-500 dark:text-gray-400' />
          <span className='text-sm font-medium'>Change Password</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={handleDarkModeToggle}
          className='w-full flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200'
        >
          {isDarkMode ? (
            <FaSun className='h-4 w-4 mr-3 text-yellow-500' />
          ) : (
            <FaMoon className='h-4 w-4 mr-3 text-gray-500 dark:text-gray-400' />
          )}
          <span className='text-sm font-medium'>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        {/* Divider */}
        <div className='border-t border-gray-200 my-2'></div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className='w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200'
        >
          <FaSignOutAlt className='h-4 w-4 mr-3' />
          <span className='text-sm font-medium'>Logout</span>
        </button>
      </div>

      {/* Footer */}
      <div className='px-4 py-3 bg-gray-50 border-t border-gray-200'>
        <p className='text-xs text-gray-500 text-center'>HypeMode Store • Your Streetwear Destination</p>
      </div>
    </div>
  );
}
