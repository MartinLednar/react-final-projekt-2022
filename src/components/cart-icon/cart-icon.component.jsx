import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles";
import { useDispatch, useSelector } from "react-redux";

import { setOpenDropdown } from "../../store/cart/cart.action";
import { selectOpenDropdown, selectTotalQuantity } from "../../store/cart/cart.selector";

const CartIcon = () => {
  const dispatch = useDispatch();
  const openDropdown = useSelector(selectOpenDropdown);
  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <CartIconContainer onClick={() => dispatch(setOpenDropdown(!openDropdown))}>
      <ShoppingIcon />
      <ItemCount>{totalQuantity}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
