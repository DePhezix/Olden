import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import Button from '../../components/button/button.component';

import './checkout.styles.scss';

function Checkout() {
  const { cartItems, cartTotal } = useContext(CartContext);

  const navigate = useNavigate();

  return (
    <div className="checkout-container">
      {cartItems.length >= 1 ? (
        <>
          <div className="checkout-header">
            <div className="header-block">
              <span>Product</span>
            </div>
            <div className="header-block">
              <span>Description</span>
            </div>
            <div className="header-block">
              <span>Quantity</span>
            </div>
            <div className="header-block">
              <span>Price</span>
            </div>
            <div className="header-block">
              <span>Remove</span>
            </div>
          </div>
          {cartItems.map((item) => (
            <CheckoutItem key={item.id} checkoutItem={item} />
          ))}
          <span className="total">Total: ${cartTotal} </span>
        </>
      ) : (
        <div className="empty-checkout-container">
          <span>Your Checkout is Empty!</span>
          <Button onClick={() => navigate('/shop')}>Return to shop?</Button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
