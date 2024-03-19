import './product_card.styles.scss'

import { useContext } from "react";

import Button from '../button/button.component'
import { CartContext } from '../../contexts/cart.context'

function ProductCard({ product }) {
  const { name, imageUrl, price } = product
  const { addItemToCart } = useContext(CartContext);
  
  const AddProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button
        buttonType="inverted"
        onClick={AddProductToCart}
      >
        Add to Cart
      </Button>
    </div>
  );
}

export default ProductCard