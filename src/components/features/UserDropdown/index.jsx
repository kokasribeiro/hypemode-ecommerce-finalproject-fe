import { useState, useRef, useEffect } from 'react';
import { FaUser, FaSignOutAlt, FaEdit, FaLock, FaHistory } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function UserDropdown({ isOpen, onClose, user, onLogout }) {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  const handleOrderHistoryClick = () => {
    onClose();
    navigate('/order-history');
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className='absolute right-0 top-full mt-2 w-80 bg-white shadow-xl rounded-lg border border-gray-200 z-50 transform transition-all duration-300 opacity-100 scale-100 translate-y-0'
    >
      {/* Header */}
      <div className='p-4 border-b border-gray-200 bg-gradient-to-r from-red-50 to-pink-50'>
        <div className='flex items-center space-x-3'>
          <div className='w-12 h-12 bg-red-500 rounded-full flex items-center justify-center'>
            <FaUser className='h-6 w-6 text-white' />
          </div>
          <div className='flex-1 min-w-0'>
            <h3 className='text-lg font-bold text-gray-900 truncate'>{user?.name || 'User'}</h3>
            <p className='text-sm text-gray-600 truncate'>{user?.email || 'user@example.com'}</p>
            <span className='inline-block px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full mt-1'>
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
          className='w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200'
        >
          <FaUser className='h-4 w-4 mr-3 text-gray-500' />
          <span className='text-sm font-medium'>My Profile</span>
        </button>

        {/* Change Password */}
        <button
          onClick={handleChangePasswordClick}
          className='w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200'
        >
          <FaLock className='h-4 w-4 mr-3 text-gray-500' />
          <span className='text-sm font-medium'>Change Password</span>
        </button>

        {/* Order History */}
        <button
          onClick={handleOrderHistoryClick}
          className='w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200'
        >
          <FaHistory className='h-4 w-4 mr-3 text-gray-500' />
          <span className='text-sm font-medium'>Order History</span>
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
