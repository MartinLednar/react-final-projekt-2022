import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout.styles.scss";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const { cartItems, totalPrice } = useContext(CartContext);
  return (
    <div className="checkout-container">
      <table>
        <tr className="checkout-header">
          <th className="header-block">Product</th>

          <th className="header-block">Description</th>

          <th className="header-block">Quantity</th>

          <th className="header-block">Price</th>

          <th className="header-block">Remove</th>
        </tr>

        {cartItems.map((item) => (
          <CheckoutItem key={item.id} item={item} />
        ))}
      </table>

      <span className="total">Overall: {totalPrice}$</span>
    </div>
  );
};

export default Checkout;
