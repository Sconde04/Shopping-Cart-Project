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
      <div className="container mx-auto p-8">
        <h1 className="flex justify-center text-3xl font-bold mb-2 mt-4">
          Shopping Cart
        </h1>
        <p className="flex justify-center text-gray-600 mb-14">
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
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <OrderList
                items={cartItems}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            </div>
            <div>
              <Summary
                totalItems={totalItems}
                subtotal={subtotal}
                totalPrice={totalPrice}
              />
              <Link to="/checkout">
                <button className="flex justify-center w-60 mx-auto mt-4 bg-[rgb(60,60,60)] text-white text-sm font-semibold py-3 rounded-lg hover:bg-gray-800 transition">
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
