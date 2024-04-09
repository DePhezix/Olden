import { createContext, useReducer } from "react";

import {createAction} from '../utils/reducer/reducer.utils'

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const subtractCartItem = (cartItems, productToSubtract) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToSubtract.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToSubtract.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToSubtract.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const removeCartItem = (cartItems, productToRemove) => cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);


export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  subtractItemfromCart: () => {},
  removeItemfromCart: () => {},
  cartTotal: 0,
  cartCount: 0,
});

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "setIsCartOpen",
  SET_CART_ITEMS: "setCartItems",
};

const INITIAL_STATE = {
  cartItems: [],
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
};

const handleReduce = (state, payload) => {
  return { ...state, ...payload };
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  const isActionCorrect = Object.values(CART_ACTION_TYPES).includes(type);
  if (!isActionCorrect)
    throw new Error(`Unhandled type ${type} in userReducer`);
  return handleReduce(state, payload);
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsinReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const payload = {
      cartItems: newCartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    };
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  };

  const addItemToCart = (itemToAdd) => {
    updateCartItemsinReducer(addCartItem(cartItems, itemToAdd));
  };
  const subtractItemfromCart = (itemToSubtract) => {
    updateCartItemsinReducer(subtractCartItem(cartItems, itemToSubtract));
  };
  const removeItemfromCart = (itemToRemove) => {
    updateCartItemsinReducer(removeCartItem(cartItems, itemToRemove));
  };

  const setisCartOpen = (bool) => {
    const payload = {
      isCartOpen: bool,
    };
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, payload));
  };

  const value = {
    isCartOpen,
    setisCartOpen,
    cartItems,
    addItemToCart,
    subtractItemfromCart,
    removeItemfromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
