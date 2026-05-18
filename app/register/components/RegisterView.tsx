"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Eye, EyeOff, Sparkles } from "lucide-react";
import { useLanguage } from "@/app/providers/LanguageProvider";
import { postJson } from "@/lib/api";
import { setAuthToken, setAuthEmail } from "@/lib/auth";

export function RegisterView() {
  const router = useRouter();
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError(null);
    setMessage(null);

    if (!isValidEmail(email)) {
      setError("Ingresa un correo válido");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await postJson<{ access_token: string; user: { email: string } }>(
        "/auth/register",
        {
          name: name || undefined,
          email,
          password,
        }
      );

      setAuthToken(result.access_token);
      setAuthEmail(result.user.email);
      localStorage.setItem("syntax-user-email", result.user.email);

      setMessage("Cuenta creada. Redirigiendo...");
      setTimeout(() => router.push("/learningPath"), 500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al crear la cuenta");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEF9F3] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-xl border border-[#F4A261]/20 p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#2A9D8F]/10 px-3 py-1 rounded-full text-xs font-bold text-[#2A9D8F] mb-3">
              <Sparkles size={16} />
              ¡Bienvenido!
            </div>
            <h2 className="text-3xl font-bold text-[#264653]">Crea tu cuenta</h2>
            <p className="text-gray-500">Regístrate para empezar a aprender con Syntax.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-semibold">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full mt-1 p-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-[#2A9D8F]/20 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Correo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dev@syntax.io"
                className="w-full mt-1 p-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-[#2A9D8F]/20 outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <label className="font-semibold">Contraseña</label>
              </div>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-gray-50 pr-10 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible((v) => !v)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-[#2A9D8F]"
                >
                  {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-[#2A9D8F] text-sm">{message}</p>}

            <button
              disabled={isSubmitting}
              className="w-full bg-[#F4A261] text-[#264653] font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90"
            >
              {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-[#2A9D8F] font-bold">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
