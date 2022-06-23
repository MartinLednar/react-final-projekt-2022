import { createContext, useState, useEffect } from "react";

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

export const CartProvider = ({ children }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalQuantity(calcTotalQuantity(cartItems));
    setTotalPrice(calcTotalPrice(cartItems));
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const decreaseItemFromCart = (productToDecrease) => {
    setCartItems(decreaseCartItem(cartItems, productToDecrease));
  };

  const deleteItemFromCart = (productToDelete) => {
    setCartItems(deleteCartItem(cartItems, productToDelete));
  };

  const value = { openDropdown, setOpenDropdown, addItemToCart, cartItems, totalQuantity, decreaseItemFromCart, totalPrice, deleteItemFromCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
