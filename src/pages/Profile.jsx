import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaLock } from 'react-icons/fa';
import LayoutContainer from '../components/layout/LayoutContainer';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import SEO from '../components/SEO';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-red-500'></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <SEO
        title='My Profile - HypeMode Store'
        description='View and manage your profile information'
        keywords='profile, account, user, settings'
        url='/profile'
      />
      <SecondaryHeader title='My Profile' />

      <LayoutContainer className='py-16'>
        <div className='max-w-4xl mx-auto'>
          {/* Profile Header */}
          <div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
            <div className='flex items-center space-x-6'>
              <div className='w-24 h-24 bg-red-500 rounded-full flex items-center justify-center'>
                <FaUser className='h-12 w-12 text-white' />
              </div>
              <div className='flex-1'>
                <h1 className='text-3xl font-bold text-gray-900'>{user.name}</h1>
                <p className='text-lg text-gray-600'>{user.email}</p>
                <span className='inline-block px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-full mt-2'>
                  {user.role === 'admin' ? 'Administrator' : 'Customer'}
                </span>
              </div>
              <div className='flex space-x-3'>
                <button
                  onClick={handleEditProfile}
                  className='flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200'
                >
                  <FaEdit className='h-4 w-4 mr-2' />
                  Edit Profile
                </button>
                <button
                  onClick={handleChangePassword}
                  className='flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200'
                >
                  <FaLock className='h-4 w-4 mr-2' />
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Personal Information */}
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center'>
                <FaUser className='mr-2 text-red-500' />
                Personal Information
              </h2>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Full Name</label>
                  <p className='mt-1 text-lg text-gray-900'>{user.name}</p>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Email Address</label>
                  <p className='mt-1 text-lg text-gray-900 flex items-center'>
                    <FaEnvelope className='h-4 w-4 mr-2 text-gray-500' />
                    {user.email}
                  </p>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Role</label>
                  <p className='mt-1 text-lg text-gray-900'>{user.role === 'admin' ? 'Administrator' : 'Customer'}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center'>
                <FaPhone className='mr-2 text-red-500' />
                Contact Information
              </h2>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Phone Number</label>
                  <p className='mt-1 text-lg text-gray-900'>{user.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Address</label>
                  <p className='mt-1 text-lg text-gray-900 flex items-center'>
                    <FaMapMarkerAlt className='h-4 w-4 mr-2 text-gray-500' />
                    {user.address || 'Not provided'}
                  </p>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>City</label>
                  <p className='mt-1 text-lg text-gray-900'>{user.city || 'Not provided'}</p>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Postal Code</label>
                  <p className='mt-1 text-lg text-gray-900'>{user.postalCode || 'Not provided'}</p>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Country</label>
                  <p className='mt-1 text-lg text-gray-900'>{user.country || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className='bg-white rounded-lg shadow-lg p-6 mt-8'>
            <h2 className='text-xl font-bold text-gray-900 mb-4'>Account Information</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Member Since</label>
                <p className='mt-1 text-lg text-gray-900'>
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Last Updated</label>
                <p className='mt-1 text-lg text-gray-900'>
                  {new Date(user.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
}
