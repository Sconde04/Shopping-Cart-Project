// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Events from "./pages/Events";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import { CartProvider } from "./context/CartContext";
import { ThankYouPage } from "./pages/ThankYouPage";
import { AlertProvider } from "./context/AlertContext";
import { Alert } from "./components/Alert";
import CheckoutPage from "./pages/CheckoutPage";

const App: React.FC = () => {
  return (
    <AlertProvider>
      <CartProvider>
        <Router>
          {" "}
          {/* Environment all the application with the React Router */}
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Events />} />
                <Route path="/cart" element={<ShoppingCartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/thank-you" element={<ThankYouPage />} />
              </Routes>
            </main>
            <Footer />
            <Alert />
          </div>
        </Router>
      </CartProvider>
    </AlertProvider>
  );
};

export default App;
