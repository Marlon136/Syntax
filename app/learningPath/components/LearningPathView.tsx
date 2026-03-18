"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Milestone = {
  id: number;
  title: string;
  status: "completed" | "in-progress" | "locked";
  side: "left" | "right";
  progress?: number;
};

const initialMilestones: Milestone[] = [
  { id: 1, title: "Variables y Tipos de Datos", status: "completed", side: "left", progress: 100 },
  { id: 2, title: "Estructuras de Control", status: "completed", side: "right", progress: 100 },
  { id: 3, title: "Principios de POO", status: "in-progress", side: "left", progress: 65 },
  { id: 4, title: "Funciones Avanzadas de Java", status: "locked", side: "right", progress: 0 },
  { id: 5, title: "Proyecto: Sistema Bancario", status: "locked", side: "left", progress: 0 },
];

export function LearningPathView() {
  const [query, setQuery] = useState("");
  const [milestones, setMilestones] = useState(initialMilestones);

  const completedCount = milestones.filter((item) => item.status === "completed").length;
  const inProgress = milestones.find((item) => item.status === "in-progress") ?? null;
  const totalProgress = Math.round(
    milestones.reduce((acc, item) => acc + (item.progress ?? 0), 0) / milestones.length,
  );

  const visibleMilestones = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return milestones;
    }

    return milestones.filter((item) => item.title.toLowerCase().includes(normalized));
  }, [milestones, query]);

  const increaseProgress = () => {
    if (!inProgress) {
      return;
    }

    setMilestones((current) =>
      current.map((item) => {
        if (item.id !== inProgress.id) {
          return item;
        }

        const next = Math.min(100, (item.progress ?? 0) + 10);
        return { ...item, progress: next, status: next >= 100 ? "completed" : "in-progress" };
      }),
    );
  };

  const completeCurrentMilestone = () => {
    setMilestones((current) => {
      let unlocked = false;

      return current.map((item) => {
        if (item.status === "in-progress") {
          return { ...item, status: "completed", progress: 100 };
        }

        if (!unlocked && item.status === "locked") {
          unlocked = true;
          return { ...item, status: "in-progress", progress: 10 };
        }

        return item;
      });
    });
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#264653]">
      <aside className="sticky top-0 hidden h-screen w-64 flex-col bg-[#264653] text-white/80 shadow-2xl lg:flex">
        <div className="flex h-full flex-col justify-between p-6">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F4A261] text-white shadow-lg">
                <span className="material-symbols-outlined">code</span>
              </div>
              <div>
                <h2 className="text-lg font-bold leading-none text-white">Syntax</h2>
                <p className="text-xs text-white/50">Learn Smarter</p>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {[
                ["grid_view", "Panel", "/home"],
                ["map", "Ruta", "/learningPath"],
                ["terminal", "Practica", "/home"],
                ["rocket_launch", "Proyectos", "/premium"],
              ].map(([icon, label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    label === "Ruta"
                      ? "bg-[#F4A261] text-white shadow-md shadow-[#F4A261]/20"
                      : "hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="material-symbols-outlined">{icon}</span>
                  {label}
                </Link>
              ))}
              <Link
                href="/premium"
                className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-white/10 hover:text-white"
              >
                <span className="material-symbols-outlined">settings</span>
                Ajustes
              </Link>
            </nav>
          </div>

          <Link
            href="/unlockPro"
            className="flex items-center gap-3 rounded-lg border-t border-white/10 px-3 pt-4 text-sm font-medium transition-colors hover:text-white"
          >
            <span className="material-symbols-outlined">help</span>
            Centro de Ayuda
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/80 px-4 py-4 backdrop-blur-md md:px-8">
          <div className="flex max-w-md flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3">
            <span className="material-symbols-outlined text-gray-400">search</span>
            <input
              type="text"
              placeholder="Buscar lecciones, conceptos..."
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className="ml-4 flex items-center gap-4 md:gap-6">
            <div className="hidden items-center gap-6 md:flex">
              <Link href="/home" className="text-sm font-medium transition-colors hover:text-[#F4A261]">
                Explorar
              </Link>
              <Link href="/premium" className="text-sm font-medium transition-colors hover:text-[#F4A261]">
                Comunidad
              </Link>
            </div>
            <button className="h-10 rounded-xl bg-[#F4A261] px-4 text-sm font-bold text-white shadow-lg shadow-[#F4A261]/20 transition-all hover:brightness-110 md:px-6">
              Ser Pro
            </button>
            <div
              className="h-10 w-10 rounded-full border-2 border-[#F4A261]/20 bg-cover bg-center ring-4 ring-white"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBwxe7yzi2swbpTdB3L-Rd-wkGR8zpeBLn1kQ7gOUw_5cXEbXhJUdLk3AC2gSo9wIKpdoVSj67wIHvhOshQ3Ss6bGjDcJqaja82N6YtyJmurv27JFJrICDBqQ1teX-bMwMNob8uQSvaX_9sHsoXxlttXEJ_krV5ZojPzMZsAiBUS1YUx_4F7YYeiZ4XHap761v4fJvfdoAQWTuVS4k8owPPPNgFuqyB7IGE5EHeRjc_OkwNdfVUncVxyNqFwvoBuQn4fz74GnhwkK0')",
              }}
            />
          </div>
        </header>

        <div className="mx-auto w-full max-w-5xl p-4 md:p-8 xl:pr-96">
          <section className="mb-10">
            <nav className="mb-1 flex gap-2 text-xs font-semibold uppercase tracking-wider text-[#F4A261]/80">
              <span>Curso</span>
              <span>/</span>
              <span className="text-[#264653]">Especializacion Java</span>
            </nav>
            <h1 className="text-4xl font-black tracking-tight text-[#264653]">Ruta Maestra de Java</h1>
            <p className="mt-2 text-lg text-gray-500">
              Modulo Activo: <span className="font-semibold text-[#264653]">Programacion Orientada a Objetos</span>
            </p>
          </section>

          <section className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              ["Racha de Dias", `${Math.max(1, completedCount * 3)} Dias`, "local_fire_department", "#F59E0B", "Sigue asi!"],
              ["Total XP", `${(completedCount * 3500 + totalProgress * 10).toLocaleString("es-ES")}`, "stars", "#F4A261", "+450 hoy"],
              ["Progreso", `${completedCount}/${milestones.length}`, "check_circle", "#0D9488", "Modulos Completados"],
            ].map(([title, value, icon, iconColor, footer]) => (
              <article
                key={title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{title}</p>
                  <div className="rounded-lg bg-gray-50 p-1.5">
                    <span className="material-symbols-outlined text-xl" style={{ color: iconColor }}>
                      {icon}
                    </span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#264653]">{value}</p>
                <p className="mt-1 text-sm font-medium text-[#2A9D8F]">{footer}</p>
              </article>
            ))}
          </section>

          <section className="relative pb-20">
            <h2 className="mb-16 flex items-center gap-3 text-2xl font-bold text-[#264653]">
              <span className="h-1 w-8 rounded-full bg-[#F4A261]" />
              Tu Hoja de Ruta
            </h2>

            <div className="relative flex flex-col items-center gap-20">
              {visibleMilestones.map((item, index) => {
                const isCompleted = item.status === "completed";
                const isInProgress = item.status === "in-progress";
                const isLocked = item.status === "locked";

                return (
                  <div key={item.title} className="relative z-10 flex w-full justify-center">
                    <div
                      className={`flex items-center justify-center rounded-full border-4 border-white ${
                        isInProgress
                          ? "h-28 w-28 border-[#F4A261] bg-white ring-8 ring-[#F4A261]/5"
                          : isCompleted
                            ? "h-20 w-20 bg-[#F4A261] shadow-xl shadow-[#F4A261]/30"
                            : "h-20 w-20 bg-gray-100 text-gray-400 shadow-inner"
                      }`}
                    >
                      <span className={`material-symbols-outlined ${isInProgress ? "text-5xl text-[#F4A261]" : "text-3xl"}`}>
                        {isInProgress ? "play_circle" : isLocked ? "lock" : "check"}
                      </span>
                    </div>

                    <div
                      className={`absolute top-2 w-64 rounded-xl border bg-white p-4 shadow-sm ${
                        item.side === "left" ? "left-[56%]" : "right-[56%] text-right"
                      } ${isInProgress ? "rounded-2xl border-2 border-[#F4A261] p-5 shadow-xl" : "border-gray-100"} ${
                        isLocked ? "opacity-60" : ""
                      }`}
                    >
                      <p
                        className={`mb-1 text-[10px] font-bold uppercase ${
                          isCompleted || isInProgress ? "text-[#F4A261]" : "text-gray-400"
                        }`}
                      >
                        {isInProgress ? "En Progreso" : isCompleted ? "Completado" : "Bloqueado"}
                      </p>
                      <p className={`text-sm font-bold leading-tight ${isLocked ? "text-gray-400" : "text-[#264653]"}`}>
                        {item.title}
                      </p>

                      {isInProgress ? (
                        <>
                          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                            <div className="h-full rounded-full bg-[#F4A261]" style={{ width: `${item.progress ?? 0}%` }} />
                          </div>
                          <div className="mt-2 flex items-center justify-between text-[11px] font-bold">
                            <span className="text-gray-400">Paso 3 de 4</span>
                            <span className="text-[#F4A261]">{item.progress}%</span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={increaseProgress}
                              className="rounded-lg bg-[#F4A261]/10 px-3 py-1 text-[11px] font-bold text-[#F4A261] hover:bg-[#F4A261]/20"
                            >
                              Continuar +10%
                            </button>
                            <button
                              type="button"
                              onClick={completeCurrentMilestone}
                              className="rounded-lg bg-[#264653] px-3 py-1 text-[11px] font-bold text-white hover:bg-[#1f3a45]"
                            >
                              Completar modulo
                            </button>
                          </div>
                        </>
                      ) : null}
                    </div>

                    {index < milestones.length - 1 ? (
                      <div
                        className={`absolute left-1/2 top-[78px] h-24 w-1.5 -translate-x-1/2 rounded-full ${
                          isCompleted || isInProgress ? "bg-[#F4A261]" : "bg-gray-200"
                        }`}
                      />
                    ) : null}
                  </div>
                );
              })}

              {visibleMilestones.length === 0 ? (
                <p className="rounded-xl bg-white p-4 text-sm font-semibold text-gray-500 shadow-sm">
                  No encontramos modulos con esa busqueda.
                </p>
              ) : null}
            </div>
          </section>

          <section className="mt-4 rounded-3xl border border-white/20 bg-gradient-to-br from-[#F4A261] to-[#E76F51] p-8 text-white shadow-2xl shadow-[#F4A261]/30">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
                    Proximo Hito
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-white/80">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    Lectura de 15 min
                  </span>
                </div>
                <h3 className="text-2xl font-black">Interfaces y Abstraccion</h3>
                <p className="mt-2 max-w-md font-medium text-white/90">
                  Desbloquea el nucleo del codigo Java modular. Completa esto para llegar al nivel 15.
                </p>
              </div>

              <button
                type="button"
                onClick={increaseProgress}
                className="rounded-2xl bg-white px-10 py-4 font-black text-[#F4A261] shadow-xl transition-all hover:scale-105 hover:shadow-white/20"
              >
                Reanudar Aprendizaje
              </button>
            </div>
          </section>
        </div>
      </main>

      <aside className="fixed right-0 top-0 hidden h-screen w-80 flex-col overflow-y-auto border-l border-gray-100 bg-white p-8 xl:flex">
        <h3 className="mb-8 text-lg font-bold text-[#264653]">Actividad Social</h3>

        <div className="flex flex-col gap-8">
          {[
            [
              "Alex Chen",
              "Termino Herencia",
              "2m",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCEG3M45mhWOlVRLlYx8XmRE-u0SSyiSzvlpTmcH36yKDY8sQGoqm5PTq1nxj1Y-xsK4nAyDrwUhjJjVcSgKE06R_K0g0DtNXRYkQwKYOrrqAOXIZh1cbFRr5w2-vj8hkqv-uVc_IzbDWZFt96Bnbjvga8-EA8rGLcQwRXD2y0CtMy-a0--B4o59WPT7JPpijmDFE_zIVmHxDJQSLr98GZC2yZjKy_FQLq6UDZAOwdzL29Ank9-N5CNS6hbpon0cMESfPsDjxMfsLk",
              "ring-[#2A9D8F]",
            ],
            [
              "Sarah Miller",
              "Racha de 100 dias",
              "15m",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuBMq2d394iwHMpND87WkGoMMxM-5eIJ5dWZ3tvbCf4M6ykDvg6jf6YfxNgXpcxx1Ha9Jlr1NkCIvw3iXy_F2HDtX2fdHcfd6OHsL-DtUSKWVIFpqGZvXDEiuFluGsW4Ys6c4GHavVW4W3ihqi9YQQhq6-329JGlXWJZuzBEFc2avRb6olBpu9njyZN9guoAoHR_PT9QrxOoSYBkRP40opQW5RD9YMXd2ZHkCsCov9Bj8Jm7FFI78oreSS8PuezDhf7qkPnAcKqxl8A",
              "ring-[#F4A261]",
            ],
            [
              "David Jo",
              "Empezo Genericos",
              "1h",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCE9LzKE-Y9go8O9yJURLGtvr60szPmdxpKbDgVZwUbZPJ_BH92Q-4YFi3Kyd5_vwSIVkfWNyuktMlB9OSHv3bxsMIetXip96cyCi4gH5CGO4eTZ3R5GaFIe5AmYQYo9vUdSuh8ishHUaOiv-rLq1X4D03KjWYz5_GuAWSGQt3r3sakoDg3yld-Aq45o_i4aPZ1I6lVxxjiraILqL7wDN92eA3ZTZ7RCNgmVASqcCq4JpUdG0-nMsOdiTWlJRYRyQ4syocBKok6iKQ",
              "ring-gray-100",
            ],
          ].map(([name, action, time, avatar, ring]) => (
            <div key={name} className="flex items-center gap-4">
              <div
                className={`h-11 w-11 rounded-full bg-cover bg-center ring-2 ring-offset-2 ${ring}`}
                style={{ backgroundImage: `url('${avatar}')` }}
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#264653]">{name}</p>
                <p className="mt-1 text-xs text-gray-500">{action}</p>
              </div>
              <span className="text-[10px] font-medium text-gray-400">{time}</span>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-gray-100 bg-gray-50 p-6">
          <h4 className="mb-6 text-xs font-black uppercase tracking-widest text-[#264653]">Ranking del Modulo</h4>
          <div className="space-y-4">
            {["Tu|15,400", "Alex Chen|14,820", "Sarah Miller|12,100"].map((entry, idx) => {
              const [name, xp] = entry.split("|");
              const isTop = idx === 0;
              return (
                <div
                  key={name}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 ${
                    isTop ? "border border-gray-100 bg-white shadow-sm" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-sm ${isTop ? "font-black text-[#F4A261]" : "font-bold text-gray-400"}`}>
                      {idx + 1}
                    </span>
                    <span className={`text-sm ${isTop ? "font-bold text-[#264653]" : "font-medium text-gray-600"}`}>
                      {name}
                    </span>
                  </div>
                  <span className={`text-xs ${isTop ? "font-black text-[#264653]" : "font-bold text-gray-400"}`}>{xp}</span>
                </div>
              );
            })}
          </div>

          <button className="mt-8 w-full rounded-xl border border-[#F4A261]/20 bg-white py-3 text-xs font-black text-[#F4A261] transition-all hover:bg-[#F4A261] hover:text-white">
            CLASIFICACION COMPLETA
          </button>
        </div>
      </aside>
    </div>
  );
}
