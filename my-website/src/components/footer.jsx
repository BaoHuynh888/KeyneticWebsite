import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter } from "lucide-react"
import "../styles/footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-text">Keynetic</span>
            </Link>
            <p className="footer-description">
              Premium custom keyboards for enthusiasts and professionals. Crafted with precision and passion.
            </p>
          </div>
          <div className="footer-section">
            <div className="footer-section-title">Shop</div>
            <nav className="footer-nav">
              <Link to="/products" className="footer-link">
                All Keyboards
              </Link>
              <Link to="/products?category=mechanical" className="footer-link">
                Mechanical
              </Link>
              <Link to="/products?category=optical" className="footer-link">
                Optical
              </Link>
              <Link to="/products?category=accessories" className="footer-link">
                Accessories
              </Link>
            </nav>
          </div>
          <div className="footer-section">
            <div className="footer-section-title">Company</div>
            <nav className="footer-nav">
              <Link to="/about" className="footer-link">
                About Us
              </Link>
              <Link to="/contact" className="footer-link">
                Contact
              </Link>
              <Link to="/blog" className="footer-link">
                Blog
              </Link>
              <Link to="/careers" className="footer-link">
                Careers
              </Link>
            </nav>
          </div>
          <div className="footer-section">
            <div className="footer-section-title">Legal</div>
            <nav className="footer-nav">
              <Link to="/terms" className="footer-link">
                Terms of Service
              </Link>
              <Link to="/privacy" className="footer-link">
                Privacy Policy
              </Link>
              <Link to="/shipping" className="footer-link">
                Shipping Policy
              </Link>
              <Link to="/returns" className="footer-link">
                Returns & Refunds
              </Link>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copyright">© {new Date().getFullYear()} Keynetic. All rights reserved.</div>
          <div className="footer-social">
            <Link to="#" className="social-link">
              <Facebook className="social-icon" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link to="#" className="social-link">
              <Instagram className="social-icon" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link to="#" className="social-link">
              <Twitter className="social-icon" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
