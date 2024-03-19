import './cart-item.styles.scss'

function CartItem({cartItem}) {
  const { name, imageUrl, quantity, price } = cartItem
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className='name'>{quantity} x {name}</span>
        <span className='price'>Price: ${price * quantity}</span>
      </div>
    </div>
  );
}

export default CartItem