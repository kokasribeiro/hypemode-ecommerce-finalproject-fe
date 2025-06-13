import React, { useCallback } from 'react';
import { FaMinus, FaPlus, FaTrash, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDropdown = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = useCallback(() => {
    onClose();
    navigate('/checkout');
  }, [onClose, navigate]);

  const handleOpenCart = useCallback(() => {
    onClose();
    navigate('/cart');
  }, [onClose, navigate]);

  const handleQuantityIncrease = useCallback(
    (item) => {
      updateQuantity(item.id, item.selectedSize, item.quantity + 1);
    },
    [updateQuantity],
  );

  const handleQuantityDecrease = useCallback(
    (item) => {
      if (item.quantity > 1) {
        updateQuantity(item.id, item.selectedSize, item.quantity - 1);
      }
    },
    [updateQuantity],
  );

  const handleRemoveItem = useCallback(
    (item) => {
      removeFromCart(item.id, item.selectedSize);
    },
    [removeFromCart],
  );

  if (!isOpen) return null;

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 top-20 mt-2 w-full max-w-sm md:absolute md:right-0 md:left-auto md:translate-x-0 md:top-full md:w-96 bg-white shadow-xl rounded-lg border border-gray-200 z-50 transform transition-all duration-300 ${
        isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className='p-4 max-h-96 flex flex-col'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-bold text-black'>Shopping Cart</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
            <span className='sr-only'>Close cart</span>×
          </button>
        </div>

        <div className='flex-1 overflow-y-auto max-h-64'>
          {cart.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-8'>
              <FaShoppingBag className='text-3xl text-gray-300 mb-3' />
              <p className='text-black text-sm'>Your cart is empty</p>
            </div>
          ) : (
            <div className='space-y-3'>
              {cart.map((item) => {
                const itemPrice = item.sale ? Number(item.price) * 0.85 : Number(item.price);
                const itemTotal = (itemPrice * item.quantity).toFixed(2);

                return (
                  <div
                    key={`${item.id}-${item.selectedSize}`}
                    className='flex items-center space-x-3 border-b pb-3 last:border-b-0'
                  >
                    <img src={item.image} alt={item.name} className='w-16 h-16 object-cover rounded' />
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-medium text-sm truncate text-black'>{item.name}</h3>
                      <p className='text-xs text-black'>Size: {item.selectedSize}</p>
                      <div className='flex items-center mt-1'>
                        <button onClick={() => handleQuantityDecrease(item)} className='p-1 hover:bg-gray-100 rounded'>
                          <FaMinus className='w-2 h-2' />
                        </button>
                        <span className='mx-2 text-sm text-black'>{item.quantity}</span>
                        <button onClick={() => handleQuantityIncrease(item)} className='p-1 hover:bg-gray-100 rounded'>
                          <FaPlus className='w-2 h-2' />
                        </button>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium text-sm text-black'>€{itemTotal}</p>
                      <button onClick={() => handleRemoveItem(item)} className='text-red-500 hover:text-red-700 mt-1'>
                        <FaTrash className='w-3 h-3' />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className='border-t pt-3 mt-3'>
            <div className='flex justify-between items-center mb-3'>
              <span className='font-medium text-black'>Total:</span>
              <span className='text-lg font-bold text-red-600'>€{Number(cartTotal).toFixed(2)}</span>
            </div>
            <div className='space-y-2'>
              <button
                onClick={handleOpenCart}
                className='w-full py-2 px-4 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-colors'
              >
                View Cart
              </button>
              <button
                onClick={handleCheckout}
                className='w-full py-2 px-4 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors'
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
