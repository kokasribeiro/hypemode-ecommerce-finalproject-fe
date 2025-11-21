import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI, authAPI } from '../utils/api/apiService';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = authAPI.isAuthenticated();

  useEffect(() => {
    loadCart();
  }, []);

  // Load cart from backend (if authenticated) or localStorage
  const loadCart = async () => {
    try {
      if (isAuthenticated) {
        const response = await cartAPI.get();
        const backendCart = response.data || [];
        const transformedCart = backendCart.map((item) => ({
          id: item.Product.id,
          name: item.Product.name,
          price: parseFloat(item.Product.price),
          image: item.Product.image,
          quantity: item.quantity,
          selectedSize: item.size,
          color: item.color,
          discount: item.Product.discount,
          discountPercentage: item.Product.discountPercentage,
          stock: item.Product.stock,
        }));
        setCart(transformedCart);
      } else {
        const savedCart = localStorage.getItem('cart');
        setCart(savedCart ? JSON.parse(savedCart) : []);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      const savedCart = localStorage.getItem('cart');
      setCart(savedCart ? JSON.parse(savedCart) : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, isAuthenticated, loading]);

  const addToCart = async (product, selectedSize) => {
    try {
      if (isAuthenticated) {
        await cartAPI.add(product.id, 1, selectedSize, null);
        await loadCart();
      } else {
        setCart((currentCart) => {
          const existingItemIndex = currentCart.findIndex(
            (item) => item.id === product.id && item.selectedSize === selectedSize,
          );

          if (existingItemIndex >= 0) {
            const newCart = [...currentCart];
            newCart[existingItemIndex] = {
              ...newCart[existingItemIndex],
              quantity: newCart[existingItemIndex].quantity + 1,
            };
            return newCart;
          }

          return [...currentCart, { ...product, quantity: 1, selectedSize }];
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setCart((currentCart) => {
        const existingItemIndex = currentCart.findIndex(
          (item) => item.id === product.id && item.selectedSize === selectedSize,
        );

        if (existingItemIndex >= 0) {
          const newCart = [...currentCart];
          newCart[existingItemIndex] = {
            ...newCart[existingItemIndex],
            quantity: newCart[existingItemIndex].quantity + 1,
          };
          return newCart;
        }

        return [...currentCart, { ...product, quantity: 1, selectedSize }];
      });
    }
  };

  const removeFromCart = async (productId, selectedSize) => {
    try {
      if (isAuthenticated) {
        // Find the cart item ID from backend
        const response = await cartAPI.get();
        const backendCart = response.data || [];
        const cartItem = backendCart.find(
          (item) => item.Product.id === productId && item.size === selectedSize,
        );

        if (cartItem) {
          await cartAPI.remove(cartItem.id);
          await loadCart();
        }
      } else {
        // Remove from localStorage
        setCart((currentCart) =>
          currentCart.filter((item) => !(item.id === productId && item.selectedSize === selectedSize)),
        );
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      // Fallback to localStorage
      setCart((currentCart) =>
        currentCart.filter((item) => !(item.id === productId && item.selectedSize === selectedSize)),
      );
    }
  };

  const updateQuantity = async (productId, selectedSize, newQuantity) => {
    try {
      if (isAuthenticated) {
        // Find the cart item ID from backend
        const response = await cartAPI.get();
        const backendCart = response.data || [];
        const cartItem = backendCart.find(
          (item) => item.Product.id === productId && item.size === selectedSize,
        );

        if (cartItem) {
          if (newQuantity <= 0) {
            await cartAPI.remove(cartItem.id);
          } else {
            await cartAPI.update(cartItem.id, newQuantity);
          }
          await loadCart();
        }
      } else {
        // Update localStorage
        setCart((currentCart) =>
          currentCart.map((item) =>
            item.id === productId && item.selectedSize === selectedSize
              ? { ...item, quantity: Math.max(0, newQuantity) }
              : item,
          ),
        );
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      // Fallback to localStorage
      setCart((currentCart) =>
        currentCart.map((item) =>
          item.id === productId && item.selectedSize === selectedSize
            ? { ...item, quantity: Math.max(0, newQuantity) }
            : item,
        ),
      );
    }
  };

  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        await cartAPI.clear();
      }
      setCart([]);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error clearing cart:', error);
      setCart([]);
      localStorage.removeItem('cart');
    }
  };

  const syncCartOnLogin = async () => {
    try {
      // Get local cart
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');

      if (localCart.length > 0) {
        // Add local items to backend
        for (const item of localCart) {
          await cartAPI.add(item.id, item.quantity, item.selectedSize, null);
        }
        // Clear local cart
        localStorage.removeItem('cart');
      }

      // Load cart from backend
      await loadCart();
    } catch (error) {
      console.error('Error syncing cart on login:', error);
    }
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        syncCartOnLogin,
        cartTotal,
        cartItemCount,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
