import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'

import './checkout.styles.scss'

function Checkout() {
  const { cartItems } = useContext(CartContext)
  

  return <div>{cartItems.map((cartItem) => <CheckoutItem item={cartItem} /> )}</div>;
}

export default Checkout