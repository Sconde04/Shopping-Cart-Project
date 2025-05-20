import React from "react";
import { Link, useLocation } from "react-router-dom";
import CartIcon from "./CartIcon";
import { FiArrowLeft } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const Header: React.FC = () => {
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";
  const isCheckoutPage = location.pathname === "/checkout";
  const isHome = location.pathname === "/";
  const { totalItems } = useCart();

  return (
    <header className="w-full">
      <div className="bg-[rgb(60,60,60)] text-white text-sm text-center py-2">
        Free shipping on all orders over $200! For a limited time only.
      </div>
      <div className="relative flex items-center h-34 px-12 py-12 border-b-2 border-gray-200">
        {/* Back to Shop link, only visible on cart page */}
        {!isHome && (
          <Link
            to="/"
            className="absolute left-24 bottom-4 flex items-center text-gray-700 hover:text-gray-900"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span className="ml-2">Back to Shop</span>
          </Link>
        )}

        {/* Title centered absolutely */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
          <Link to="/">@Your Company</Link>
        </h1>

        {/* Cart icon aligned to the right */}
        {!isCartPage && !isCheckoutPage && (
          <div className="ml-auto relative">
            <Link to="/cart">
              <CartIcon itemCount={totalItems} />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
