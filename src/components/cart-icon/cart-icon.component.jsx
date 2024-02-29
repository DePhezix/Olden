import { useContext } from "react";
import { CartContext } from "../../contexts/ToggleCart.context";

import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

function CartIcon() {
  const { isCartOpen, setisCartOpen } = useContext(CartContext);
  return (
    <div className="cart-icon-container" onClick={() => setisCartOpen(!isCartOpen)}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
}

export default CartIcon;
