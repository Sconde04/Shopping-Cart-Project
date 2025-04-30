// src/pages/ShoppingCartPage.tsx
import React, { useState } from 'react';
import OrderList from '../components/OrderList';
import Summary from '../components/Summary';

const ShoppingCartPage: React.FC = () => {
  const [items, setItems] = useState([
    { name: 'Concert Name', price: 95, discountedPrice: 70, quantity: 1 },
    { name: 'Product Name', price: 54, discountedPrice: 54, quantity: 2 },
    { name: 'Product Name', price: 54, discountedPrice: 54, quantity: 2 },
  ]);

  const handleIncrease = (idx: number) => {
    const c = [...items];
    c[idx].quantity++;
    setItems(c);
  };
  const handleDecrease = (idx: number) => {
    const c = [...items];
    if (c[idx].quantity > 1) c[idx].quantity--;
    setItems(c);
  };
  const handleRemove = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  // Calculate total number of items
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  
  // Calculate total prices without discount (subtotal)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  
  // Calculate total price with discounts applied
  const totalPrice = items.reduce((sum, i) => sum + i.discountedPrice * i.quantity, 0);

  return (
    <div className="container mx-auto p-8 mt-6">
      <h1 className="flex justify-center text-3xl font-bold mb-2">Shopping Cart</h1>
      <p className="flex justify-center text-gray-600 mb-14">
        Shipping charges and discount codes are confirmed at checkout.
      </p>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <OrderList
            items={items}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
          />
        </div>
        <div>
          <Summary totalItems={totalItems} subtotal={subtotal} totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;