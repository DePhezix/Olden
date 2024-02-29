import { createContext, useState }  from 'react'
import ProductsData from '../shop-data.json'

export const ProductsContext = createContext({
    setProducts: () => [],
    products: [],
})

export function ProductsProvider({children}) {
    const [products, setProducts] = useState(ProductsData)
    const value = {products, setProducts}
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
