import { create } from 'zustand';
import type { Product } from '../types/product';

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: Date;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;

  
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartItem: (productId: number) => CartItem | undefined;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  
  addToCart: (product: Product, quantity = 1) => {
    const state = get();
    const existingItem = state.items.find((item) => item.product.id === product.id);

    let newItems: CartItem[];

    if (existingItem) {
      
      newItems = state.items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      
      newItems = [
        ...state.items,
        {
          product,
          quantity,
          addedAt: new Date(),
        },
      ];
    }

    
    const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = newItems.reduce((sum, item) => {
      const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
      return sum + discountedPrice * item.quantity;
    }, 0);

    set({
      items: newItems,
      totalItems,
      totalPrice,
    });
  },

  
  removeFromCart: (productId: number) => {
    const state = get();
    const newItems = state.items.filter((item) => item.product.id !== productId);

    
    const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = newItems.reduce((sum, item) => {
      const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
      return sum + discountedPrice * item.quantity;
    }, 0);

    set({
      items: newItems,
      totalItems,
      totalPrice,
    });
  },

  
  updateQuantity: (productId: number, quantity: number) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }

    const state = get();
    const newItems = state.items.map((item) =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );

    
    const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = newItems.reduce((sum, item) => {
      const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
      return sum + discountedPrice * item.quantity;
    }, 0);

    set({
      items: newItems,
      totalItems,
      totalPrice,
    });
  },

  
  clearCart: () => {
    set({
      items: [],
      totalItems: 0,
      totalPrice: 0,
    });
  },

  
  getCartItem: (productId: number) => {
    return get().items.find((item) => item.product.id === productId);
  },
}));
