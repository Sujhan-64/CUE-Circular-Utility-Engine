import React, { createContext, useContext, useState, useCallback } from "react";
import { Product } from "@/data/products";
import { toast } from "sonner";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  saveForLater: (productId: string) => void;
  savedItems: CartItem[];
  moveToCart: (productId: string) => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
    if (product.isCircularDeal) {
      toast(`You just saved ${product.name} from waste.`);
    } else {
      toast(`${product.name} added to cart.`);
    }
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const saveForLater = useCallback((productId: string) => {
    const item = items.find((i) => i.product.id === productId);
    if (item) {
      setSavedItems((prev) => [...prev, item]);
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      toast("Item saved for later.");
    }
  }, [items]);

  const moveToCart = useCallback((productId: string) => {
    const item = savedItems.find((i) => i.product.id === productId);
    if (item) {
      setItems((prev) => [...prev, item]);
      setSavedItems((prev) => prev.filter((i) => i.product.id !== productId));
    }
  }, [savedItems]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + (i.product.originalPrice || i.product.price) * i.quantity, 0);
  const discount = items.reduce((sum, i) => {
    if (i.product.originalPrice) {
      return sum + (i.product.originalPrice - i.product.price) * i.quantity;
    }
    return sum;
  }, 0);
  const shipping = subtotal > 35 ? 0 : 4.99;
  const total = subtotal - discount + shipping;

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, saveForLater, savedItems, moveToCart, totalItems, subtotal, discount, shipping, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
