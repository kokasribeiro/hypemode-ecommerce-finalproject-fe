import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toastError, toastLoginSuccess } from '../utils/toast';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import LayoutContainer from '../components/layout/LayoutContainer';
import FormInput from '../components/features/FormInput';
import FormContainer from '../components/features/FormContainer';
import ButtonPrimary from '../components/features/ButtonPrimary';
import SEO from '../components/SEO';
import { useFormValidation } from '../hooks/useFormValidation';
import { authAPI } from '../utils/api/apiService';
import { useCart } from '../contexts/CartContext';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { syncCartOnLogin } = useCart();

  const { errors, validateSingleField } = useFormValidation({
    required: ['email', 'password'],
  });

  // Load saved email if exists
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value) {
      validateSingleField(name, value, formData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      toastError('Email and password are required');
      setIsLoading(false);
      return;
    }

    try {
      // Login via backend API (with rememberMe flag)
      const response = await authAPI.login(formData.email, formData.password, rememberMe);

      if (response.success) {
        console.log('✅ Login successful:', response.data.user);

        // Wait a bit to ensure token is saved
        await new Promise((resolve) => setTimeout(resolve, 100));

        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        console.log(
          '🔍 Token after login:',
          savedToken ? 'EXISTS (' + savedToken.substring(0, 20) + '...)' : 'MISSING',
        );
        console.log('🔍 User after login:', savedUser ? 'EXISTS' : 'MISSING');

        // Save email if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
          localStorage.setItem('rememberMe', 'true');
          console.log('📧 Email saved for next login');
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberMe');
        }

        // Sincronizar carrinho do localStorage com o backend
        if (savedToken) {
          console.log('🛒 Starting cart sync...');
          try {
            await syncCartOnLogin();
            console.log('✅ Cart sync completed');
          } catch (error) {
            console.error('❌ Cart sync failed:', error);
            // Don't block login if cart sync fails
          }
        } else {
          console.warn('⚠️ Skipping cart sync - no token found');
        }

        // Final check before navigation
        const finalToken = localStorage.getItem('token');
        const finalUser = localStorage.getItem('user');

        if (finalToken && finalUser) {
          console.log('🎉 READY TO NAVIGATE - Token confirmed:', finalToken.substring(0, 20) + '...');
          // Show success and navigate
          toastLoginSuccess(navigate);
        } else {
          console.error('❌ CANNOT NAVIGATE - Token missing!');
          toastError('Login failed - please try again');
        }
      } else {
        toastError(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toastError(error.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const footerContent = (
    <p>
      Don't have an account?{' '}
      <Link to='/register' className='text-red-500 hover:underline'>
        Register here
      </Link>
    </p>
  );

  return (
    <div>
      <SEO
        title='Login - Access Your Account'
        description='Log in to your HypeMode Store account to access your orders, wishlist, and exclusive offers.'
        keywords='login, sign in, account, access, authentication, user'
        url='/login'
      />
      <SecondaryHeader title='Login' />

      <LayoutContainer className='py-16'>
        <FormContainer title='Sign In' onSubmit={handleSubmit} footerContent={footerContent}>
          <FormInput
            label='Email Address'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <FormInput
            label='Password'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <div className='flex items-center mb-6'>
            <input
              type='checkbox'
              id='rememberMe'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className='w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2 cursor-pointer'
            />
            <label htmlFor='rememberMe' className='ml-2 text-sm text-gray-700 cursor-pointer select-none'>
              Remember me (stay logged in for 30 days)
            </label>
          </div>

          <ButtonPrimary
            buttonText={isLoading ? 'LOGGING IN...' : 'LOGIN'}
            type='submit'
            className='w-full py-3'
            disabled={isLoading}
          />
        </FormContainer>
      </LayoutContainer>
    </div>
  );
}
