'use client';

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  

  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const toggleCart = () => setIsOpen(!isOpen);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.slug === product.slug && item.size === product.size
      );

      if (existingItem) {
        return prev.map((item) =>
          item.slug === product.slug && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (slug, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.slug === slug && item.size === size))
    );
   
    if (cartItems.length <= 1) setAppliedCoupon(null);
  };


  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);


  const discountValue = appliedCoupon ? cartTotal * (appliedCoupon.discountPercent / 100) : 0;
  const finalTotal = cartTotal - discountValue;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isOpen,
        toggleCart,
        addToCart,
        removeFromCart,
        clearCart,        
        cartTotal,
        cartCount,
        appliedCoupon,     
        setAppliedCoupon,  
        discountValue,    
        finalTotal        
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);