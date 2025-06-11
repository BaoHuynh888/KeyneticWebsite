"use client"

import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import { Check, ChevronDown, SlidersHorizontal } from "lucide-react"
import { products } from "../data/products"
import "../styles/products.css"

export default function ProductsPage() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const categoryParam = queryParams.get("category")

  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all")
  const [sortOption, setSortOption] = useState("featured")
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  useEffect(() => {
    let filtered = [...products]

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    switch (sortOption) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, sortOption])

  const getSortLabel = (option) => {
    switch (option) {
      case "price-asc":
        return "Price: Low to High"
      case "price-desc":
        return "Price: High to Low"
      case "name-asc":
        return "Name: A to Z"
      case "rating":
        return "Highest Rated"
      default:
        return "Featured"
    }
  }

  return (
    <div className="container products-container">
      <div className="products-content">
        <div className="products-header">
          <h1>
            {selectedCategory === "all"
              ? "All Products"
              : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) + " Keyboards"}
          </h1>
          <p>Browse our selection of premium keyboards and accessories</p>
        </div>

        <div className="products-controls">
          <div className="filters-section">
            <button className="btn btn-outline btn-sm">
              <SlidersHorizontal style={{ height: "1rem", width: "1rem" }} />
              Filters
            </button>

            <div className="filter-btn">
              <button
                className={`btn btn-sm ${selectedCategory === "all" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setSelectedCategory("all")}
              >
                All
              </button>
              <button
                className={`btn btn-sm ${selectedCategory === "mechanical" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setSelectedCategory("mechanical")}
              >
                Mechanical
              </button>
              <button
                className={`btn btn-sm ${selectedCategory === "optical" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setSelectedCategory("optical")}
              >
                Optical
              </button>
              <button
                className={`btn btn-sm ${selectedCategory === "accessories" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setSelectedCategory("accessories")}
              >
                Accessories
              </button>
            </div>
          </div>

          <div className="sort-section">
            <div className="dropdown">
              <button
                className="btn btn-outline btn-sm dropdown-trigger"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                Sort by
                <ChevronDown style={{ height: "1rem", width: "1rem" }} />
              </button>
              {showSortDropdown && (
                <div className="dropdown-content">
                  {["featured", "price-asc", "price-desc", "name-asc", "rating"].map((option) => (
                    <div
                      key={option}
                      className={`dropdown-item ${sortOption === option ? "selected" : ""}`}
                      onClick={() => {
                        setSortOption(option)
                        setShowSortDropdown(false)
                      }}
                    >
                      <Check className={`check-icon ${sortOption === option ? "opacity-100" : "opacity-0"}`} />
                      {getSortLabel(option)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`} className="product-card">
                <div className="card">
                  <div className="product-image-container">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="product-card-image"
                    />
                    {product.stock <= 3 && product.stock > 0 && <div className="stock-badge stock-low">Low Stock</div>}
                    {product.stock === 0 && <div className="stock-badge stock-out">Out of Stock</div>}
                  </div>
                  <div className="card-content">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-footer">
                      <span className="product-price">${product.price.toFixed(2)}</span>
                      <div className="product-rating">
                        <span className="rating-star">★</span>
                        <span className="rating-text">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try adjusting your filters to find what you're looking for.</p>
            <button
              className="btn btn-outline"
              onClick={() => {
                setSelectedCategory("all")
                setSortOption("featured")
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
