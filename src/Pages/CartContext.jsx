import React, { createContext, useReducer, useEffect } from 'react';

const CartActionTypes = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM: {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case CartActionTypes.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id ? { ...item, quantity: Math.max(0, action.payload.quantity) } : item,
          )
          .filter((item) => item.quantity > 0),
      };

    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    case CartActionTypes.LOAD_CART:
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};

const initialState = {
  items: [],
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CartActionTypes.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Erro ao carregar carrinho do localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const calculateSalePrice = (product) => {
    if (!product.sale) return product.price;
    const productIdNumber = parseInt(product.id, 10);
    const discountBase = productIdNumber ? (productIdNumber % 11) / 100 + 0.1 : 0.15;
    const discountedPrice = product.price * (1 - discountBase);
    return Number(discountedPrice.toFixed(2));
  };

  const getCartTotal = () => {
    return state.items
      .reduce((total, item) => {
        const price = calculateSalePrice(item);
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const addItem = (product) => {
    dispatch({ type: CartActionTypes.ADD_ITEM, payload: product });
  };

  const removeItem = (productId) => {
    dispatch({ type: CartActionTypes.REMOVE_ITEM, payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: CartActionTypes.UPDATE_QUANTITY, payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CartActionTypes.CLEAR_CART });
  };

  const value = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    calculateSalePrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
