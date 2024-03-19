import { useContext } from 'react'

import './cart-dropdown.styles.scss'

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { CartContext } from "../../contexts/cart.context";

import { useNavigate } from 'react-router-dom'

import { ReactComponent as TrolleySVG } from '../../assets/trolley.svg'

function CartDropdown() {
  const { cartItems } = useContext(CartContext)
  const navigate = useNavigate()
  const NavigationToCheckout = () => {
    navigate('/checkout')
  }

  return (
    <div
      className={`cart-dropdown-container ${
        cartItems.length === 0 ? "empty_cart" : ""
      }`}
    >
      {cartItems.length === 0 ? (
        <>
          <TrolleySVG className='trolley_svg' />
          <div className="no_items_label">You have no items</div>
        </>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))}
          </div>
          <Button onClick={() => NavigationToCheckout()}>
            Go To Checkout{" "}
          </Button>
        </>
      )}
    </div>
  );
}

export default CartDropdown