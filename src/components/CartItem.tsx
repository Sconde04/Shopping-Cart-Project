// src/components/CartItem.tsx
import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';

type CartItemProps = {
  name: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  image?: string;
  description?: string;
  place?: string;
  date?: string;
  time?: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  isFirst?: boolean;
  isLast?: boolean;
};

const CartItem: React.FC<CartItemProps> = ({
  name,
  price,
  discountedPrice,
  quantity,
  image,
  description,
  place,
  date,
  time,
  onIncrease,
  onDecrease,
  onRemove,
  isFirst = false,
  isLast = false,
}) => {
  const savedPercent = price && discountedPrice ? Math.round((1 - discountedPrice / price) * 100) : 0;
  const hasDiscount = price && discountedPrice && discountedPrice < price;

  // Apply conditional classes for rounded borders
  const containerClasses = `py-10 px-6 flex items-center bg-white ${
    isFirst ? 'rounded-t-lg' : ''
  } ${isLast ? 'rounded-b-lg' : ''}`;

  return (
    <>
      <div className={containerClasses}>
        {/* 1. Img align to left */}
        <div className="flex-shrink-0 w-24 h-32 bg-gray-200 rounded-md overflow-hidden">
          {image && <img src={image} alt={name} className="w-full h-full object-cover" />}
        </div>

        {/* 2. Main content */}
        <div className="flex-1 ml-6 flex">
          {/* Column left with name and quantity control */}
          <div className="flex-1">
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            
            {/* Additional info */}
            {description && (
              <p className="text-lg font-bold text-gray-600 mb-16 line-clamp-1">{description}</p>
            )}
            
            {/* Quantity Control */}
            <div className="mt-4">
              <div className="flex border-2 border-gray-300 rounded w-24">
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-full text-center py-1"
                />
                <div className="flex flex-col border-l-2 border-gray-300">
                  <button
                    onClick={onIncrease}
                    className="flex items-center justify-center h-4 hover:bg-gray-100"
                  >
                    <HiChevronUp className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={onDecrease}
                    className="flex items-center justify-center h-4 hover:bg-gray-100 border-t-2 border-gray-300"
                  >
                    <HiChevronDown className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Column right with price and delete button */}
          <div className="flex flex-col items-end justify-between">
            {/* Delete Button */}        
            <button
              onClick={onRemove}
              className="p-2 bg-gray-100 hover:bg-gray-300 rounded-sm transition-colors"
            >
              <FiTrash2 className="w-5 h-5 text-gray-500" />
            </button>

            {/* Price */}
            <div className="text-right">
              {hasDiscount && (
                <div className="flex items-baseline justify-end space-x-2">
                  <span className="text-lg text-gray-500 line-through">
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-xl font-bold text-black">
                    ${discountedPrice.toFixed(2)}
                  </span>
                </div>
              )}
              {!hasDiscount && discountedPrice && (
                <span className="text-xl font-bold text-black">
                  ${discountedPrice.toFixed(2)}
                </span>
              )}
              {hasDiscount && (
                <p className="text-sm text-gray-600 mt-1">
                  You save {savedPercent}%
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Separator, except for the last element */}
      {!isLast && <div className="h-px bg-gray-200 mx-4" />}
    </>
  );
};

export default CartItem;