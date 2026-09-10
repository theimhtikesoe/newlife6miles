import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  pricePerCap: number;
  capSize: number;
  cardQuantity: number;
  totalCaps: number;
  totalPrice: number;
  productImage?: string;
  unitType?: "bottle" | "cap";
}

export interface CustomerInfo {
  name: string;
  phone: string;
  city: string;
  notes?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  updateItem: (id: string, item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getGrandTotal: () => number;
  getTotalItems: () => number;
  customerInfo: CustomerInfo | null;
  setCustomerInfo: (info: CustomerInfo) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = "new-life-customer-cart";
const CUSTOMER_STORAGE_KEY = "new-life-customer-info";

const readStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>(() => readStorage(CART_STORAGE_KEY, []));
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(() =>
    readStorage<CustomerInfo | null>(CUSTOMER_STORAGE_KEY, null)
  );

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (customerInfo) {
      window.localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerInfo));
    } else {
      window.localStorage.removeItem(CUSTOMER_STORAGE_KEY);
    }
  }, [customerInfo]);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    const newItem: CartItem = {
      ...item,
      id: crypto.randomUUID(),
    };
    setItems((prev) => [...prev, newItem]);
  }, []);

  const updateItem = useCallback((id: string, item: Omit<CartItem, "id">) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...item, id } : i))
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCustomerInfo(null);
    window.localStorage.removeItem(CART_STORAGE_KEY);
    window.localStorage.removeItem(CUSTOMER_STORAGE_KEY);
  }, []);

  const getGrandTotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [items]);

  const getTotalItems = useCallback(() => {
    return items.length;
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        removeItem,
        clearCart,
        getGrandTotal,
        getTotalItems,
        customerInfo,
        setCustomerInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
