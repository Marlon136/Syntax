"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LogoutButton } from "@/app/components/LogoutButton";

type PodiumUser = {
  id: number;
  name: string;
  xp: number;
  streak: number;
  place: number;
  avatar: string;
  highlight?: boolean;
};

type RankRow = {
  id: number;
  rank: number;
  name: string;
  xp: number;
  detail: string;
  streak: number;
  isCurrentUser?: boolean;
};

const podium: PodiumUser[] = [
  {
    id: 1,
    name: "Sarah Miller",
    xp: 18240,
    streak: 18,
    place: 2,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMq2d394iwHMpND87WkGoMMxM-5eIJ5dWZ3tvbCf4M6ykDvg6jf6YfxNgXpcxx1Ha9Jlr1NkCIvw3iXy_F2HDtX2fdHcfd6OHsL-DtUSKWVIFpqGZvXDEiuFluGsW4Ys6c4GHavVW4W3ihqi9YQQhq6-329JGlXWJZuzBEFc2avRb6olBpu9njyZN9guoAoHR_PT9QrxOoSYBkRP40opQW5RD9YMXd2ZHkCsCov9Bj8Jm7FFI78oreSS8PuezDhf7qkPnAcKqxl8A",
  },
  {
    id: 2,
    name: "David Jo",
    xp: 24500,
    streak: 32,
    place: 1,
    highlight: true,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCE9LzKE-Y9go8O9yJURLGtvr60szPmdxpKbDgVZwUbZPJ_BH92Q-4YFi3Kyd5_vwSIVkfWNyuktMlB9OSHv3bxsMIetXip96cyCi4gH5CGO4eTZ3R5GaFIe5AmYQYo9vUdSuh8ishHUaOiv-rLq1X4D03KjWYz5_GuAWSGQt3r3sakoDg3yld-Aq45o_i4aPZ1I6lVxxjiraILqL7wDN92eA3ZTZ7RCNgmVASqcCq4JpUdG0-nMsOdiTWlJRYRyQ4syocBKok6iKQ",
  },
  {
    id: 3,
    name: "Alex Chen",
    xp: 15800,
    streak: 14,
    place: 3,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCEG3M45mhWOlVRLlYx8XmRE-u0SSyiSzvlpTmcH36yKDY8sQGoqm5PTq1nxj1Y-xsK4nAyDrwUhjJjVcSgKE06R_K0g0DtNXRYkQwKYOrrqAOXIZh1cbFRr5w2-vj8hkqv-uVc_IzbDWZFt96Bnbjvga8-EA8rGLcQwRXD2y0CtMy-a0--B4o59WPT7JPpijmDFE_zIVmHxDJQSLr98GZC2yZjKy_FQLq6UDZAOwdzL29Ank9-N5CNS6hbpon0cMESfPsDjxMfsLk",
  },
];

const rankings: RankRow[] = [
  {
    id: 4,
    rank: 4,
    name: "Tu",
    xp: 12400,
    detail: "Estrella Naciente",
    streak: 12,
    isCurrentUser: true,
  },
  {
    id: 5,
    rank: 5,
    name: "Leo Parker",
    xp: 11980,
    detail: "Compitiendo en Liga Diamante",
    streak: 8,
  },
  {
    id: 6,
    rank: 6,
    name: "Nadia Cruz",
    xp: 10850,
    detail: "Compitiendo en Liga Diamante",
    streak: 45,
  },
  {
    id: 7,
    rank: 7,
    name: "Dario Kim",
    xp: 10020,
    detail: "Compitiendo en Liga Diamante",
    streak: 2,
  },
];

const rivals = [
  {
    id: 1,
    name: "Alex Chen",
    event: "+400 XP ganados",
    time: "2m",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCEG3M45mhWOlVRLlYx8XmRE-u0SSyiSzvlpTmcH36yKDY8sQGoqm5PTq1nxj1Y-xsK4nAyDrwUhjJjVcSgKE06R_K0g0DtNXRYkQwKYOrrqAOXIZh1cbFRr5w2-vj8hkqv-uVc_IzbDWZFt96Bnbjvga8-EA8rGLcQwRXD2y0CtMy-a0--B4o59WPT7JPpijmDFE_zIVmHxDJQSLr98GZC2yZjKy_FQLq6UDZAOwdzL29Ank9-N5CNS6hbpon0cMESfPsDjxMfsLk",
  },
  {
    id: 2,
    name: "Sarah Miller",
    event: "Cuestionario completado",
    time: "15m",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMq2d394iwHMpND87WkGoMMxM-5eIJ5dWZ3tvbCf4M6ykDvg6jf6YfxNgXpcxx1Ha9Jlr1NkCIvw3iXy_F2HDtX2fdHcfd6OHsL-DtUSKWVIFpqGZvXDEiuFluGsW4Ys6c4GHavVW4W3ihqi9YQQhq6-329JGlXWJZuzBEFc2avRb6olBpu9njyZN9guoAoHR_PT9QrxOoSYBkRP40opQW5RD9YMXd2ZHkCsCov9Bj8Jm7FFI78oreSS8PuezDhf7qkPnAcKqxl8A",
  },
];

type SortMode = "rank" | "xp" | "streak";

export function LeaderboardView() {
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("rank");

  const visibleRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = rankings.filter((row) => {
      if (!normalized) {
        return true;
      }

      return `${row.name} ${row.detail}`.toLowerCase().includes(normalized);
    });

    return [...filtered].sort((a, b) => {
      if (sortMode === "xp") {
        return b.xp - a.xp;
      }

      if (sortMode === "streak") {
        return b.streak - a.streak;
      }

      return a.rank - b.rank;
    });
  }, [query, sortMode]);

  const visiblePodium = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return podium;
    }

    return podium.filter((user) => user.name.toLowerCase().includes(normalized));
  }, [query]);

  const visibleRivals = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return rivals;
    }

    return rivals.filter((rival) => rival.name.toLowerCase().includes(normalized));
  }, [query]);

  const currentUser = rankings.find((row) => row.isCurrentUser) ?? rankings[0];
  const topXp = Math.max(...podium.map((user) => user.xp));
  const percentile = Math.round((currentUser.xp / topXp) * 100);

  const formatNumber = (value: number) => value.toLocaleString("es-ES");

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#264653]">
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-500 max-w-6xl p-4 md:p-8 xl:pr-96">
          <section className="mb-12">
            <h1 className="flex items-center gap-3 text-3xl font-black text-[#264653] md:text-4xl">
              Clasificacion
              <span className="material-symbols-outlined text-4xl text-[#F4A261]">workspace_premium</span>
            </h1>
            <p className="mt-2 text-base text-gray-500 md:text-lg">
              Compitiendo en la <span className="font-bold text-[#264653]">Liga Diamante</span> • Finaliza en 2d 14h
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                ["rank", "Ordenar por Rango"],
                ["xp", "Ordenar por XP"],
                ["streak", "Ordenar por Racha"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSortMode(value as SortMode)}
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
                    sortMode === value
                      ? "bg-[#F4A261] text-white"
                      : "bg-[#F4A261]/10 text-[#264653] hover:bg-[#F4A261]/20"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>

          <section className="mx-auto mb-16 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3 md:items-end">
            {visiblePodium.map((user) => (
              <article key={user.place} className="flex flex-col items-center">
                <div className={`relative mb-4 ${user.highlight ? "md:mb-6 md:scale-110" : ""}`}>
                  <div
                    className={`rounded-full bg-cover bg-center ${
                      user.highlight
                        ? "h-24 w-24 border-4 border-[#F4A261] ring-8 ring-[#F4A261]/10"
                        : "h-20 w-20 border-4 border-gray-200"
                    }`}
                    style={{ backgroundImage: `url('${user.avatar}')` }}
                  />
                  {user.highlight ? (
                    <span className="material-symbols-outlined absolute -top-6 left-1/2 -translate-x-1/2 text-3xl text-[#F4A261]">
                      military_tech
                    </span>
                  ) : null}
                  <div
                    className={`absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border-2 border-white px-3 py-1 text-xs font-black ${
                      user.highlight ? "bg-[#F4A261] text-white" : "bg-gray-200 text-[#264653]"
                    }`}
                  >
                    {user.place}
                  </div>
                </div>

                <div
                  className={`w-full rounded-t-2xl border-x border-t border-gray-100 px-4 text-center shadow-sm ${
                    user.highlight
                      ? "h-44 rounded-t-3xl bg-[#264653] pb-8 pt-10 shadow-xl"
                      : "h-32 bg-white pb-6 pt-8"
                  }`}
                >
                  <p className={`truncate font-bold ${user.highlight ? "text-white" : "text-[#264653]"}`}>{user.name}</p>
                  <p className="text-lg font-black text-[#F4A261]">
                    {formatNumber(user.xp)} <span className="text-[10px]">XP</span>
                  </p>
                  {user.highlight ? (
                    <div className="mt-2 flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#F4A261]">local_fire_department</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#F4A261]/70">
                        Racha de 32 dias
                      </span>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </section>

          <section className="mb-12 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="grid grid-cols-[70px_1fr_90px] gap-4 border-b border-gray-100 bg-gray-50 px-4 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 md:grid-cols-[80px_1fr_120px_160px] md:px-8">
              <span>Rango</span>
              <span>Usuario</span>
              <span className="text-right">Racha</span>
              <span className="hidden text-right md:block">Experiencia</span>
            </div>

            {visibleRows.map((row) => (
              <div
                key={row.id}
                className={`grid grid-cols-[70px_1fr_90px] gap-4 border-b border-gray-100 px-4 py-5 transition-colors md:grid-cols-[80px_1fr_120px_160px] md:px-8 ${
                  row.isCurrentUser ? "bg-orange-50/60" : "hover:bg-orange-50/40"
                }`}
              >
                <div className="flex items-center text-lg font-black text-[#264653]">{row.rank}</div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      row.isCurrentUser ? "border-2 border-[#F4A261] bg-[#F4A261]/20" : "bg-gray-100"
                    }`}
                  >
                    <span className="material-symbols-outlined text-gray-400">person</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#264653]">{row.name}</p>
                    <p className={`text-[10px] uppercase ${row.isCurrentUser ? "font-black text-[#F4A261]" : "text-gray-400"}`}>
                      {row.detail}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1.5 text-sm font-bold text-[#264653]">
                  {row.streak}d
                  <span className="material-symbols-outlined text-base text-orange-500">local_fire_department</span>
                </div>
                <div className="hidden items-center justify-end text-right md:flex">
                  <p className="text-base font-black text-[#264653]">{formatNumber(row.xp)} XP</p>
                </div>
              </div>
            ))}

            {visibleRows.length === 0 ? (
              <div className="p-6 text-center text-sm font-semibold text-gray-500">No hay usuarios para esa busqueda.</div>
            ) : null}
          </section>

          <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#264653] p-8 text-white shadow-2xl shadow-[#264653]/20 md:p-10">
            <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-[#F4A261]/10 blur-3xl" />
            <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <span className="rounded-full bg-[#F4A261] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
                  Recompensa Top 10%
                </span>
                <h3 className="mt-4 text-3xl font-black">Unete al Nivel Elite</h3>
                <p className="mt-2 max-w-xl text-lg font-medium text-white/70">
                  Manten tu posicion entre los 5 mejores para desbloquear la exclusiva Insignia Syntax Pro y
                  doble XP este fin de semana.
                </p>
              </div>
              <div className="w-full md:w-auto">
                <button
                  className="w-full rounded-2xl bg-[#F4A261] px-10 py-4 font-black text-white shadow-xl shadow-[#F4A261]/30 transition-all hover:scale-105 md:w-auto"
                  onClick={() => window.alert("Nuevos desafios disponibles pronto.")}
                >
                  Ver Desafios
                </button>
                <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Calculado en tiempo real
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <aside className="right-0 top-0 hidden h-350 w-80 flex-col overflow-y-auto border-l border-gray-100 bg-white p-8 xl:flex">
        <h3 className="mb-8 text-lg font-bold text-[#264653]">Estadisticas Semanales</h3>

        <div className="mb-12 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Posicion Activa</p>
              <span className="material-symbols-outlined text-xl text-[#F4A261]">trending_up</span>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-black text-[#264653]">#{currentUser.rank}</p>
              <p className="mb-1 text-sm font-bold text-[#2A9D8F]">+2 desde ayer</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Promedio Puntos / Dia</p>
              <span className="material-symbols-outlined text-xl text-[#F4A261]">insights</span>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-black text-[#264653]">{formatNumber(Math.round(currentUser.xp / 10))}</p>
              <p className="mb-1 text-sm font-bold text-gray-400">Top {Math.max(1, 100 - percentile)}%</p>
            </div>
          </div>
        </div>

        <h3 className="mb-6 text-lg font-bold text-[#264653]">Rivales Recientes</h3>
        <div className="flex flex-col gap-6">
          {visibleRivals.map((rival) => (
            <div key={rival.id} className="flex items-center gap-4">
              <div
                className="h-11 w-11 rounded-full bg-cover bg-center ring-2 ring-[#F4A261] ring-offset-2"
                style={{ backgroundImage: `url('${rival.avatar}')` }}
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#264653]">{rival.name}</p>
                <p className="mt-1 text-xs text-gray-500">{rival.event}</p>
              </div>
              <span className="text-[10px] font-bold text-gray-400">{rival.time}</span>
            </div>
          ))}

          {visibleRivals.length === 0 ? (
            <p className="text-sm font-semibold text-gray-500">Sin rivales que coincidan con la busqueda.</p>
          ) : null}
        </div>

        <div className="mt-auto pt-8">
          <div className="rounded-3xl border border-[#F4A261]/10 bg-[#F4A261]/5 p-6">
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-[#F4A261]">Consejo Pro</p>
            <p className="text-sm leading-relaxed text-[#264653]/70">
              Completar desafios dificiles activa un multiplicador x1.5 para mejorar tu rango.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
