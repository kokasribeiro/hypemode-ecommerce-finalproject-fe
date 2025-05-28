import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import LayoutContainer from '../components/layout/LayoutContainer';

const addShakeAnimationStyle = () => {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .shake-animation {
      animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      }`;

  document.head.appendChild(styleEl);
  return () => {
    document.head.removeChild(styleEl);
  };
};

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [generalError, setGeneralError] = useState('');

  React.useEffect(() => {
    return addShakeAnimationStyle();
  }, []);

  const inputRefs = {
    firstName: useRef(),
    lastName: useRef(),
    dateOfBirth: useRef(),
    email: useRef(),
    username: useRef(),
    password: useRef(),
    confirmPassword: useRef(),
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
    const hasMinLength = password.length >= 8;

    if (!hasMinLength) {
      return 'Password must be at least 8 characters';
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }

    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    if (generalError) {
      setGeneralError('');
    }

    if (name === 'password') {
      const passwordError = validatePassword(value);
      setErrors((prev) => ({ ...prev, password: passwordError }));

      if (formData.confirmPassword && value !== formData.confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else if (formData.confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: null }));
      }
    }

    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: null }));
      }
    }

    if (name === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setErrors((prev) => ({ ...prev, email: null }));
      }
    }

    if (name === 'dateOfBirth' && value) {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      const isBeforeBirthday = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate());
      const calculatedAge = isBeforeBirthday ? age - 1 : age;

      if (calculatedAge < 16) {
        setErrors((prev) => ({ ...prev, dateOfBirth: 'You must be at least 16 years old to register' }));
      } else {
        setErrors((prev) => ({ ...prev, dateOfBirth: null }));
      }
    }
  };

  const applyShakeAnimation = (fieldName) => {
    if (inputRefs[fieldName] && inputRefs[fieldName].current) {
      const element = inputRefs[fieldName].current;
      element.classList.add('shake-animation');
      setTimeout(() => {
        element.classList.remove('shake-animation');
      }, 500);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'email', 'username', 'password', 'confirmPassword'];
    const emptyFields = [];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
        emptyFields.push(field);
        isValid = false;
      }
    });

    if (formData.password) {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
        isValid = false;
      }
    }

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
    }

    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      const isBeforeBirthday = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate());
      const calculatedAge = isBeforeBirthday ? age - 1 : age;

      if (calculatedAge < 16) {
        newErrors.dateOfBirth = 'You must be at least 16 years old to register';
        isValid = false;
      }
    }

    setErrors(newErrors);
    Object.keys(newErrors).forEach((fieldName) => {
      applyShakeAnimation(fieldName);
    });

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneralError('');

    if (validateForm()) {
      console.log('Registration attempt with:', formData);
      setRegistrationSuccess(true);
    } else {
      setGeneralError('Please fill all the required details and correct any errors.');
    }
  };

  const handleStartNavigate = () => {
    navigate('/');
  };

  return (
    <div>
      <SecondaryHeader title='Create Account' />

      <LayoutContainer className='py-16'>
        {registrationSuccess ? (
          <div className='max-w-md mx-auto bg-white p-8 shadow-md rounded-md text-center'>
            <div className='mb-6'>
              <h2 className='text-2xl font-bold text-green-600'>Your account was created!</h2>
              <p className='text-gray-600 mt-3'>Thank you for registering with us.</p>
            </div>
            <button
              onClick={handleStartNavigate}
              className='w-full py-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors'
            >
              START NAVIGATE
            </button>
          </div>
        ) : (
          <div className='max-w-md mx-auto bg-white p-8 shadow-md rounded-md'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>

            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-2 gap-4 mb-4'>
                <div>
                  <label htmlFor='firstName' className='block text-gray-700 mb-2'>
                    First Name
                  </label>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    ref={inputRefs.firstName}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.firstName && <p className='text-red-500 text-sm mt-1'>{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor='lastName' className='block text-gray-700 mb-2'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    ref={inputRefs.lastName}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.lastName && <p className='text-red-500 text-sm mt-1'>{errors.lastName}</p>}
                </div>
              </div>

              <div className='mb-4'>
                <label htmlFor='dateOfBirth' className='block text-gray-700 mb-2'>
                  Date of Birth
                </label>
                <input
                  type='date'
                  id='dateOfBirth'
                  name='dateOfBirth'
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  ref={inputRefs.dateOfBirth}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  style={{ colorScheme: 'light' }}
                />
                {errors.dateOfBirth && <p className='text-red-500 text-sm mt-1'>{errors.dateOfBirth}</p>}
              </div>

              <div className='mb-4'>
                <label htmlFor='email' className='block text-gray-700 mb-2'>
                  Email Address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  ref={inputRefs.email}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
              </div>

              <div className='mb-4'>
                <label htmlFor='username' className='block text-gray-700 mb-2'>
                  Username
                </label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  ref={inputRefs.username}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.username && <p className='text-red-500 text-sm mt-1'>{errors.username}</p>}
              </div>

              <div className='mb-4'>
                <label htmlFor='password' className='block text-gray-700 mb-2'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  ref={inputRefs.password}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  minLength='8'
                />
                <p className='text-gray-600 text-sm mt-1'>
                  Password must have minimum 8 characters, 1 uppercase letter, and 1 special character
                </p>
                {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}
              </div>

              <div className='mb-6'>
                <label htmlFor='confirmPassword' className='block text-gray-700 mb-2'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  ref={inputRefs.confirmPassword}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  minLength='8'
                />
                {errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword}</p>}
              </div>

              <button
                type='submit'
                className='w-full py-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors'
              >
                CREATE ACCOUNT
              </button>

              {generalError && <p className='text-red-500 text-sm mt-3 text-center font-medium'>{generalError}</p>}
            </form>

            <div className='mt-6 text-center text-gray-600'>
              <p>
                Already have an account?{' '}
                <Link to='/login' className='text-red-500 hover:underline'>
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        )}
      </LayoutContainer>
    </div>
  );
}
