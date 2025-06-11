"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ChevronLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { products } from "../data/products"
import { useCart } from "../contexts/cart-context"
import "../styles/product-detail.css"

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("details")
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true)
      const foundProduct = products.find((p) => p.id === Number.parseInt(id))
      setProduct(foundProduct || null)
      setLoading(false)
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  if (loading) {
    return (
      <div className="container loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container not-found-container">
        <h1 className="not-found-title">Product Not Found</h1>
        <p className="not-found-description">The product you're looking for doesn't exist.</p>
        <Link to="/products" className="btn btn-primary not-found-btn">
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="container product-detail-container">
      <Link to="/products" className="back-link">
        <ChevronLeft className="back-icon" />
        Back to Products
      </Link>

      <div className="product-detail-grid">
        <div className="product-images">
          <div className="main-image-container">
            <img src={product.images[0] || "/placeholder.svg"} alt={product.name} className="main-image" />
          </div>
        </div>

        <div className="product-info">
          <div className="product-header">
            <h1>{product.name}</h1>
            <div className="rating-container">
              <div className="stars-container">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`star ${i < Math.floor(product.rating) ? "star-filled" : "star-empty"}`} />
                ))}
              </div>
              <span className="rating-text">({product.rating})</span>
            </div>
          </div>

          <div className="price">${product.price.toFixed(2)}</div>

          <div className="description">
            <p>{product.description}</p>
          </div>

          <div className="product-details">
            <div className="detail-row">
              <span className="detail-label">Availability:</span>
              {product.stock > 0 ? (
                <span className="stock-available">In Stock ({product.stock} available)</span>
              ) : (
                <span className="stock-unavailable">Out of Stock</span>
              )}
            </div>
            <div className="detail-row">
              <span className="detail-label">Category:</span>
              <span className="category-text">{product.category}</span>
            </div>
          </div>

          {product.stock > 0 && (
            <div className="purchase-section">
              <div className="quantity-section">
                <span className="quantity-label">Quantity:</span>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn quantity-btn-left"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus style={{ height: "1rem", width: "1rem" }} />
                  </button>
                  <div className="quantity-display">{quantity}</div>
                  <button
                    className="quantity-btn quantity-btn-right"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus style={{ height: "1rem", width: "1rem" }} />
                  </button>
                </div>
              </div>

              <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>
                <ShoppingCart className="cart-icon" />
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="product-tabs">
        <div className="tabs-list">
          <button
            className={`tab-trigger ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`tab-trigger ${activeTab === "features" ? "active" : ""}`}
            onClick={() => setActiveTab("features")}
          >
            Features
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "details" && (
            <div className="description">
              <p>{product.description}</p>
              <p>
                This premium keyboard is designed for both enthusiasts and professionals who demand the best typing
                experience. With its durable construction and responsive switches, it's perfect for extended typing
                sessions and gaming.
              </p>
            </div>
          )}
          {activeTab === "features" && (
            <ul className="features-list">
              {product.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <div className="feature-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
