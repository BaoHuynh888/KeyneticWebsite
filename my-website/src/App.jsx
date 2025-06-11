import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "./contexts/cart-context"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import HomePage from "./pages/home"
import ProductsPage from "./pages/products"
import ProductDetailPage from "./pages/product-detail"
import CartPage from "./pages/cart"
import TermsPage from "./pages/terms"
// import CheckoutPage from "./pages/checkout"
// import NotFoundPage from "./pages/not-found"
import './index.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/terms" element={<TermsPage />} />
              {/* <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </Router>
    </CartProvider>
  )
}

export default App
