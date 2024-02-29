import { createContext, useState } from "react";

export const CartContext = createContext({
  setisCartOpen: () => {},
  isCartOpen: false,
});

export function CartProvider({ children }) {
  const [isCartOpen, setisCartOpen] = useState(false);
  const value = { isCartOpen, setisCartOpen };
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
