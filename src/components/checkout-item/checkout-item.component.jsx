import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";
import { ChevronLeft, ChevronRight, X } from "react-feather";

const CheckoutItem = ({ item }) => {
  const { name, price, quantity, imageUrl } = item;

  const { addItemToCart, decreaseItemFromCart, deleteItemFromCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(item);
  const decreaseProductFromCart = () => decreaseItemFromCart(item);
  const deleteProductFromCart = () => deleteItemFromCart(item);

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
