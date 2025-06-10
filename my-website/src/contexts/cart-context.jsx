"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    const savedCart = localStorage.getItem("keyboard-cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("keyboard-cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)

      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      } else {
        return [...prevCart, { ...product, quantity }]
      }
    })

    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}) added to your cart`,
    })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId)

    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))

    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}