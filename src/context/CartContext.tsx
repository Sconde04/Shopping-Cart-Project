import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
<<<<<<< HEAD
import { addToCart, removeFromCart, updateCartItem, getCart, CartItem } from '../services/api';
import { useAlert } from './AlertContext';
=======
import { addToCart, removeFromCart, updateCartItem, getCart } from '../services/api';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  image?: string;
  description?: string;
  place?: string;
  date?: string;
  time?: string;
}
>>>>>>> 4b21c4a (Implement Cart Context and integrate API cart functionality across components)

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
<<<<<<< HEAD
  limitMoreTickets: (quantity: number, eventId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const maxTicketsPurchase = 6;
=======
}

const CartContext = createContext<CartContextType | undefined>(undefined);
>>>>>>> 4b21c4a (Implement Cart Context and integrate API cart functionality across components)

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
<<<<<<< HEAD
  const { showAlert } = useAlert();
=======
>>>>>>> 4b21c4a (Implement Cart Context and integrate API cart functionality across components)

  // Calculate totals
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0);

<<<<<<< HEAD
  // Load cart from API
=======
  // Load cart from API on mount
>>>>>>> 4b21c4a (Implement Cart Context and integrate API cart functionality across components)
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

<<<<<<< HEAD
  // Function to limit the number of tickets that can be purchased
  const limitMoreTickets = (quantity: number, eventId: string): boolean => {
    const currentEventTickets = cartItems.find(item => item.id === eventId)?.quantity || 0;
    return currentEventTickets + quantity <= maxTicketsPurchase;
  };

  // Add item to cart
  const addItem = async (item: CartItem) => {
    if (!limitMoreTickets(item.quantity, item.id)) {
      showAlert(`Cannot add more tickets for this event. Maximum limit is ${maxTicketsPurchase} tickets per event.`, 'error');
      return;
    }

    setIsLoading(true);
    try {
      await addToCart(item);
      const existingItemIndex = cartItems.findIndex(i => i.id === item.id);
      
      // Verify if the item already exists in the cart to avoid duplicates
      if (existingItemIndex >= 0) {
=======
  // Add item to cart
  const addItem = async (item: CartItem) => {
    setIsLoading(true);
    try {
      await addToCart(item);
      // Optimistic update
      const existingItemIndex = cartItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // If item exists, update quantity
>>>>>>> 4b21c4a (Implement Cart Context and integrate API cart functionality across components)
        const updatedItems = [...cartItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        setCartItems(updatedItems);
      } else {
<<<<<<< HEAD
        setCartItems([...cartItems, item]);
      }
    } catch (err) {
      setError('Failed to add item to cart. Please reload the page and try again.');
=======
        // If new item, add to cart
        setCartItems([...cartItems, item]);
      }
    } catch (err) {
      setError('Failed to add item to cart. Please try again.');
>>>>>>> 4b21c4a (Implement Cart Context and integrate API cart functionality across components)
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
<<<<<<< HEAD
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (err) {
      setError('Failed to remove item from cart. Please reload the page and try again.');
=======
      // Optimistic update
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (err) {
      setError('Failed to remove item from cart. Please try again.');
>>>>>>> 4b21c4a (Implement Cart Context and integrate API cart functionality across components)
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateItem = async (id: string, quantity: number) => {
    if (quantity < 1) return;
<<<<<<< HEAD

    const currentItem = cartItems.find(item => item.id === id);
    if (currentItem) {
      if (quantity > maxTicketsPurchase) {
        showAlert(`Cannot update quantity. Maximum limit is ${maxTicketsPurchase} tickets per event.`, 'error');
        return;
      }
    }
=======
>>>>>>> 4b21c4a (Implement Cart Context and integrate API cart functionality across components)
    
    setIsLoading(true);
    try {
      await updateCartItem(id, quantity);
<<<<<<< HEAD
=======
      // Optimistic update
>>>>>>> 4b21c4a (Implement Cart Context and integrate API cart functionality across components)
      setCartItems(
        cartItems.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      );
    } catch (err) {
<<<<<<< HEAD
      showAlert('Failed to update cart. Please try again.', 'error');
=======
      setError('Failed to update cart. Please try again.');
>>>>>>> 4b21c4a (Implement Cart Context and integrate API cart functionality across components)
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
<<<<<<< HEAD
        error,
        limitMoreTickets
=======
        error
>>>>>>> 4b21c4a (Implement Cart Context and integrate API cart functionality across components)
      }}
    >
      {children}
    </CartContext.Provider>
  );
}; 