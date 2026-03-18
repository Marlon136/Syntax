import Image from "next/image";

export function LoginView() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#FEF9F3] text-[#264653]">
      <header className="sticky top-0 z-20 border-b border-[#2A9D8F]/10 bg-white/80 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F4A261] text-white shadow-lg">
              <span className="material-symbols-outlined">code</span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none">Syntax</h1>
              <p className="text-xs text-[#264653]/60">Learn Smarter</p>
            </div>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <button
              type="button"
              className="flex items-center gap-2 text-sm font-semibold text-[#264653] transition-colors hover:text-[#F4A261]"
            >
              <span className="h-5 w-5 overflow-hidden rounded-full border border-gray-200">
                <Image
                  alt="Bandera de Espana"
                  className="h-full w-full object-cover"
                  src="https://flagcdn.com/w20/es.png"
                  width={20}
                  height={20}
                />
              </span>
              Espanol
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
            <a href="#" className="text-sm font-semibold text-[#264653] transition-colors hover:text-[#F4A261]">
              Documentation
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-[440px]">
          <section className="rounded-xl border border-[#F4A261]/10 bg-white p-8 shadow-xl md:p-10">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#2A9D8F]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2A9D8F]">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                Racha diaria: 0
              </div>
              <h2 className="mb-2 text-3xl font-bold">Bienvenido de nuevo</h2>
              <p className="text-gray-500">Listo para mejorar tu codigo hoy?</p>
            </div>

            <form className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="email">
                  Correo Electronico
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-base transition-all outline-none focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/20"
                  id="email"
                  name="email"
                  placeholder="dev@syntax.io"
                  type="email"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="password">
                    Contrasena
                  </label>
                  <a href="#" className="text-xs font-bold text-[#2A9D8F] hover:underline">
                    Olvidaste tu contrasena?
                  </a>
                </div>
                <div className="relative">
                  <input
                    className="block w-full rounded-lg border border-gray-200 bg-gray-50 p-3 pr-12 text-base transition-all outline-none focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/20"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors hover:text-[#2A9D8F]"
                  >
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 text-[#2A9D8F] focus:ring-[#2A9D8F]"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                Mantener sesion iniciada
              </label>

              <button
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#F4A261] px-4 py-3.5 font-bold text-[#264653] shadow-lg shadow-[#F4A261]/20 transition-all active:scale-[0.98] hover:opacity-90"
                type="submit"
              >
                Entrar a la Consola
                <span className="material-symbols-outlined text-xl">login</span>
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className="bg-white px-4 font-medium text-gray-400">O continuar con</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2.5 transition-colors hover:bg-gray-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-sm font-semibold text-gray-700">Google</span>
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2.5 transition-colors hover:bg-gray-50"
              >
                <svg className="h-5 w-5 fill-[#264653]" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">GitHub</span>
              </button>
            </div>
          </section>

          <p className="mt-8 text-center text-sm text-gray-600">
            No tienes una cuenta?{" "}
            <a href="#" className="font-bold text-[#2A9D8F] transition-colors hover:text-[#F4A261]">
              Comienza tu busqueda ahora
            </a>
          </p>
        </div>
      </main>

      <div className="pointer-events-none fixed left-10 top-20 -z-10 h-64 w-64 rounded-full bg-[#F4A261]/10 blur-3xl" />
      <div className="pointer-events-none fixed bottom-20 right-10 -z-10 h-96 w-96 rounded-full bg-[#2A9D8F]/10 blur-3xl" />

      <footer className="p-8 text-center text-xs text-gray-500">
        © 2026 Syntax Learning Systems. All rights reserved.
      </footer>
    </div>
  );
}
