import React from 'react';
import { FaMinus, FaPlus, FaTrash, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import LayoutContainer from '../components/layout/LayoutContainer';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import SEO from '../components/SEO';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleQuantityIncrease = (item) => {
    updateQuantity(item.id, item.selectedSize, item.quantity + 1);
  };

  const handleQuantityDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.selectedSize, item.quantity - 1);
    }
  };

  const handleRemoveItem = (itemId, selectedSize) => {
    removeFromCart(itemId, selectedSize);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
    }
  };

  return (
    <>
      <SEO 
        title="Carrinho de Compras"
        description="Revise seus itens selecionados e finalize sua compra na HypeMode Store. Produtos de moda com entrega grátis e garantia de qualidade."
        keywords="carrinho, compras, checkout, finalizar compra, moda online"
        url="/cart"
      />
      <SecondaryHeader title='Shopping Cart' />
      <LayoutContainer>
        <div className='py-8 px-4 max-w-6xl mx-auto'>
          {cart.length === 0 ? (
            <div className='text-center py-16'>
              <FaShoppingBag className='mx-auto text-6xl text-gray-300 mb-6' />
              <h2 className='text-3xl font-bold text-gray-800 mb-4'>Your cart is empty</h2>
              <p className='text-gray-600 mb-8'>Add some amazing products to your cart!</p>
              <button
                onClick={handleContinueShopping}
                className='bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2'
              >
                <FaArrowLeft />
                <span>Continue Shopping</span>
              </button>
            </div>
          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <div className='lg:col-span-2'>
                <div className='flex justify-between items-center mb-6'>
                  <h2 className='text-2xl font-bold text-gray-800'>Cart Items ({cart.length})</h2>
                  <button
                    onClick={handleClearCart}
                    className='text-red-500 hover:text-red-700 font-medium transition-colors'
                  >
                    Clear Cart
                  </button>
                </div>

                <div className='space-y-4'>
                  {cart.map((item) => {
                    const itemPrice = item.sale ? Number(item.price) * 0.85 : Number(item.price);
                    const itemTotal = (itemPrice * item.quantity).toFixed(2);

                    return (
                      <div
                        key={`${item.id}-${item.selectedSize || 'no-size'}`}
                        className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'
                      >
                        <div className='flex items-center space-x-4'>
                          <div className='w-24 h-24 flex-shrink-0'>
                            <img src={item.image} alt={item.name} className='w-full h-full object-cover rounded-md' />
                          </div>

                          <div className='flex-1'>
                            <h3 className='text-lg font-semibold text-gray-800 mb-2'>{item.name}</h3>
                            {item.selectedSize && (
                              <div className='flex items-center space-x-2 mb-3'>
                                <span className='text-sm text-gray-600'>Size:</span>
                                <span className='px-3 py-1 bg-gray-100 rounded-md text-sm font-medium'>
                                  {item.selectedSize}
                                </span>
                              </div>
                            )}
                            <div className='flex items-center space-x-3 mb-3'>
                              {item.sale ? (
                                <>
                                  <span className='text-red-600 text-lg font-bold'>€{itemPrice.toFixed(2)}</span>
                                  <span className='text-gray-400 text-sm line-through'>€{item.price}</span>
                                  <span className='bg-red-100 text-red-600 px-2 py-1 text-xs font-semibold rounded'>
                                    SALE
                                  </span>
                                </>
                              ) : (
                                <span className='text-gray-800 text-lg font-bold'>€{itemPrice.toFixed(2)}</span>
                              )}
                            </div>

                            <div className='flex items-center justify-between'>
                              <div className='flex items-center space-x-3'>
                                <span className='text-sm font-medium text-gray-600'>Quantity:</span>
                                <div className='flex items-center space-x-2'>
                                  <button
                                    onClick={() => handleQuantityDecrease(item)}
                                    className='w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors'
                                    disabled={item.quantity <= 1}
                                  >
                                    <FaMinus className='text-sm text-gray-600' />
                                  </button>

                                  <span className='text-lg font-semibold min-w-[40px] text-center'>
                                    {item.quantity}
                                  </span>

                                  <button
                                    onClick={() => handleQuantityIncrease(item)}
                                    className='w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors'
                                  >
                                    <FaPlus className='text-sm text-gray-600' />
                                  </button>
                                </div>
                              </div>

                              <div className='text-right'>
                                <p className='text-sm text-gray-600'>Item total:</p>
                                <p className='text-xl font-bold text-gray-800'>€{itemTotal}</p>
                              </div>
                            </div>
                          </div>

                          <div className='flex-shrink-0'>
                            <button
                              onClick={() => handleRemoveItem(item.id, item.selectedSize)}
                              className='text-red-500 hover:text-red-700 p-2 rounded transition-colors'
                              title='Remove item'
                            >
                              <FaTrash className='text-lg' />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className='mt-8'>
                  <button
                    onClick={handleContinueShopping}
                    className='inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 font-medium transition-colors'
                  >
                    <FaArrowLeft />
                    <span>Continue Shopping</span>
                  </button>
                </div>
              </div>

              <div className='lg:col-span-1'>
                <div className='bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-4'>
                  <h3 className='text-xl font-bold text-gray-800 mb-6'>Order Summary</h3>

                  <div className='space-y-3 mb-6'>
                    <div className='flex justify-between text-gray-600'>
                      <span>
                        Subtotal ({cart.reduce((total, item) => total + item.quantity, 0)}{' '}
                        {cart.reduce((total, item) => total + item.quantity, 0) === 1 ? 'item' : 'items'}):
                      </span>
                      <span>€{Number(cartTotal).toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between text-gray-600'>
                      <span>Shipping:</span>
                      <span className='text-green-600 font-medium'>Free</span>
                    </div>
                    <hr className='border-gray-300' />
                    <div className='flex justify-between text-lg font-bold text-gray-800'>
                      <span>Total:</span>
                      <span className='text-red-600'>€{Number(cartTotal).toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className='w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mb-4'
                  >
                    Checkout
                  </button>

                  <div className='text-center text-sm text-gray-500'>
                    <p>✓ Free shipping nationwide</p>
                    <p>✓ 14 days for exchanges and returns</p>
                    <p>✓ 100% secure payment</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </LayoutContainer>
    </>
  );
};

export default Cart;
