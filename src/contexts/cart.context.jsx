import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  const isItemInCart = cartItems.find((item) => item.id === productToAdd.id);

  if (isItemInCart) {
    return cartItems.map((item) => (item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item));
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const decreaseCartItem = (cartItems, productToDecrease) => {
  return cartItems
    .map((item) => {
      if (item.id === productToDecrease.id) {
        return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    })
    .filter((item) => item.quantity > 0);
};

const deleteCartItem = (cartItems, productToDelete) => {
  return cartItems.filter((item) => item.id !== productToDelete.id);
};

const calcTotalQuantity = (cartItems) => {
  return cartItems.reduce((acc, item) => acc + item.quantity, 0);
};

const calcTotalPrice = (cartItems) => {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const CartContext = createContext({
  openDropdown: null,
  setOpenDropdown: () => null,
  cartItems: [],
  addItemToCart: () => {},
  totalQuantity: 0,
  totalPrice: 0,
});

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  TOGGLE_CART_DROPDOWN: "TOGGLE_CART_DROPDOWN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };

    case CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN:
      return {
        ...state,
        openDropdown: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer.`);
  }
};

const INITIAL_STATE = {
  openDropdown: null,
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartItems, totalPrice, totalQuantity, openDropdown } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartContent = {
      cartItems: newCartItems,
      totalPrice: calcTotalPrice(newCartItems),
      totalQuantity: calcTotalQuantity(newCartItems),
    };

    console.log(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartContent));

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartContent));
  };

  const setOpenDropdown = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN, bool));
  };

  const addItemToCart = (productToAdd) => {
    updateCartItemsReducer(addCartItem(cartItems, productToAdd));
  };

  const decreaseItemFromCart = (productToDecrease) => {
    updateCartItemsReducer(decreaseCartItem(cartItems, productToDecrease));
  };

  const deleteItemFromCart = (productToDelete) => {
    updateCartItemsReducer(deleteCartItem(cartItems, productToDelete));
  };

  const value = { openDropdown, setOpenDropdown, addItemToCart, cartItems, totalQuantity, decreaseItemFromCart, totalPrice, deleteItemFromCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
