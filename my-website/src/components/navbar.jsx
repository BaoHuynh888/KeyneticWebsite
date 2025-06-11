"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, Search, ShoppingCart, X } from "lucide-react"
import { useCart } from "../contexts/cart-context"
import { ThemeToggle } from "./theme-toggle"
import "../styles/navbar.css"

export default function Navbar() {
  const { cart } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="mobile-menu-icon" />
            <span className="sr-only">Toggle menu</span>
          </button>

          <Link to="/" className="logo-link">
            <span className="logo-text">Keynetic</span>
          </Link>

          <nav className="desktop-nav">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/products" className="nav-link">
              All Keyboards
            </Link>
            <Link to="/products?category=mechanical" className="nav-link">
              Mechanical
            </Link>
            <Link to="/products?category=optical" className="nav-link">
              Optical
            </Link>
            <Link to="/products?category=accessories" className="nav-link">
              Accessories
            </Link>
          </nav>

          <div className="navbar-actions">
            {isSearchOpen ? (
              <div className="search-container">
                <input type="search" placeholder="Search keyboards..." className="search-input" />
                <button className="action-btn" onClick={() => setIsSearchOpen(false)}>
                  <X className="action-icon" />
                </button>
              </div>
            ) : (
              <button className="action-btn" onClick={() => setIsSearchOpen(true)}>
                <Search className="action-icon" />
                <span className="sr-only">Search</span>
              </button>
            )}

            <ThemeToggle />

            <Link to="/cart">
              <button className="action-btn">
                <ShoppingCart className="action-icon" />
                {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
                <span className="sr-only">Cart</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="mobile-menu-panel">
            <nav className="mobile-nav">
              <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                All Keyboards
              </Link>
              <Link
                to="/products?category=mechanical"
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Mechanical
              </Link>
              <Link
                to="/products?category=optical"
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Optical
              </Link>
              <Link
                to="/products?category=accessories"
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accessories
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
