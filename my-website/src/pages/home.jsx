"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { products } from "../data/products"
import "../styles/home.css"

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    const featured = products.slice(0, 4)
    setFeaturedProducts(featured)
  }, [])

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">Welcome to Keynetic</h1>
                <p className="hero-description">
                  A collection of custom mechanical keyboards for your taste. Discover your ideal match with our curated
                  selection.
                </p>
              </div>
              <div className="hero-buttons">
                <Link to="/products" className="btn btn-primary btn-lg">
                  Shop Collection
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    style={{ marginLeft: "0.5rem", height: "1rem", width: "1rem" }}
                  />
                </Link>
                <Link to="/products?category=mechanical" className="btn btn-outline btn-lg">
                  Explore Mechanical
                </Link>
              </div>
            </div>
            <div className="hero-image-container">
              <img src="/images/Featured-Keyboard.png" alt="Featured Keyboard" className="hero-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-muted">
        <div className="container">
          <div className="section-header">
            <div className="space-y-2">
              <h2 className="section-title">Categories</h2>
              <p className="section-description">Browse our selection of custom keyboards and accessories</p>
            </div>
          </div>
          <div className="categories-grid">
            <Link to="/products?category=mechanical" className="category-card">
              <div className="category-overlay" />
              <img src="/images/Mechanical-Keyboards.webp" alt="Mechanical Keyboards" className="category-image" />
              <div className="category-title-container">
                <h3 className="category-title">Mechanical</h3>
              </div>
            </Link>
            <Link to="/products?category=optical" className="category-card">
              <div className="category-overlay" />
              <img src="/images/Optical-Keyboards.webp" alt="Optical Keyboards" className="category-image" />
              <div className="category-title-container">
                <h3 className="category-title">Optical</h3>
              </div>
            </Link>
            <Link to="/products?category=accessories" className="category-card">
              <div className="category-overlay" />
              <img src="/images/Keyboard-Accessories.webp" alt="Keyboard Accessories" className="category-image" />
              <div className="category-title-container">
                <h3 className="category-title">Accessories</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="space-y-2">
              <h2 className="section-title">Featured Products</h2>
              <p className="section-description">Our most popular keyboards and accessories</p>
            </div>
          </div>
          <div className="carousel-container">
            <div className="carousel-content">
              {featuredProducts.map((product) => (
                <div key={product.id} className="carousel-item">
                  <div className="card">
                    <img src={product.images[0] || "/placeholder.svg"} alt={product.name} className="product-image" />
                    <div className="card-content">
                      <div className="product-info">
                        <h3 className="product-title">{product.name}</h3>
                        <p className="product-description">{product.description}</p>
                        <div className="product-footer">
                          <span className="product-price">${product.price.toFixed(2)}</span>
                          <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="view-all-container">
            <Link to="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-muted">
        <div className="container">
          <div className="section-header">
            <div className="space-y-2">
              <h2 className="section-title">Why Choose Keynetic?</h2>
              <p className="section-description">We're passionate about keyboards and committed to quality</p>
            </div>
          </div>
          <div className="features-grid">
            <div className="card">
              <div className="card-content-lg">
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
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="feature-title">Premium Quality</h3>
                <p className="feature-description">
                  We source only the highest quality components for our keyboards, ensuring durability and performance.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-content-lg">
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
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                </div>
                <h3 className="feature-title">Expert Support</h3>
                <p className="feature-description">
                  Our team of keyboard enthusiasts is always ready to help you find the perfect keyboard for your needs.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-content-lg">
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
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="feature-title">Satisfaction Guaranteed</h3>
                <p className="feature-description">
                  We offer a 30-day satisfaction guarantee on all our products. Not happy? We'll make it right.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="space-y-2">
              <h2 className="section-title">Stay Updated</h2>
              <p className="section-description">
                Subscribe to our newsletter for the latest product updates and exclusive offers
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="newsletter-form">
                <input className="newsletter-input" placeholder="Enter your email" type="email" required />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </form>
              <p className="newsletter-disclaimer">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
