// src/components/OrderList.tsx
import React from 'react';
import CartItem from './CartItem';

type OrderListProps = {
  items: Array<{
    name: string;
    price: number;
    discountedPrice: number;
    quantity: number;
  }>;
  onIncrease: (index: number) => void;
  onDecrease: (index: number) => void;
  onRemove: (index: number) => void;
};

const OrderList: React.FC<OrderListProps> = ({
  items,
  onIncrease,
  onDecrease,
  onRemove,
}) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Your order</h2>
    <div>
      {items.map((item, i) => (
        <CartItem
          key={i}
          name={item.name}
          price={item.price}
          discountedPrice={item.discountedPrice}
          quantity={item.quantity}
          onIncrease={() => onIncrease(i)}
          onDecrease={() => onDecrease(i)}
          onRemove={() => onRemove(i)}
          isFirst={i === 0}
          isLast={i === items.length - 1}
        />
      ))}
    </div>
  </div>
);

export default OrderList;