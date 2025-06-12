// src/pages/ShoppingCartPage.tsx
import React from "react";
import OrderList from "../components/OrderList";
import Summary from "../components/Summary";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ShoppingCartPage: React.FC = () => {
  const {
    cartItems,
    totalItems,
    subtotal,
    totalPrice,
    updateItem,
    removeItem,
    isLoading,
    error,
  } = useCart();

  const handleIncrease = (idx: number) => {
    const item = cartItems[idx];
    updateItem(item.id, item.quantity + 1);
  };

  const handleDecrease = (idx: number) => {
    const item = cartItems[idx];
    if (item.quantity > 1) {
      updateItem(item.id, item.quantity - 1);
    }
  };

  const handleRemove = (idx: number) => {
    const item = cartItems[idx];
    removeItem(item.id);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-8 py-4 sm:py-8">
        <h1 className="flex justify-center text-2xl sm:text-3xl font-bold mb-2 mt-4">
          Shopping Cart
        </h1>
        <p className="flex justify-center text-gray-600 mb-8 sm:mb-14 text-center px-4">
          Shipping charges and discount codes are confirmed at checkout.
        </p>

        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">Loading cart...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!isLoading && !error && cartItems.length === 0 && (
          <div className="flex flex-col justify-center items-center h-40">
            <p className="text-gray-500 text-xl mb-4">Your cart is empty</p>
            <a href="/" className="text-blue-600 hover:underline">
              Continue shopping
            </a>
          </div>
        )}

        {!isLoading && !error && cartItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
            <div className="lg:col-span-2 w-full overflow-x-auto">
              <OrderList
                items={cartItems}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            </div>
            <div className="w-full mt-8 sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0">
              <Summary
                totalItems={totalItems}
                subtotal={subtotal}
                totalPrice={totalPrice}
              />
              <Link to="/checkout">
                <button className="flex justify-center w-full sm:w-60 mx-auto mt-8 sm:mt-8 md:mt-8 lg:mt-7 xl:mt-6 bg-[rgb(60,60,60)] text-white text-sm font-semibold py-3 rounded-lg hover:bg-gray-800 transition">
                  GO TO CHECKOUT
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;