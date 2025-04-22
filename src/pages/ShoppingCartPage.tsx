// src/pages/ShoppingCart.tsx
import React, { useState } from 'react';
import CartItem from '../components/CartItem';
import Summary from '../components/Summary';

const ShoppingCartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    { name: 'Concert Name', price: 95, discountedPrice: 70, quantity: 1 },
    { name: 'Product Name', price: 54, discountedPrice: 54, quantity: 2 },
  ]);

  const handleIncrease = (index: number) => {
    const newItems = [...cartItems];
    newItems[index].quantity += 1;
    setCartItems(newItems);
  };

  const handleDecrease = (index: number) => {
    const newItems = [...cartItems];
    if (newItems[index].quantity > 1) {
      newItems[index].quantity -= 1;
      setCartItems(newItems);
    }
  };

  const handleRemove = (index: number) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newItems);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>
      <p className="text-gray-600 mb-8">Shipping charges and discount codes are confirmed at checkout.</p>
      
      <div className="mb-6">
        {cartItems.map((item, index) => (
          <CartItem
            key={index}
            name={item.name}
            price={item.price}
            discountedPrice={item.discountedPrice}
            quantity={item.quantity}
            onIncrease={() => handleIncrease(index)}
            onDecrease={() => handleDecrease(index)}
            onRemove={() => handleRemove(index)}
          />
        ))}
      </div>

      <Summary totalItems={totalItems} totalPrice={totalPrice} />
    </div>
  );
};

export default ShoppingCartPage;