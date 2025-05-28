import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import LayoutContainer from '../components/layout/LayoutContainer';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isLoggedIn) {
      timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer);
            navigate('/');
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when typing in password field
    if (name === 'password') {
      setPasswordError('');
    }
  };

  const validatePassword = (password) => {
    const hasMinimumLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    if (!hasMinimumLength) {
      return 'Password must be at least 8 characters long';
    }
    if (!hasUppercase) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }

    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validatePassword(formData.password);
    if (error) {
      setPasswordError(error);
      return;
    }

    console.log('Login attempt with:', formData);
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
        <div className='bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full'>
          <h2 className='text-2xl font-bold mb-4 text-black'>You are logged in!</h2>
          <div className='flex justify-center mb-4 relative'>
            <div className='dots-container'>
              {/* Static dots forming a circle */}
              {[...Array(12)].map((_, index) => {
                const angle = (index * 30 * Math.PI) / 180;
                const left = Math.cos(angle) * 60;
                const top = Math.sin(angle) * 60;
                return (
                  <div
                    key={index}
                    className='static-dot'
                    style={{
                      transform: `translate(${left}px, ${top}px)`,
                    }}
                  ></div>
                );
              })}

              {/* Big dot spinning around */}
              <div className='spinning-dot'></div>
            </div>
          </div>

          <style>
            {`
              .dots-container {
                position: relative;
                width: 150px;
                height: 150px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              
              .static-dot {
                position: absolute;
                width: 8px;
                height: 8px;
                background-color: #666;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                margin: -4px;
              }
              
              .spinning-dot {
                position: absolute;
                width: 16px;
                height: 16px;
                background-color: #e74c3c;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                margin: -8px;
                transform-origin: center;
                animation: spinAround 3s linear infinite;
              }
              
              @keyframes spinAround {
                from {
                  transform: rotate(0deg) translateX(60px) rotate(0deg);
                }
                to {
                  transform: rotate(360deg) translateX(60px) rotate(-360deg);
                }
              }
            `}
          </style>

          <p className='text-gray-600'>Redirecting to home page in {countdown} seconds...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SecondaryHeader title='Login' />

      <LayoutContainer className='py-16'>
        <div className='max-w-md mx-auto bg-white p-8 shadow-md rounded-md'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Sign In</h2>

          <form onSubmit={handleSubmit}>
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
                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
                required
              />
            </div>

            <div className='mb-6'>
              <label htmlFor='password' className='block text-gray-700 mb-2'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-3 border ${
                  passwordError ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                required
              />
              {passwordError && <p className='text-red-500 text-sm mt-1'>{passwordError}</p>}
            </div>

            <button
              type='submit'
              className='w-full py-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors'
            >
              LOGIN
            </button>
          </form>

          <div className='mt-6 text-center text-gray-600'>
            <p>
              Don't have an account?{' '}
              <Link to='/register' className='text-red-500 hover:underline'>
                Register here
              </Link>
            </p>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
}
