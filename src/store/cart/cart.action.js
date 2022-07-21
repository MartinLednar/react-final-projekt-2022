import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

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

export const addItemToCart = (cartItems, productToAdd) => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, addCartItem(cartItems, productToAdd));
};

export const decreaseItemFromCart = (cartItems, productToDecrease) => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, decreaseCartItem(cartItems, productToDecrease));
};

export const deleteItemFromCart = (cartItems, productToDelete) => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, deleteCartItem(cartItems, productToDelete));
};

export const setOpenDropdown = (bool) => createAction(CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN, bool);
