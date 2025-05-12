// src/components/OrderList.tsx
import React from 'react';
import CartItem from './CartItem';
import { CartItem as CartItemType } from '../services/api';

type OrderListProps = {
  items: CartItemType[];
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
          key={item.id}
          name={item.name}
          price={item.price}
          discountedPrice={item.discountedPrice}
          quantity={item.quantity}
          image={item.image}
          description={item.description}
          place={item.place}
          date={item.date}
          time={item.time}
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