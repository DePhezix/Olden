import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'

import { UserProvider } from './contexts/user.context'
import { ProductsProvider } from './contexts/products.contexts'
import { CartProvider } from './contexts/cart.context'
import { UrlHistoryProvider } from './contexts/urlHistory.context'

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <UrlHistoryProvider>
          <ProductsProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ProductsProvider>
        </UrlHistoryProvider>
      </UserProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
