"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ChevronLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products } from "../data/products"
import { useCart } from "../contexts/cart-context"

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    // Simulate API fetch
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
      <div className="container flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="text-muted-foreground mt-2">The product you're looking for doesn't exist.</p>
        <Link to="/products">
          <Button className="mt-4">Back to Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <Link
        to="/products"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-lg border bg-background">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.rating})</span>
            </div>
          </div>

          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>

          <div className="prose prose-sm max-w-none">
            <p>{product.description}</p>
          </div>

          <div className="flex flex-col gap-2 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Availability:</span>
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Category:</span>
              <span className="capitalize">{product.category}</span>
            </div>
          </div>

          {product.stock > 0 && (
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-r-none"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <div className="flex h-8 w-12 items-center justify-center border-y">{quantity}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-l-none"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-4">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>
                This premium keyboard is designed for both enthusiasts and professionals who demand the best typing
                experience. With its durable construction and responsive switches, it's perfect for extended typing
                sessions and gaming.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="features" className="pt-4">
            <ul className="grid gap-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function Check(props) {
  return (
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
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}