import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Keynetic</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Premium custom keyboards for enthusiasts and professionals. Crafted with precision and passion.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="font-medium">Shop</div>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                All Keyboards
              </Link>
              <Link
                to="/products?category=mechanical"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Mechanical
              </Link>
              <Link
                to="/products?category=optical"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Optical
              </Link>
              <Link
                to="/products?category=accessories"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Accessories
              </Link>
            </nav>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="font-medium">Company</div>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                Careers
              </Link>
            </nav>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="font-medium">Legal</div>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                Shipping Policy
              </Link>
              <Link to="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                Returns & Refunds
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Keynetic
          </div>
          <div className="flex gap-4">
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}