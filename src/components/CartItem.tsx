// src/components/CartItem.tsx
import React from 'react';

type CartItemProps = {
  name: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

const CartItem: React.FC<CartItemProps> = ({
  name,
  price,
  discountedPrice,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-gray-300"></div> {/* Placeholder image */}
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">You save {((price - discountedPrice) / price) * 100}%</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={onDecrease} className="text-xl text-gray-500">-</button>
        <span className="text-lg">{quantity}</span>
        <button onClick={onIncrease} className="text-xl text-gray-500">+</button>
      </div>
      <div className="text-lg font-semibold text-green-600">${discountedPrice * quantity}</div>
      <button onClick={onRemove} className="text-red-500">Remove</button>
    </div>
  );
};

export default CartItem;