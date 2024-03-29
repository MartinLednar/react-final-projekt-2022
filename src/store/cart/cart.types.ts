import { CategoryItem } from "../categories/category.types";

export enum CART_ACTION_TYPES {
  SET_CART_ITEMS = "SET_CART_ITEMS",
  SET_CART_TOTAL = "SET_CART_TOTAL",
  SET_CART_COUNT = "SET_CART_COUNT",
  TOGGLE_CART_DROPDOWN = "TOGGLE_CART_DROPDOWN",
}

export type CartItem = CategoryItem & {
  quantity: number;
};
