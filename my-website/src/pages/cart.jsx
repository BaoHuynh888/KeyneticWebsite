"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "../contexts/cart-context"
import "../styles/cart.css"

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
      <div className="container cart-container">
        <div className="empty-cart">
          <ShoppingCart className="empty-cart-icon" />
          <h1>Your cart is empty</h1>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container cart-container">
      <div className="cart-content">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
        </div>

        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.images?.[0] || "/placeholder.svg"} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)} each</p>
                <div className="cart-item-controls">
                  <div className="cart-quantity-controls">
                    <button
                      className="cart-quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus style={{ height: "1rem", width: "1rem" }} />
                    </button>
                    <span className="cart-quantity-display">{item.quantity}</span>
                    <button className="cart-quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus style={{ height: "1rem", width: "1rem" }} />
                    </button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <Trash2 style={{ height: "1rem", width: "1rem" }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-total">
            <span>Total: ${getCartTotal().toFixed(2)}</span>
          </div>
          <div className="checkout-section">
            <Link to="/products" className="continue-shopping btn btn-outline">
              Continue Shopping
            </Link>
            <button className="checkout-btn" onClick={handleCheckout} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <div className="processing-spinner"></div>
                  Processing...
                </>
              ) : (
                "Proceed to Checkout"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
