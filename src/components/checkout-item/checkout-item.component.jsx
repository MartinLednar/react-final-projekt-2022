import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, decreaseItemFromCart, deleteItemFromCart } from "../../store/cart/cart.action";

import "./checkout-item.styles.scss";
import { ChevronLeft, ChevronRight, X } from "react-feather";
import { selectCartItems } from "../../store/cart/cart.selector";

const CheckoutItem = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, price, quantity, imageUrl } = item;

  const addProductToCart = () => dispatch(addItemToCart(cartItems, item));
  const decreaseProductFromCart = () => dispatch(decreaseItemFromCart(cartItems, item));
  const deleteProductFromCart = () => dispatch(deleteItemFromCart(cartItems, item));

  return (
    <tr className="checkout-item-container">
      <td className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </td>

      <td>{name}</td>

      <td>
        <div className="quantity">
          <span onClick={decreaseProductFromCart}>
            {" "}
            <ChevronLeft className="arrow" />{" "}
          </span>
          <span className="value">{quantity}</span>
          <span onClick={addProductToCart}>
            {" "}
            <ChevronRight className="arrow" />{" "}
          </span>
        </div>
      </td>

      <td>{price}$</td>

      <td>
        <span>
          <X className="remove-button" onClick={deleteProductFromCart} />
        </span>
      </td>
    </tr>
  );
};

export default CheckoutItem;
