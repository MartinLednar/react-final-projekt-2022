import { CartItem } from "./cart.types";
import { setOpenDropdown, setCartItems } from "./cart.action";
import { AnyAction } from "redux";

export type CartState = {
  readonly openDropdown: boolean;
  readonly cartItems: CartItem[];
  readonly totalQuantity: number;
  readonly totalPrice: number;
};

const CART_INITIAL_STATE: CartState = {
  openDropdown: false,
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {
  if (setOpenDropdown.match(action)) {
    return {
      ...state,
      openDropdown: action.payload,
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;

  // switch (type) {
  //   case CART_ACTION_TYPES.SET_CART_ITEMS:
  //     return {
  //       ...state,
  //       cartItems: payload,
  //     };

  //   case CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN:
  //     return {
  //       ...state,
  //       openDropdown: action.payload,
  //     };
  //   default:
  //     return state;
  // }
};
