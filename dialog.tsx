import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </CartProvider>
    </AuthProvider>
  );
}