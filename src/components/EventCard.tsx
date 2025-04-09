import React from "react";
import CartIcon from "./CartIcon";

type EventProps = {
  image: string;
  title: string;
  description: string;
  date: string;
  price: number;
  discount?: number; // Opcional: descuento sobre el precio original
};

const EventCard: React.FC<EventProps> = ({
  image,
  title,
  description,
  date,
  price,
  discount,
}) => {
  const discountedPrice = discount ? price * (1 - discount / 100) : price;
  
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm mx-auto">
      <img src={image} alt={title} className="w-full h-56 object-cover rounded-xl mb-4" />

      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-gray-700 text-sm mb-4">{description}</p>
      <p className="text-sm text-gray-600 mb-2">{date}</p>
      
      {/* Precio con descuento */}
      <div className="flex items-center justify-between">
        {discount && (
          <span className="text-md text-red-500 line-through">{price.toFixed(2)} $</span>
        )}
        <span className="text-lg font-semibold text-green-600">{discountedPrice.toFixed(2)} $</span>
      </div>

      {/* Botón de añadir al carrito */}
      <button className="w-full mt-4 py-2 px-4 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition flex items-center justify-center gap-2">
        {/* Ícono del carrito */}
        <CartIcon className="w-6 h-6" /> {/* Añadimos tamaños específicos al icono */}
        {/* Texto centrado */}
        <span>Add to cart</span>
      </button>
    </div>
  );
};

export default EventCard;