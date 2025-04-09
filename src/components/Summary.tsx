// src/components/Summary.tsx
import React from 'react';

type SummaryProps = {
  totalItems: number;
  totalPrice: number;
};

const Summary: React.FC<SummaryProps> = ({ totalItems, totalPrice }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">Summary</h3>
      <div className="mt-4">
        <p>Items in the Cart: {totalItems}</p>
        <p>Total: ${totalPrice.toFixed(2)}</p>
      </div>
      <button className="w-full bg-black text-white py-2 mt-4 rounded-lg hover:bg-gray-800 transition">
        Go to Checkout
      </button>
    </div>
  );
};

export default Summary;