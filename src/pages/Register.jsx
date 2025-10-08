import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import LayoutContainer from '../components/layout/LayoutContainer';
import FormInput from '../components/features/FormInput';
import FormContainer from '../components/features/FormContainer';
import SuccessMessage from '../components/features/SuccessMessage';
import ButtonPrimary from '../components/features/ButtonPrimary';
import SEO from '../components/SEO';
import { useFormValidation } from '../hooks/useFormValidation';
import { useShakeAnimation } from '../hooks/useShakeAnimation';
import { FORM_FIELDS, ERROR_MESSAGES } from '../data';
import { authAPI } from '../utils/api/apiService';
import { useCart } from '../contexts/CartContext';
import { toastError } from '../utils/toast';

export default function Register() {
  const navigate = useNavigate();
  const { syncCartOnLogin } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { triggerShakeByRef } = useShakeAnimation();
  const { errors, validateSingleField, validateAllFields } = useFormValidation({
    required: FORM_FIELDS.REQUIRED_REGISTRATION_FIELDS
  });

  const inputRefs = {
    firstName: useRef(),
    lastName: useRef(),
    dateOfBirth: useRef(),
    email: useRef(),
    username: useRef(),
    password: useRef(),
    confirmPassword: useRef(),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value) {
      validateSingleField(name, value, { ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setIsLoading(true);

    const { isValid, errors: validationErrors } = validateAllFields(formData);

    if (!isValid) {
      Object.keys(validationErrors).forEach((fieldName) => {
        if (inputRefs[fieldName]) {
          triggerShakeByRef(inputRefs[fieldName]);
        }
      });
      setGeneralError(ERROR_MESSAGES.FORM_VALIDATION_ERROR);
      setIsLoading(false);
      return;
    }

    try {
      // Register via backend API
      const response = await authAPI.register({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        phone: '', // Campo opcional
        address: '',
        city: '',
        postalCode: '',
        country: '',
      });

      if (response.success) {
        console.log('✅ Registration successful:', response.data.user);
        
        // Sincronizar carrinho do localStorage com o backend
        await syncCartOnLogin();
        
        setRegistrationSuccess(true);
      } else {
        toastError(response.message || 'Registration failed');
        setGeneralError(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.message || 'Failed to create account. Please try again.';
      toastError(errorMessage);
      setGeneralError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNavigate = () => {
    navigate('/');
  };

  const footerContent = (
    <p>
      Already have an account?{' '}
      <Link to='/login' className='text-red-500 hover:underline'>
        Sign in
      </Link>
    </p>
  );

  if (registrationSuccess) {
    return (
      <div>
        <SEO 
          title="Create Account - Register"
          description="Create your HypeMode Store account and get access to exclusive offers, order history, and a personalized shopping experience."
          keywords="register, create account, sign up, new user, subscribe"
          url="/register"
        />
        <SecondaryHeader title='Create Account' />
        <LayoutContainer className='py-16'>
          <SuccessMessage
            title="Your account was created!"
            message="Thank you for registering with us."
            buttonText="START NAVIGATE"
            onButtonClick={handleStartNavigate}
            variant="centered"
          />
        </LayoutContainer>
      </div>
    );
  }

  return (
    <div>
      <SEO 
        title="Create Account - Register"
        description="Create your HypeMode Store account and get access to exclusive offers, order history, and a personalized shopping experience."
        keywords="register, create account, sign up, new user, subscribe"
        url="/register"
      />
      <SecondaryHeader title='Create Account' />

      <LayoutContainer className='py-16'>
        <FormContainer
          title='Register'
          onSubmit={handleSubmit}
          footerContent={footerContent}
        >
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <FormInput
              label='First Name'
              name='firstName'
              ref={inputRefs.firstName}
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              required
              className='mb-0'
            />

            <FormInput
              label='Last Name'
              name='lastName'
              ref={inputRefs.lastName}
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              required
              className='mb-0'
            />
          </div>

          <FormInput
            label='Date of Birth'
            name='dateOfBirth'
            type='date'
            ref={inputRefs.dateOfBirth}
            value={formData.dateOfBirth}
            onChange={handleChange}
            error={errors.dateOfBirth}
            required
            inputClassName='color-scheme-light'
          />

          <FormInput
            label='Email Address'
            name='email'
            type='email'
            ref={inputRefs.email}
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <FormInput
            label='Username'
            name='username'
            ref={inputRefs.username}
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            required
          />

          <FormInput
            label='Password'
            name='password'
            type='password'
            ref={inputRefs.password}
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            helperText='Password must have minimum 8 characters, 1 uppercase letter, and 1 special character'
            minLength='8'
          />

          <FormInput
            label='Confirm Password'
            name='confirmPassword'
            type='password'
            ref={inputRefs.confirmPassword}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
            minLength='8'
            className='mb-6'
          />

          <ButtonPrimary
            buttonText={isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            type='submit'
            className='w-full py-3'
            disabled={isLoading}
          />

          {generalError && (
            <p className='text-red-500 text-sm mt-3 text-center font-medium'>
              {generalError}
            </p>
          )}
        </FormContainer>
      </LayoutContainer>
    </div>
  );
}
