import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import LayoutContainer from '../components/layout/LayoutContainer';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import FormContainer from '../components/features/FormContainer';
import FormInput from '../components/features/FormInput';
import ButtonPrimary from '../components/features/ButtonPrimary';
import SEO from '../components/SEO';
import { useFormValidation } from '../hooks/useFormValidation';
import { ERROR_MESSAGES } from '../constants/validation';

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { errors, validateAllFields } = useFormValidation({
    required: ['currentPassword', 'newPassword', 'confirmPassword'],
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { isValid } = validateAllFields(formData);

    if (!isValid) {
      setIsLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const { authAPI } = await import('../utils/api/apiService');
      
      await authAPI.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error) {
      console.error('Error changing password:', error);
      const errorMessage = error.response?.data?.message || 'Failed to change password. Please try again.';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div>
        <SEO
          title='Password Changed - HypeMode Store'
          description='Your password has been successfully changed'
          keywords='password, change, security'
          url='/change-password'
        />
        <SecondaryHeader title='Password Changed' />
        <LayoutContainer className='py-16'>
          <div className='max-w-md mx-auto text-center'>
            <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6'>
              <div className='flex items-center justify-center'>
                <FaLock className='h-5 w-5 mr-2' />
                <span className='font-bold'>Password Changed Successfully!</span>
              </div>
            </div>
            <p className='text-gray-600 mb-6'>
              Your password has been updated. You will be redirected to your profile.
            </p>
            <ButtonPrimary onClick={() => navigate('/profile')} className='w-full'>
              Go to Profile
            </ButtonPrimary>
          </div>
        </LayoutContainer>
      </div>
    );
  }

  return (
    <div>
      <SEO
        title='Change Password - HypeMode Store'
        description='Change your account password for security'
        keywords='password, change, security, account'
        url='/change-password'
      />
      <SecondaryHeader title='Change Password' />

      <LayoutContainer className='py-16'>
        <div className='max-w-md mx-auto'>
          <FormContainer title='Change Password' onSubmit={handleSubmit}>
            <div className='space-y-6'>
              {/* Current Password */}
              <FormInput
                label='Current Password'
                name='currentPassword'
                type='password'
                value={formData.currentPassword}
                onChange={handleChange}
                error={errors.currentPassword}
                required
                helperText='Enter your current password'
              />

              {/* New Password */}
              <FormInput
                label='New Password'
                name='newPassword'
                type='password'
                value={formData.newPassword}
                onChange={handleChange}
                error={errors.newPassword}
                required
                helperText='Min 8 characters, 1 uppercase (A-Z), 1 special (!@#$%^&*) - Example: MyPass@123'
                minLength='8'
              />

              {/* Confirm New Password */}
              <FormInput
                label='Confirm New Password'
                name='confirmPassword'
                type='password'
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
                helperText='Re-enter your new password'
              />
            </div>

            <div className='flex space-x-4 mt-8'>
              <ButtonPrimary type='submit' disabled={isLoading} className='flex-1 !mt-0'>
                {isLoading ? 'Updating...' : 'Update'}
              </ButtonPrimary>
              <button
                type='button'
                onClick={() => navigate('/profile')}
                className='flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-bold uppercase'
              >
                Cancel
              </button>
            </div>
          </FormContainer>
        </div>
      </LayoutContainer>
    </div>
  );
}
