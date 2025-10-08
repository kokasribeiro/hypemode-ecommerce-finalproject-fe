import React, { useState } from 'react';
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
  const navigate = useNavigate();
  const { syncCartOnLogin } = useCart();

  const { errors, validateSingleField } = useFormValidation({
    required: ['email', 'password']
  });

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
      // Login via backend API
      const response = await authAPI.login(formData.email, formData.password);
      
      if (response.success) {
        console.log('✅ Login successful:', response.data.user);
        
        // Sincronizar carrinho do localStorage com o backend
        await syncCartOnLogin();
        
        // Show success and navigate
        toastLoginSuccess(navigate);
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
        <FormContainer
          title='Sign In'
          onSubmit={handleSubmit}
          footerContent={footerContent}
        >
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
