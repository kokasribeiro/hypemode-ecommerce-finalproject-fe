import React from 'react';
import { FaMinus, FaPlus, FaTrash, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../../../../useCart';
import { useNavigate } from 'react-router-dom';

const CartDropdown = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, getCartTotal, calculateSalePrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
    onClose();
  };

  const handleOpenCart = () => {
    navigate('/cart');
    onClose();
  };

  const handleQuantityIncrease = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleQuantityDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className='fixed inset-0 z-40' onClick={onClose}></div>

      <div className='absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96'>
        <div className='p-4 border-b border-gray-200'>
          <h3 className='text-lg font-semibold text-gray-800'>Shopping Cart</h3>
        </div>

        <div className='max-h-64 overflow-y-auto'>
          {items.length === 0 ? (
            <div className='p-8 text-center'>
              <FaShoppingBag className='mx-auto text-4xl text-gray-300 mb-4' />
              <p className='text-gray-500'>Your cart is empty</p>
            </div>
          ) : (
            <div className='p-4 space-y-4'>
              {items.map((item) => {
                const itemPrice = calculateSalePrice(item);
                const itemTotal = (itemPrice * item.quantity).toFixed(2);

                return (
                  <div key={item.id} className='flex items-center space-x-3 bg-gray-50 p-3 rounded-lg'>
                    <div className='w-16 h-16 flex-shrink-0'>
                      <img src={item.image} alt={item.name} className='w-full h-full object-cover rounded-md' />
                    </div>

                    <div className='flex-1 min-w-0'>
                      <h4 className='text-sm font-medium text-gray-800 truncate'>{item.name}</h4>
                      <div className='flex items-center space-x-2 mt-1'>
                        {item.sale ? (
                          <>
                            <span className='text-red-600 text-sm font-bold'>€{itemPrice}</span>
                            <span className='text-gray-400 text-xs line-through'>€{item.price}</span>
                          </>
                        ) : (
                          <span className='text-gray-600 text-sm font-bold'>€{itemPrice}</span>
                        )}
                      </div>

                      <div className='flex items-center space-x-2 mt-2'>
                        <button
                          onClick={() => handleQuantityDecrease(item)}
                          className='w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors'
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus className='text-xs text-gray-600' />
                        </button>

                        <span className='text-sm font-medium min-w-[20px] text-center'>{item.quantity}</span>

                        <button
                          onClick={() => handleQuantityIncrease(item)}
                          className='w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors'
                        >
                          <FaPlus className='text-xs text-gray-600' />
                        </button>
                      </div>
                    </div>

                    <div className='flex flex-col items-end space-y-2'>
                      <span className='text-sm font-bold text-gray-800'>€{itemTotal}</span>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className='text-red-500 hover:text-red-700 transition-colors'
                        title='Remove item'
                      >
                        <FaTrash className='text-xs' />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className='p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg'>
            <div className='flex justify-between items-center mb-3'>
              <span className='text-lg font-semibold text-gray-800'>Total:</span>
              <span className='text-lg font-bold text-red-600'>€{getCartTotal()}</span>
            </div>

            <div className='space-y-2'>
              <button
                onClick={handleOpenCart}
                className='w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200'
              >
                Open Cart
              </button>

              <button
                onClick={handleCheckout}
                className='w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200'
              >
                Checkout
              </button>
            </div>
          </div>
        )}

        {items.length === 0 && (
          <div className='p-4 border-t border-gray-200'>
            <button
              onClick={handleOpenCart}
              className='w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200'
            >
              Open Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDropdown;
