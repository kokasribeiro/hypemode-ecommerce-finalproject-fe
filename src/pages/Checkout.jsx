import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaLock, FaShoppingBag, FaCheckCircle } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { orderAPI } from '../utils/api/apiService';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [formData, setFormData] = useState({
    // Shipping Information
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',

    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',

    // Additional
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      toast.error('Please log in to complete your purchase');
      navigate('/login');
      return;
    }

    if (userData) {
      try {
        const user = JSON.parse(userData);
        setFormData((prev) => ({
          ...prev,
          fullName: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          address: user.address || '',
          city: user.city || '',
          postalCode: user.postalCode || '',
          country: user.country || '',
        }));
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  }, [navigate]);

  useEffect(() => {
    // Redirect if cart is empty
    if (cart.length === 0 && !orderComplete) {
      navigate('/cart');
    }
  }, [cart, navigate, orderComplete]);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = item.discount ? item.price * (1 - item.discountPercentage / 100) : item.price;
      return total + price * item.quantity;
    }, 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.1; // 10% tax
  };

  const calculateShipping = () => {
    return 5.0; // Flat shipping rate
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const shipping = calculateShipping();
    return subtotal + tax + shipping;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Shipping validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    // Payment validation
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';

    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Format: MM/YY';
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    setLoading(true);

    try {
      // Prepare order data
      const subtotal = calculateSubtotal();
      const tax = calculateTax(subtotal);
      const shipping = calculateShipping();
      const total = subtotal + tax + shipping;

      const orderData = {
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.discount ? item.price * (1 - item.discountPercentage / 100) : item.price,
          size: item.selectedSize || undefined,
          color: item.selectedColor || undefined,
        })),
        subtotal,
        tax,
        shipping,
        total,
        shippingAddress: {
          name: formData.fullName,
          street: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
        },
        billingAddress: {
          name: formData.fullName,
          street: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentMethod: 'credit_card',
        notes: formData.notes || null,
      };

      // Create order
      const response = await orderAPI.create(orderData);

      if (response.success) {
        setOrderId(response.data.id);
        setOrderComplete(true);
        clearCart();
        toast.success('Order placed successfully!');
      } else {
        throw new Error(response.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response?.data);

      if (error.response?.status === 401) {
        toast.error('Your session has expired. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else if (error.response?.status === 400) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error?.message ||
          'Please check your information and try again.';
        toast.error(errorMessage);
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error?.message ||
          'Failed to process order. Please try again.';
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  // Order Complete Screen
  if (orderComplete) {
    return (
      <div className='min-h-screen bg-gray-50 py-12'>
        <SEO title='Order Complete' description='Your order has been placed successfully' />
        <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-white rounded-lg shadow-lg p-8 text-center'>
            <div className='mb-6'>
              <FaCheckCircle className='mx-auto h-20 w-20 text-green-500' />
            </div>
            <h1 className='text-3xl font-bold text-gray-900 mb-4'>Order Complete!</h1>
            <p className='text-lg text-gray-600 mb-2'>Thank you for your purchase</p>
            <p className='text-sm text-gray-500 mb-8'>Order #{orderId} has been placed successfully</p>

            <div className='bg-green-50 border border-green-200 rounded-lg p-4 mb-8'>
              <p className='text-sm text-green-800'>
                A confirmation email has been sent to <strong>{formData.email}</strong>
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button
                onClick={() => navigate('/order-history')}
                className='bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium'
              >
                View Order History
              </button>
              <button
                onClick={() => navigate('/products')}
                className='bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium'
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Checkout Form
  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <SEO title='Checkout' description='Complete your purchase' keywords='checkout, payment, order' />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>Checkout</h1>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Checkout Form */}
          <div className='lg:col-span-2'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Shipping Information */}
              <div className='bg-white rounded-lg shadow-sm p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4 flex items-center'>
                  <FaShoppingBag className='mr-2 text-red-600' />
                  Shipping Information
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Full Name <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      name='fullName'
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='John Doe'
                    />
                    {errors.fullName && <p className='mt-1 text-sm text-red-600'>{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Email <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='john@example.com'
                    />
                    {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email}</p>}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Phone <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='+1 234 567 8900'
                    />
                    {errors.phone && <p className='mt-1 text-sm text-red-600'>{errors.phone}</p>}
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Address <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      name='address'
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='123 Main Street'
                    />
                    {errors.address && <p className='mt-1 text-sm text-red-600'>{errors.address}</p>}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      City <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='New York'
                    />
                    {errors.city && <p className='mt-1 text-sm text-red-600'>{errors.city}</p>}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Postal Code <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      name='postalCode'
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.postalCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='10001'
                    />
                    {errors.postalCode && <p className='mt-1 text-sm text-red-600'>{errors.postalCode}</p>}
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Country <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      name='country'
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.country ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='United States'
                    />
                    {errors.country && <p className='mt-1 text-sm text-red-600'>{errors.country}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className='bg-white rounded-lg shadow-sm p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4 flex items-center'>
                  <FaCreditCard className='mr-2 text-red-600' />
                  Payment Information
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Card Number <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      name='cardNumber'
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='1234 5678 9012 3456'
                      maxLength='19'
                    />
                    {errors.cardNumber && <p className='mt-1 text-sm text-red-600'>{errors.cardNumber}</p>}
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Cardholder Name <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      name='cardName'
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.cardName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='John Doe'
                    />
                    {errors.cardName && <p className='mt-1 text-sm text-red-600'>{errors.cardName}</p>}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Expiry Date <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      name='expiryDate'
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='MM/YY'
                      maxLength='5'
                    />
                    {errors.expiryDate && <p className='mt-1 text-sm text-red-600'>{errors.expiryDate}</p>}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      CVV <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      name='cvv'
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.cvv ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='123'
                      maxLength='4'
                    />
                    {errors.cvv && <p className='mt-1 text-sm text-red-600'>{errors.cvv}</p>}
                  </div>
                </div>

                <div className='mt-4 flex items-center text-sm text-gray-600'>
                  <FaLock className='mr-2 text-green-600' />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>

              {/* Order Notes */}
              <div className='bg-white rounded-lg shadow-sm p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>Order Notes (Optional)</h2>
                <textarea
                  name='notes'
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows='3'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500'
                  placeholder='Any special instructions for your order...'
                />
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={loading}
                className='w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors duration-200 font-semibold text-lg flex items-center justify-center'
              >
                {loading ? (
                  <>
                    <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3'></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaLock className='mr-2' />
                    Pay Now €{calculateTotal().toFixed(2)}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-sm p-6 sticky top-4'>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>Order Summary</h2>

              <div className='space-y-4 mb-6'>
                {cart.map((item) => {
                  const price = item.discount ? item.price * (1 - item.discountPercentage / 100) : item.price;
                  return (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className='flex space-x-3'>
                      <img src={item.image} alt={item.name} className='w-16 h-16 object-cover rounded-lg' />
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-gray-900 truncate'>{item.name}</p>
                        <p className='text-xs text-gray-600'>Qty: {item.quantity}</p>
                        {item.selectedSize && <p className='text-xs text-gray-600'>Size: {item.selectedSize}</p>}
                      </div>
                      <p className='text-sm font-semibold text-gray-900'>€{(price * item.quantity).toFixed(2)}</p>
                    </div>
                  );
                })}
              </div>

              <div className='border-t border-gray-200 pt-4 space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Subtotal</span>
                  <span className='font-medium text-gray-900'>€{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Tax (10%)</span>
                  <span className='font-medium text-gray-900'>€{calculateTax(calculateSubtotal()).toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Shipping</span>
                  <span className='font-medium text-gray-900'>€{calculateShipping().toFixed(2)}</span>
                </div>
                <div className='border-t border-gray-200 pt-2 flex justify-between'>
                  <span className='text-lg font-semibold text-gray-900'>Total</span>
                  <span className='text-lg font-bold text-red-600'>€{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
