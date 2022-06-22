import "./cart-icon.styles.scss";
import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { CartContext } from "../../contexts/cart.context";

const CartIcon = ({ onClickMethod }) => {
  const { openDropdown, setOpenDropdown } = useContext(CartContext);

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  return (
    <div className="cart-icon-container" onClick={toggleDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
