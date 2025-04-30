// src/services/api.ts
export interface Event {
    id: string;
    image: string;
    title: string;
    description: string;
    date: string;
    time: string;
    place: string;
    price: number;
    discount?: number;
}

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

// Backend expects this structure for cart operations
interface BackendCartRequest {
  item: {
    Id: string;
    quantity: number;
  };
  cart: Array<{
    Id: string;
    quantity: number;
  }>;
}
  
const API_URL = import.meta.env.VITE_API_URL as string;
  
export async function fetchEvents(): Promise<Event[]> {
  const res = await fetch(`${API_URL}/concerts`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

// Local storage cart operations since backend doesn't have a GET /cart endpoint
export async function getCart(): Promise<CartItem[]> {
  try {
    const cartJSON = localStorage.getItem('cart');
    if (!cartJSON) return [];
    return JSON.parse(cartJSON);
  } catch (error) {
    console.error('Error parsing cart from localStorage', error);
    return [];
  }
}

export async function addToCart(item: CartItem): Promise<CartItem> {
  try {
    // Get current cart from local storage
    const currentCart = await getCart();
    
    // Prepare cart item for backend
    const backendCart: BackendCartRequest = {
      item: {
        Id: item.id,
        quantity: item.quantity
      },
      cart: currentCart.map(i => ({
        Id: i.id,
        quantity: i.quantity
      }))
    };
    
    // Send to backend
    const res = await fetch(`${API_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendCart),
    });
    
    if (!res.ok) throw new Error("Failed to add item to cart");
    
    // Update local storage
    const existingItemIndex = currentCart.findIndex(i => i.id === item.id);
    if (existingItemIndex >= 0) {
      currentCart[existingItemIndex].quantity += item.quantity;
    } else {
      currentCart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(currentCart));
    
    return item;
  } catch (error) {
    console.error('Error adding to cart', error);
    throw error;
  }
}

export async function removeFromCart(id: string): Promise<void> {
  try {
    // Get current cart from local storage
    const currentCart = await getCart();
    const itemToRemove = currentCart.find(item => item.id === id);
    
    if (!itemToRemove) throw new Error("Item not found in cart");
    
    // Prepare cart item for backend
    const backendCart: BackendCartRequest = {
      item: {
        Id: id,
        quantity: itemToRemove.quantity
      },
      cart: currentCart.map(i => ({
        Id: i.id,
        quantity: i.quantity
      }))
    };
    
    // Send to backend
    const res = await fetch(`${API_URL}/cart/remove`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendCart),
    });
    
    if (!res.ok) throw new Error("Failed to remove item from cart");
    
    // Update local storage
    const updatedCart = currentCart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  } catch (error) {
    console.error('Error removing from cart', error);
    throw error;
  }
}

export async function updateCartItem(id: string, quantity: number): Promise<CartItem> {
  try {
    // Get current cart from local storage
    const currentCart = await getCart();
    const itemToUpdate = currentCart.find(item => item.id === id);
    
    if (!itemToUpdate) throw new Error("Item not found in cart");
    
    // Calculate quantity difference
    const quantityDifference = quantity - itemToUpdate.quantity;
    
    if (quantityDifference > 0) {
      // Increasing quantity - use add endpoint
      const backendCart: BackendCartRequest = {
        item: {
          Id: id,
          quantity: quantityDifference
        },
        cart: currentCart.map(i => ({
          Id: i.id,
          quantity: i.quantity
        }))
      };
      
      const res = await fetch(`${API_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendCart),
      });
      
      if (!res.ok) throw new Error("Failed to update cart item");
    } else if (quantityDifference < 0) {
      // Decreasing quantity - use remove endpoint
      const backendCart: BackendCartRequest = {
        item: {
          Id: id,
          quantity: Math.abs(quantityDifference)
        },
        cart: currentCart.map(i => ({
          Id: i.id,
          quantity: i.quantity
        }))
      };
      
      const res = await fetch(`${API_URL}/cart/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendCart),
      });
      
      if (!res.ok) throw new Error("Failed to update cart item");
    }
    
    // Update local storage regardless of backend response to keep UI in sync
    const updatedCart = currentCart.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Return updated item
    return { ...itemToUpdate, quantity };
  } catch (error) {
    console.error('Error updating cart item', error);
    throw error;
  }
}