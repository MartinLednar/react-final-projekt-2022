import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";

import { CartDropdownContainer, EmptyMessage, CartItems } from "./cart-dropdown.styles";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const navigate = useNavigate();
  const { cartItems, setOpenDropdown } = useContext(CartContext);

  const handleClick = () => {
    setOpenDropdown(false);
    navigate("/checkout", { replace: true });
  };

  return (
    <CartDropdownContainer>
      <CartItems>{cartItems.length ? cartItems.map((item) => <CartItem key={item.id} cartItem={item} />) : <EmptyMessage>Your cart is empty</EmptyMessage>}</CartItems>

      <Button onClick={handleClick}>Go to checkout</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
