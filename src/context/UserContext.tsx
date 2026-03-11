import React, { createContext, useContext, useState, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  items: { name: string; quantity: number; price: number; image: string }[];
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  circularPreference: boolean;
  addresses: Address[];
  orders: Order[];
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => void;
  toggleCircularPreference: () => void;
}

const mockOrders: Order[] = [
  {
    id: "ORD-2026-001",
    date: "2026-03-08",
    status: "Delivered",
    total: 24.47,
    items: [
      { name: "Organic Greek Yogurt", quantity: 2, price: 3.49, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=80&h=80&fit=crop" },
      { name: "Artisan Sourdough Bread", quantity: 1, price: 4.99, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&h=80&fit=crop" },
    ],
  },
  {
    id: "ORD-2026-002",
    date: "2026-03-05",
    status: "Shipped",
    total: 32.97,
    items: [
      { name: "Premium Olive Oil", quantity: 1, price: 14.99, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=80&h=80&fit=crop" },
      { name: "Kombucha Variety Pack", quantity: 1, price: 9.99, image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=80&h=80&fit=crop" },
    ],
  },
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [circularPreference, setCircularPreference] = useState(true);
  const [addresses] = useState<Address[]>([
    { id: "a1", label: "Home", street: "123 Green Lane", city: "Portland", state: "OR", zip: "97201", country: "US", isDefault: true },
  ]);

  const login = useCallback((_email: string, _password: string) => {
    setUser({ id: "u1", name: "Alex Chen", email: _email });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const register = useCallback((name: string, email: string, _password: string) => {
    setUser({ id: "u1", name, email });
  }, []);

  const toggleCircularPreference = useCallback(() => {
    setCircularPreference((p) => !p);
  }, []);

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated: !!user, circularPreference, addresses, orders: mockOrders, login, logout, register, toggleCircularPreference }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
