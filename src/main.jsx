import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'

import { UserProvider } from './contexts/user.context'
import { CategoriesProvider } from './contexts/categories.contexts'
import { CartProvider } from './contexts/cart.context'
import { UrlHistoryProvider } from './contexts/urlHistory.context'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <UrlHistoryProvider>
            <CategoriesProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </CategoriesProvider>
        </UrlHistoryProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
