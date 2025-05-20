// src/pages/Checkout.tsx
import React from "react";
import BuyerInfoCard from "../components/BuyerInfoCard";
import Summary from "../components/Summary";
import OrderList from "../components/OrderList";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import { useCart } from "../context/CartContext";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

const CheckoutPage: React.FC = () => {
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
        <h1 className="flex justify-center text-3xl font-bold mb-14 mt-4">
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="md:col-span-2">
            <BuyerInfoCard />
            {!isLoading && !error && cartItems.length > 0 && (
              <div className="mt-10">
                <OrderList
                  items={cartItems}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onRemove={handleRemove}
                />
              </div>
            )}
            <div className="mt-10">
              <PaymentMethodSelector />
              <Link to="/thank-you">
                <Button
                  label="COMPLETE PURCHASE"
                  onClick={() => {
                    /* Tenemos que añadir el enlace a la poagina de thank you (PENDINENTE) */
                  }}
                  className="w-full font-semibold text-lg h-12"
                />
              </Link>
            </div>
            <div className="text-center text-gray-500 text-sm mt-4 px-10">
              <p>
                By clicking "Complete Purchase", Ic onfirm that I am aware and
                accept that I am obligued to pay for my order, I accept the
                Terms and Conditions and confirm that I have read the Privacy
                Policy.
              </p>
            </div>
          </div>
          <div className="mt-1">
            <Summary
              totalItems={totalItems}
              subtotal={subtotal}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
