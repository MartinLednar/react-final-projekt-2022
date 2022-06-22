import { createContext, useState } from "react";

export const CartContext = createContext({
  openDropdown: null,
  setOpenDropdown: () => null,
});

export const CartProvider = ({ children }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const value = { openDropdown, setOpenDropdown };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
