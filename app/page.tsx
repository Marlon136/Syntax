import Link from "next/link";

export default function Home() {
  const routes = [
    { href: "/home", title: "Home", subtitle: "Pagina principal con cursos y stats" },
    { href: "/login", title: "Login", subtitle: "Ingreso funcional" },
    { href: "/leaderboard", title: "Leaderboard", subtitle: "Clasificacion interactiva" },
    { href: "/learningPath", title: "Learning Path", subtitle: "Ruta de aprendizaje editable" },
    { href: "/premium", title: "Premium", subtitle: "Vista premium" },
    { href: "/unlockPro", title: "Unlock Pro", subtitle: "Conversion a plan pro" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-10 text-[#264653] md:px-10">
      <main className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-black tracking-tight">Rutas de Syntax</h1>
        <p className="mt-2 text-base text-gray-500">Selecciona una pagina para verla en el navegador.</p>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-xs font-black uppercase tracking-widest text-[#F4A261]">{route.href}</p>
              <h2 className="mt-2 text-xl font-black">{route.title}</h2>
              <p className="mt-1 text-sm text-gray-500">{route.subtitle}</p>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
