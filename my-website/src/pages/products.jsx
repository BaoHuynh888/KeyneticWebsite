"use client"

import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import { Check, ChevronDown, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { products } from "../data/products"

export default function ProductsPage() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const categoryParam = queryParams.get("category")

  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all")
  const [sortOption, setSortOption] = useState("featured")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 })
  const [inStock, setInStock] = useState(false)

  useEffect(() => {
    let filtered = [...products]

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    if (inStock) {
      filtered = filtered.filter((product) => product.stock > 0)
    }

    filtered = filtered.filter((product) => product.price >= priceRange.min && product.price <= priceRange.max)

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
  }, [selectedCategory, sortOption, priceRange, inStock])

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {selectedCategory === "all"
              ? "All Products"
              : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) + " Keyboards"}
          </h1>
          <p className="mt-2 text-muted-foreground">Browse our selection of premium keyboards and accessories</p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Narrow down your product search</SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Categories</h3>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="all"
                          checked={selectedCategory === "all"}
                          onCheckedChange={() => setSelectedCategory("all")}
                        />
                        <Label htmlFor="all">All Products</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="mechanical"
                          checked={selectedCategory === "mechanical"}
                          onCheckedChange={() => setSelectedCategory("mechanical")}
                        />
                        <Label htmlFor="mechanical">Mechanical</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="optical"
                          checked={selectedCategory === "optical"}
                          onCheckedChange={() => setSelectedCategory("optical")}
                        />
                        <Label htmlFor="optical">Optical</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="accessories"
                          checked={selectedCategory === "accessories"}
                          onCheckedChange={() => setSelectedCategory("accessories")}
                        />
                        <Label htmlFor="accessories">Accessories</Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Price Range</h3>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="min-price">Min Price</Label>
                          <input
                            id="min-price"
                            type="range"
                            min="0"
                            max="200"
                            step="10"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                            className="w-full"
                          />
                          <span>${priceRange.min}</span>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="max-price">Max Price</Label>
                          <input
                            id="max-price"
                            type="range"
                            min="0"
                            max="200"
                            step="10"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                            className="w-full"
                          />
                          <span>${priceRange.max}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Availability</h3>
                    <div className="flex items-center gap-2">
                      <Checkbox id="in-stock" checked={inStock} onCheckedChange={(checked) => setInStock(checked)} />
                      <Label htmlFor="in-stock">In Stock Only</Label>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="hidden md:flex md:gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                className="h-8"
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Button>
              <Button
                variant={selectedCategory === "mechanical" ? "default" : "outline"}
                size="sm"
                className="h-8"
                onClick={() => setSelectedCategory("mechanical")}
              >
                Mechanical
              </Button>
              <Button
                variant={selectedCategory === "optical" ? "default" : "outline"}
                size="sm"
                className="h-8"
                onClick={() => setSelectedCategory("optical")}
              >
                Optical
              </Button>
              <Button
                variant={selectedCategory === "accessories" ? "default" : "outline"}
                size="sm"
                className="h-8"
                onClick={() => setSelectedCategory("accessories")}
              >
                Accessories
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  Sort by
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
                  <DropdownMenuRadioItem value="featured">
                    <Check className={`mr-2 h-4 w-4 ${sortOption === "featured" ? "opacity-100" : "opacity-0"}`} />
                    Featured
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-asc">
                    <Check className={`mr-2 h-4 w-4 ${sortOption === "price-asc" ? "opacity-100" : "opacity-0"}`} />
                    Price: Low to High
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-desc">
                    <Check className={`mr-2 h-4 w-4 ${sortOption === "price-desc" ? "opacity-100" : "opacity-0"}`} />
                    Price: High to Low
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="name-asc">
                    <Check className={`mr-2 h-4 w-4 ${sortOption === "name-asc" ? "opacity-100" : "opacity-0"}`} />
                    Name: A to Z
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="rating">
                    <Check className={`mr-2 h-4 w-4 ${sortOption === "rating" ? "opacity-100" : "opacity-0"}`} />
                    Highest Rated
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`}>
                <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                  <div className="aspect-square relative">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                    {product.stock <= 3 && product.stock > 0 && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                        Low Stock
                      </div>
                    )}
                    {product.stock === 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-medium">${product.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <span className="text-sm text-yellow-500">★</span>
                        <span className="text-sm ml-1">{product.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h3 className="text-lg font-medium">No products found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your filters to find what you're looking for.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSelectedCategory("all")
                setPriceRange({ min: 0, max: 200 })
                setInStock(false)
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}