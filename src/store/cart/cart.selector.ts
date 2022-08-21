import { createSelector } from "reselect";

import { CartState } from "./cart.reducer";

const selectCartReducer = (state): CartState => state.cart;

export const selectCartItems = createSelector([selectCartReducer], (cart) => cart.cartItems);

export const selectOpenDropdown = createSelector([selectCartReducer], (cart) => cart.openDropdown);

export const selectTotalQuantity = createSelector([selectCartItems], (cartItems) => cartItems.reduce((acc, item) => acc + item.quantity, 0));

export const selectTotalPrice = createSelector([selectCartItems], (cartItems) => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
