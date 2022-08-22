import { createAction, withMatcher, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

const addCartItem = (cartItems: CartItem[] = [], productToAdd: CategoryItem): CartItem[] => {
  const isItemInCart = cartItems.find((item) => item.id === productToAdd.id);

  if (isItemInCart) {
    return cartItems.map((item) => (item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item));
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const decreaseCartItem = (cartItems: CartItem[], productToDecrease: CartItem): CartItem[] => {
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

const deleteCartItem = (cartItems: CartItem[], productToDelete: CartItem): CartItem[] => {
  return cartItems.filter((item) => item.id !== productToDelete.id);
};

export type SetOpenDropdown = ActionWithPayload<CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

export const addItemToCart = withMatcher((cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
});

export const decreaseItemFromCart = (cartItems: CartItem[], productToDecrease: CartItem) => {
  const newCartItems = decreaseCartItem(cartItems, productToDecrease);
  return setCartItems(newCartItems);
};

export const deleteItemFromCart = (cartItems: CartItem[], productToDelete: CartItem) => {
  const newCartItems = deleteCartItem(cartItems, productToDelete);
  return setCartItems(newCartItems);
};

export const setOpenDropdown = withMatcher((bool: boolean): SetOpenDropdown => createAction(CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN, bool));
