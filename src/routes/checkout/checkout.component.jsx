import { useContext } from 'react'
import { useNavigate } from "react-router-dom";

import { CartContext } from '../../contexts/cart.context'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import Button from '../../components/button/button.component'
import { ReactComponent as TrolleySVG } from '../../assets/trolley.svg'
 
import './checkout.styleadd s.scss'

function Checkout() {
  const { cartItems, cartTotal } = useContext(CartContext);

  const navigate = useNavigate()

  console.log(cartItems)

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
        <div className='empty-checkout-container'>
          <TrolleySVG />
          <span>Empty Checkout</span>
          <Button onClick={() => navigate("/shop")}>Go Shopping?</Button>
        </div>
      )}
    </div>
  );
}

export default Checkout