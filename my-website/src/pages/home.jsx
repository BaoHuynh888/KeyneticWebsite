"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { products } from "../data/products"

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    const featured = products.slice(0, 4)
    setFeaturedProducts(featured)
  }, [])

  return (
    <div className="flex flex-col gap-12 py-8">
      {/* Hero Section */}
      <section className="relative">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Welcome to Keynetic
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  A collection of custom mechanical keyboards for your taste. Discover your ideal
                  match with our curated selection.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/products">
                  <Button size="lg">
                    Shop Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/products?category=mechanical">
                  <Button variant="outline" size="lg">
                    Explore Mechanical
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/Featured-Keyboard.png"
                alt="Featured Keyboard"
                className="aspect-square overflow-hidden rounded-xl object-cover"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-muted py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Categories</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Browse our selection of custom keyboards and accessories
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <Link to="/products?category=mechanical" className="group relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors" />
              <img
                src="/images/Mechanical-Keyboards.webp"
                // alt="Mechanical Keyboards"
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                width={400}
                height={300}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Mechanical</h3>
              </div>
            </Link>
            <Link to="/products?category=optical" className="group relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors" />
              <img
                src="/images/Optical-Keyboards.webp"
                // alt="Optical Keyboards"
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                width={400}
                height={300}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Optical</h3>
              </div>
            </Link>
            <Link to="/products?category=accessories" className="group relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors" />
              <img
                src="/images/Keyboard-Accessories.webp"
                // alt="Keyboard Accessories"
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                width={400}
                height={300}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Accessories</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Products</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Our most popular keyboards and accessories
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Carousel className="w-full">
              <CarouselContent>
                {featuredProducts.map((product) => (
                  <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden">
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="h-[200px] w-full object-cover"
                        />
                        <CardContent className="p-4">
                          <div className="flex flex-col space-y-1.5">
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between pt-2">
                              <span className="font-medium">${product.price.toFixed(2)}</span>
                              <Link to={`/products/${product.id}`}>
                                <Button size="sm">View Details</Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
          <div className="flex justify-center mt-8">
            <Link to="/products">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose Keynetic?</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                We're passionate about keyboards and committed to quality
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <div className="rounded-full bg-primary/10 p-3">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Premium Quality</h3>
                <p className="text-muted-foreground">
                  We source only the highest quality components for our keyboards, ensuring durability and performance.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <div className="rounded-full bg-primary/10 p-3">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Expert Support</h3>
                <p className="text-muted-foreground">
                  Our team of keyboard enthusiasts is always ready to help you find the perfect keyboard for your needs.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <div className="rounded-full bg-primary/10 p-3">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Satisfaction Guaranteed</h3>
                <p className="text-muted-foreground">
                  We offer a 30-day satisfaction guarantee on all our products. Not happy? We'll make it right.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Stay Updated</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Subscribe to our newsletter for the latest product updates and exclusive offers
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your email"
                  type="email"
                  required
                />
                <Button type="submit">Subscribe</Button>
              </form>
              <p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}