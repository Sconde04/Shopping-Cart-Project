import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { addToCart, removeFromCart, updateCartItem, getCart, CartItem } from '../services/api';

interface CartContextType {
  cartItems: CartItem[];
  totalItems: number;
  subtotal: number;
  totalPrice: number;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateItem: (id: string, quantity: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate totals
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0);

  // Load cart from API on mount
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        const data = await getCart();
        setCartItems(data);
      } catch (err) {
        setError('Failed to load cart. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Add item to cart
  const addItem = async (item: CartItem) => {
    setIsLoading(true);
    try {
      await addToCart(item);
      // Optimistic update
      const existingItemIndex = cartItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // If item exists, update quantity
        const updatedItems = [...cartItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        setCartItems(updatedItems);
      } else {
        // If new item, add to cart
        setCartItems([...cartItems, item]);
      }
    } catch (err) {
      setError('Failed to add item to cart. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = async (id: string) => {
    setIsLoading(true);
    try {
      await removeFromCart(id);
      // Optimistic update
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (err) {
      setError('Failed to remove item from cart. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateItem = async (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setIsLoading(true);
    try {
      await updateCartItem(id, quantity);
      // Optimistic update
      setCartItems(
        cartItems.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      setError('Failed to update cart. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        subtotal,
        totalPrice,
        addItem,
        removeItem,
        updateItem,
        isLoading,
        error
      }}
    >
      {children}
    </CartContext.Provider>
  );
}; 