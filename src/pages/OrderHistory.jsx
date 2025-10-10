import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaCalendar, FaBox, FaDollarSign, FaTrash } from 'react-icons/fa';
import { orderAPI } from '../utils/api/apiService';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingOrder, setDeletingOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await orderAPI.getMyOrders();
        console.log('Orders response:', response);

        if (response.success && response.data) {
          setOrders(response.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        console.error('Error details:', err.response?.data);
        setError(err.response?.data?.message || 'Failed to load order history');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      return;
    }

    setDeletingOrder(orderId);
    try {
      const response = await orderAPI.delete(orderId);
      if (response.success) {
        setOrders(orders.filter((order) => order.id !== orderId));
        toast.success('Order deleted successfully');
      } else {
        throw new Error(response.message || 'Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error(error.response?.data?.message || 'Failed to delete order');
    } finally {
      setDeletingOrder(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 py-12'>
        <SEO
          title='Order History'
          description='View your order history'
          keywords='order history, my orders, purchases'
        />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-red-600'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <SEO title='Order History' description='View your order history' keywords='order history, my orders, purchases' />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 flex items-center'>
            <FaShoppingBag className='mr-3 text-red-600' />
            Order History
          </h1>
          <p className='mt-2 text-gray-600'>View and track all your orders</p>
        </div>

        {error && <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6'>{error}</div>}

        {orders.length === 0 ? (
          <div className='bg-white rounded-lg shadow-sm p-12 text-center'>
            <FaShoppingBag className='mx-auto h-16 w-16 text-gray-400 mb-4' />
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>No orders yet</h3>
            <p className='text-gray-600 mb-6'>Start shopping to see your orders here</p>
            <button
              onClick={() => navigate('/products')}
              className='bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200'
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className='space-y-6'>
            {orders.map((order) => (
              <div key={order.id} className='bg-white rounded-lg shadow-sm overflow-hidden'>
                {/* Order Header */}
                <div className='bg-gray-50 px-6 py-4 border-b border-gray-200'>
                  <div className='flex flex-wrap items-center justify-between gap-4'>
                    <div className='flex items-center space-x-6'>
                      <div>
                        <p className='text-sm text-gray-600'>Order ID</p>
                        <p className='font-semibold text-gray-900'>#{order.id}</p>
                      </div>
                      <div className='flex items-center text-gray-600'>
                        <FaCalendar className='mr-2 h-4 w-4' />
                        <span className='text-sm'>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                    <div className='flex items-center space-x-4'>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <div className='text-right'>
                        <p className='text-sm text-gray-600'>Total</p>
                        <p className='text-lg font-bold text-gray-900'>€{Number(order.total).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className='px-6 py-4'>
                  <div className='space-y-4'>
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item, index) => (
                        <div key={index} className='flex items-center space-x-4'>
                          <div className='flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden'>
                            {item.image || item.Product?.image ? (
                              <img
                                src={item.image || item.Product?.image}
                                alt={item.name || item.Product?.name || 'Product'}
                                className='w-full h-full object-cover'
                              />
                            ) : (
                              <div className='w-full h-full flex items-center justify-center'>
                                <FaBox className='h-8 w-8 text-gray-400' />
                              </div>
                            )}
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='text-sm font-medium text-gray-900 truncate'>
                              {item.name || item.Product?.name || 'Product'}
                            </p>
                            <p className='text-sm text-gray-600'>
                              Quantity: {item.quantity} × €{Number(item.price).toFixed(2)}
                            </p>
                            {item.size && <p className='text-xs text-gray-500'>Size: {item.size}</p>}
                          </div>
                          <div className='text-right'>
                            <p className='text-sm font-semibold text-gray-900'>
                              €{(item.quantity * Number(item.price)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className='text-sm text-gray-600'>No items in this order</p>
                    )}
                  </div>
                </div>

                {/* Order Footer */}
                <div className='bg-gray-50 px-6 py-4 border-t border-gray-200'>
                  <div className='flex justify-between items-center'>
                    <div className='text-sm text-gray-600'>
                      <p>
                        <span className='font-medium'>Shipping Address:</span>{' '}
                        {order.shippingAddress?.street || 'Not provided'}
                      </p>
                    </div>
                    <div className='flex items-center'>
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          disabled={deletingOrder === order.id}
                          className='flex items-center text-red-600 hover:text-red-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                          {deletingOrder === order.id ? (
                            <>
                              <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2'></div>
                              Deleting...
                            </>
                          ) : (
                            <>
                              <FaTrash className='mr-2 h-4 w-4' />
                              Delete
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
