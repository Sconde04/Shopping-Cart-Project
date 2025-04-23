// src/components/Summary.tsx
import React from 'react';

type SummaryProps = {
  totalItems: number;
  totalPrice: number;
};

const Summary: React.FC<SummaryProps> = ({ totalItems, totalPrice }) => (
  <div className="space-y-4"> {/* Contenedor vertical con espacio entre elementos */}
    {/* Título fuera de la caja */}
    <h2 className="text-xl font-semibold">Summary</h2>

    {/* Caja blanca con los totales */}
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between mb-2">
        <span>Items in the Cart</span>
        {/* Colocar precio de items en el carrito sin aplicar descuento */}
        <span>${totalItems.toFixed(2)}</span>
      </div>
      <div className="w-63 h-px bg-gray-200 mx-auto my-6" />
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>

    {/* Botón fuera de la caja, ocupando todo el ancho de la caja de totales */}
    <button className="flex justify-center w-60 mx-auto bg-[rgb(60,60,60)] text-white text-sm font-semibold py-3 rounded-lg hover:bg-gray-800 transition">
      GO TO CHECKOUT
    </button>
  </div>
);

export default Summary;