import { useContext } from 'react'
import { ProductsContext } from '../../contexts/products.contexts'
import ProductCard from '../../components/product_card/product_card.component'

import './shop.component.scss'

function Shop() {
  const { products } = useContext(ProductsContext)
  return (
    <div className='products_container'>
        {products.map((product) => (
            <ProductCard key={product.id} product={product}  />
        ))}
    </div>
  )
}

export default Shop