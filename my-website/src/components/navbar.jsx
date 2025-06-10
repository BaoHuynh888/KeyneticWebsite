"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, Search, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "../contexts/cart-context"
import { ThemeToggle } from "./theme-toggle"

export default function Navbar() {
  const { cart } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 text-lg font-medium">
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
              <Link to="/products" className="hover:text-primary">
                All Keyboards
              </Link>
              <Link to="/products?category=mechanical" className="hover:text-primary">
                Mechanical
              </Link>
              <Link to="/products?category=optical" className="hover:text-primary">
                Optical
              </Link>
              <Link to="/products?category=accessories" className="hover:text-primary">
                Accessories
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">Keynetic</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/products" className="hover:text-primary transition-colors">
            All Keyboards
          </Link>
          <Link to="/products?category=mechanical" className="hover:text-primary transition-colors">
            Mechanical
          </Link>
          <Link to="/products?category=optical" className="hover:text-primary transition-colors">
            Optical
          </Link>
          <Link to="/products?category=accessories" className="hover:text-primary transition-colors">
            Accessories
          </Link>
        </nav>

        <div className="flex items-center ml-auto gap-2">
          {isSearchOpen ? (
            <div className="flex items-center">
              <Input type="search" placeholder="Search keyboards..." className="w-[150px] md:w-[200px] lg:w-[300px]" />
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <ThemeToggle />

          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {cartItemsCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}