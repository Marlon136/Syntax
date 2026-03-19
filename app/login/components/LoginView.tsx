"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import { Eye, EyeOff, LogIn, Sparkles } from "lucide-react";

export function LoginView() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [rememberMe, setRememberMe] = useState(false);
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

    await new Promise(r => setTimeout(r, 700));


    if (rememberMe) {
      localStorage.setItem("syntax-user-email", email);
    } else {
      localStorage.removeItem("syntax-user-email");
    }


    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : undefined;

    const cookieParts = [
      "syntax-auth=1",
      "Path=/",
      "SameSite=Lax",
      ...(maxAge ? [`Max-Age=${maxAge}`] : []),
    ];

    document.cookie = cookieParts.join("; ");


    setMessage("Sesión iniciada. Redirigiendo...");

    const redirectTo =
      searchParams?.get("from") || "/learningPath";

    setTimeout(() => {
      router.push(redirectTo);
      router.refresh();
    }, 500);
  };



  return (

    <div className="min-h-screen flex items-center justify-center bg-[#FEF9F3] px-4">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-xl shadow-xl border border-[#F4A261]/20 p-8">

          {/* HEADER */}

          <div className="text-center mb-6">

            <div className="inline-flex items-center gap-2 bg-[#2A9D8F]/10 px-3 py-1 rounded-full text-xs font-bold text-[#2A9D8F] mb-3">

              <Sparkles size={16} />

              Daily streak: 0

            </div>

            <h2 className="text-3xl font-bold text-[#264653]">
              Bienvenido de nuevo
            </h2>

            <p className="text-gray-500">
              Inicia sesión para continuar
            </p>

          </div>



          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div>

              <label className="text-sm font-semibold">
                Correo
              </label>

              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="dev@syntax.io"
                className="w-full mt-1 p-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-[#2A9D8F]/20 outline-none"
              />

            </div>



            {/* PASSWORD */}

            <div>

              <div className="flex justify-between text-sm mb-1">

                <label className="font-semibold">
                  Contraseña
                </label>

                <Link
                  href="/unlockPro"
                  className="text-[#2A9D8F] font-bold"
                >
                  Olvidaste?
                </Link>

              </div>

              <div className="relative">

                <input
                  type={
                    isPasswordVisible
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={e =>
                    setPassword(e.target.value)
                  }
                  className="w-full p-3 rounded-lg border bg-gray-50 pr-10 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setIsPasswordVisible(v => !v)
                  }
                  className="absolute right-3 top-3 text-gray-500 hover:text-[#2A9D8F]"
                >
                  {isPasswordVisible
                    ? <EyeOff size={18} />
                    : <Eye size={18} />
                  }
                </button>

              </div>

            </div>



            {/* REMEMBER */}

            <label className="flex gap-2 text-sm">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e =>
                  setRememberMe(e.target.checked)
                }
              />

              Mantener sesión

            </label>



            {/* ERROR */}

            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            {message && (
              <p className="text-[#2A9D8F] text-sm">
                {message}
              </p>
            )}



            {/* BUTTON */}

            <button
              disabled={isSubmitting}
              className="w-full bg-[#F4A261] text-[#264653] font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90"
            >

              {isSubmitting
                ? "Entrando..."
                : "Entrar"}

              <LogIn size={18} />

            </button>

          </form>



          {/* FOOTER */}

          <p className="text-center text-sm mt-6">

            No tienes cuenta?{" "}

            <Link
              href="/premium"
              className="text-[#2A9D8F] font-bold"
            >
              Hazte premium
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}