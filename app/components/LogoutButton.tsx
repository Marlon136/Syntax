"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Elimina la cookie estableciendo una fecha pasada
      document.cookie = "syntax-auth=; Path=/; Max-Age=0";

      // Pequeño delay para asegurar que la cookie se borre
      await new Promise((resolve) => setTimeout(resolve, 100));

      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold text-sm hover:bg-red-100 transition-colors disabled:opacity-50"
      aria-label="Cerrar sesión"
    >
      <span className="material-symbols-outlined text-base">logout</span>
      {isLoading ? "Cerrando..." : "Cerrar sesión"}
    </button>
  );
}
