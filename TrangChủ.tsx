import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { Link } from "react-router";

export interface CartItem {
  id: string;
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  toppings?: { id: string; name: string; price: number }[];
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">, showToast?: boolean) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("alovux_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("alovux_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, "id">, showToast = true) => {
    const id = `${item.dishId}_${item.size || "default"}_${Date.now()}`;
    setItems((prev) => [...prev, { ...item, id }]);

    if (showToast) {
      toast.success(`Đã thêm ${item.name} vào giỏ hàng`, {
        duration: 3000,
        action: {
          label: "Xem giỏ hàng",
          onClick: () => {
            window.location.href = "/cart";
          },
        },
        cancel: {
          label: "Tiếp tục",
          onClick: () => {},
        },
      });
    }
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce((sum, item) => {
    const toppingsPrice = item.toppings?.reduce((tSum, t) => tSum + t.price, 0) || 0;
    return sum + (item.price + toppingsPrice) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
