"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "../contexts/cart-context"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCheckout = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      window.location.href = "/checkout"
    }, 1000)
  }

  if (cart.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center py-20">
        <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link to="/products">
          <Button className="mt-4">Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4"
          >
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
              <div className="flex items-center mt-2 space-x-2">
                <label htmlFor={`quantity-${item.id}`} className="text-sm">
                  Quantity:
                </label>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 border rounded px-2 py-1"
                />
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                variant="destructive"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <p className="text-lg font-semibold">Total: ${getCartTotal().toFixed(2)}</p>
        <Button onClick={handleCheckout} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Checkout"}
        </Button>
      </div>
    </div>
  )
}