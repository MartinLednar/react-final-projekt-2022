import { useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

import { CartDropdownContainer, EmptyMessage, CartItems } from "./cart-dropdown.styles";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  //useMemo() - umoznuje memoizovat return hodnotu z funkcie (podobne ako reselect), pouzitie : ked je nejaka narocna funkcia na performance a nechceme aby sa pustala po kazdej zmene ale iba ked je to treba

  //useCallback() memoizuje funkciu samotnu aby ju nemusel inicializovat pokazde
  const handleClick = useCallback(() => {
    navigate("/checkout", { replace: true });
  }, []);

  return (
    <CartDropdownContainer>
      <CartItems>{cartItems.length ? cartItems.map((item) => <CartItem key={item.id} cartItem={item} />) : <EmptyMessage>Your cart is empty</EmptyMessage>}</CartItems>

      <Button onClick={handleClick}>Go to checkout</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
