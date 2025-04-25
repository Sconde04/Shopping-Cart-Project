import React from 'react';

type SummaryProps = {
  totalItems: number;
  subtotal: number;  // Total price without discount
  totalPrice: number; // Total price with discount applied
};

const Summary: React.FC<SummaryProps> = ({ totalItems, subtotal, totalPrice }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Summary</h2>

    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between mb-2">
        <span>Items in the Cart ({totalItems})</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      
      <div className="w-full h-px bg-gray-200 my-6" />
      
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>

    <button className="flex justify-center w-60 mx-auto bg-[rgb(60,60,60)] text-white text-sm font-semibold py-3 rounded-lg hover:bg-gray-800 transition">
      GO TO CHECKOUT
    </button>
  </div>
);

export default Summary;