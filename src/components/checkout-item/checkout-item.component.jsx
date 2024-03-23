import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

function CheckoutItem({ checkoutItem }) {
  const { name, imageUrl, quantity, price } = checkoutItem;
  const { subtractItemfromCart, addItemToCart, removeItemfromCart } =
    useContext(CartContext);

  const removeItemHandler = () => removeItemfromCart(checkoutItem);
  const subtractItemHandler = () => subtractItemfromCart(checkoutItem);
  const addItemHandler = () => addItemToCart(checkoutItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={subtractItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">${price * quantity}</span>
      <div className="remove-item" onClick={removeItemHandler}>
        &#10005;
      </div>
    </div>
  );
}

export default CheckoutItem;
