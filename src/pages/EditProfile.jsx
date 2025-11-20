import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave, FaTimes } from 'react-icons/fa';
import LayoutContainer from '../components/layout/LayoutContainer';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import FormContainer from '../components/features/FormContainer';
import FormInput from '../components/features/FormInput';
import SelectInput from '../components/features/SelectInput';
import AddressAutocomplete from '../components/features/AddressAutocomplete';
import ButtonPrimary from '../components/features/ButtonPrimary';
import SEO from '../components/SEO';
import { useFormValidation } from '../hooks/useFormValidation';
import { ERROR_MESSAGES } from '../constants/validation';
import { COUNTRIES } from '../data/countries';
import { authAPI } from '../utils/api/apiService';

export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const { errors, validateAllFields, validateSingleField } = useFormValidation({
    required: ['name', 'email'],
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    try {
      const userObj = JSON.parse(userData);
      setUser(userObj);
      setFormData({
        name: userObj.name || '',
        email: userObj.email || '',
        phone: userObj.phone || '',
        address: userObj.address || '',
        city: userObj.city || '',
        postalCode: userObj.postalCode || '',
        country: userObj.country || '',
      });
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate single field
    if (value) {
      validateSingleField(name, value, formData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const { isValid } = validateAllFields(formData);

    if (!isValid) {
      setIsSaving(false);
      return;
    }

    try {
      console.log('🚀 Updating profile with data:', formData);

      // Update profile via backend API
      const response = await authAPI.updateProfile(formData);

      console.log('📡 Update profile response:', response);

      if (response.success) {
        console.log('✅ Profile updated successfully:', response.data);

        // Update localStorage with new data
        const updatedUser = response.data;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);

        setSuccess(true);
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        console.error('❌ Profile update failed:', response);
        alert(response.message || 'Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('❌ Profile update error:', error);

      let errorMessage = 'Failed to update profile. Please try again.';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-red-500'></div>
      </div>
    );
  }

  if (success) {
    return (
      <div>
        <SEO
          title='Profile Updated - HypeMode Store'
          description='Your profile has been successfully updated'
          keywords='profile, update, account'
          url='/edit-profile'
        />
        <SecondaryHeader title='Profile Updated' />
        <LayoutContainer className='py-16'>
          <div className='max-w-md mx-auto text-center'>
            <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6'>
              <div className='flex items-center justify-center'>
                <FaUser className='h-5 w-5 mr-2' />
                <span className='font-bold'>Profile Updated Successfully!</span>
              </div>
            </div>
            <p className='text-gray-600 mb-6'>Your profile has been updated. You will be redirected to your profile.</p>
            <ButtonPrimary onClick={() => navigate('/profile')} className='w-full'>
              Go to Profile
            </ButtonPrimary>
          </div>
        </LayoutContainer>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <SEO
        title='Edit Profile - HypeMode Store'
        description='Edit your profile information'
        keywords='profile, edit, account, settings'
        url='/edit-profile'
      />
      <SecondaryHeader title='Edit Profile' />

      <LayoutContainer className='py-16'>
        <div className='max-w-2xl mx-auto'>
          <FormContainer title='Edit Profile' onSubmit={handleSubmit}>
            <div className='space-y-6'>
              {/* Personal Information */}
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
                  <FaUser className='mr-2 text-red-500' />
                  Personal Information
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormInput
                    label='Full Name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                    helperText='Your full name'
                  />
                  <FormInput
                    label='Email Address'
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    helperText='Your email address'
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
                  <FaPhone className='mr-2 text-red-500' />
                  Contact Information
                </h3>
                <div className='space-y-4'>
                  <FormInput
                    label='Phone Number'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    helperText='Your phone number (optional)'
                  />
                  <AddressAutocomplete
                    label='Address'
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    onCityChange={(city) => {
                      setFormData((prev) => ({ ...prev, city }));
                    }}
                    onPostalCodeChange={(postalCode) => {
                      setFormData((prev) => ({ ...prev, postalCode }));
                    }}
                    error={errors.address}
                    helperText='Start typing your address and select from suggestions'
                    placeholder='Start typing your address...'
                  />
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormInput
                      label='City'
                      name='city'
                      value={formData.city}
                      onChange={handleChange}
                      error={errors.city}
                      helperText='Your city (optional)'
                    />
                    <FormInput
                      label='Postal Code'
                      name='postalCode'
                      value={formData.postalCode}
                      onChange={handleChange}
                      error={errors.postalCode}
                      helperText='Your postal code (optional)'
                    />
                  </div>
                  <SelectInput
                    label='Country'
                    name='country'
                    value={formData.country}
                    onChange={handleChange}
                    options={COUNTRIES}
                    placeholder='Select your country'
                    error={errors.country}
                    helperText='Your country (optional)'
                    searchable={true}
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 mt-8'>
              <button
                type='submit'
                disabled={isSaving}
                className='flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors duration-200 flex items-center justify-center font-medium'
              >
                {isSaving ? (
                  <>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <FaSave className='h-4 w-4 mr-2' />
                    Update Profile
                  </>
                )}
              </button>
              <button
                type='button'
                onClick={handleCancel}
                className='flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center font-medium'
              >
                <FaTimes className='h-4 w-4 mr-2' />
                Cancel
              </button>
            </div>
          </FormContainer>
        </div>
      </LayoutContainer>
    </div>
  );
}
