import React from "react";
import CartIcon from "./CartIcon";

type EventProps = {
  image: string;
  title: string;
  description: string;
  place: string;
  date: string;
  time: string;
  price: number;
  discount?: number;
};

const EventCard: React.FC<EventProps> = ({
  image,
  title,
  description,
  place,
  date,
  time,
  price,
  discount,
}) => {
  const discountedPrice = discount ? price * (1 - discount / 100) : price;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col h-full">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <p className="text-sm text-gray-600 mb-3">{place}</p>
      <p className="text-sm text-gray-600 mb-2">{date} - {time}</p>

      <div className="flex items-center mt-auto">
        <span className="text-lg font-semibold text-black mr-3">
          {discountedPrice.toFixed(2)} $
        </span>
        {discount && (
          <span className="text-lg text-gray-400 line-through mr-3">
            {price.toFixed(2)} $
          </span>
        )}
        {discount && (
          <span className="text-lg font-semibold text-black mr-3">
            -{discount}%
          </span>
        )}
      </div>

      {/* Add to cart button */}
      <button className="w-full mt-4 py-2 px-4 bg-[rgb(60,60,60)] text-white text-sm font-semibold rounded-xl hover:bg-black transition flex items-center justify-center relative">
        {/* Icon of cart align to right */}
        <CartIcon className="w-6 h-6 absolute left-4" /> {/* Use absolute to position it */}
        {/* Text center */}
        <span className="text-center w-full">ADD TO CART</span>
      </button>
    </div>
  );
};

export default EventCard;