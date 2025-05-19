// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Events from "./pages/Events";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import { CartProvider } from "./context/CartContext";
import { AlertProvider } from "./context/AlertContext";
import { Alert } from "./components/Alert";

const App: React.FC = () => {
  return (
    <AlertProvider>
      <CartProvider>
        <Router>
          {" "}
          {/* Environment all the application with the React Router */}
          <div className="w-screen h-screen flex flex-col">
            <Header />
            <main className="flex-1 bg-gray-100">
              <Routes>
                <Route path="/" element={<Events />} />
                <Route path="/cart" element={<ShoppingCartPage />} />
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
