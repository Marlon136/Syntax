"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl p-4 md:p-8 xl:pr-96">
          <section className="mb-10">
            <nav className="mb-1 flex gap-2 text-xs font-semibold uppercase tracking-wider text-[#F4A261]/80">
              <span>Curso</span>
              <span>/</span>
              <span className="text-[#264653]">Especializacion Java</span>
            </nav>
            <button
          onClick={() => router.push("/leaderboard")}
          className="mt-4 w-full rounded-xl bg-[#F4A261] py-2 font-bold text-white"
        >
          Ver Leaderboard
        </button>
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
    </div>
  );
}
