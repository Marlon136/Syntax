"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authHeaders, getAuthToken, getUserIdFromToken } from "@/lib/auth";
import { LogoutButton } from "@/app/components/LogoutButton";

type PodiumUser = {
  id: number;
  name: string;
  xp: number;
  streak: number;
  place: number;
  avatar: string;
  detail: string;
  isCurrentUser?: boolean;
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

const simulatedLeaderboard: RankRow[] = [
  { id: 101, rank: 1, name: 'Marlon', xp: 8520, detail: '5 cursos completados', streak: 16, isCurrentUser: true },
  { id: 102, rank: 2, name: 'Luna', xp: 8120, detail: '5 cursos completados', streak: 14 },
  { id: 103, rank: 3, name: 'Diego', xp: 7600, detail: '4 cursos completados', streak: 12 },
  { id: 104, rank: 4, name: 'Sofía', xp: 7040, detail: '4 cursos completados', streak: 10 },
  { id: 105, rank: 5, name: 'Oliver', xp: 6700, detail: '3 cursos completados', streak: 8 },
  { id: 106, rank: 6, name: 'Emma', xp: 6400, detail: '3 cursos completados', streak: 7 },
  { id: 107, rank: 7, name: 'Noah', xp: 6180, detail: '3 cursos completados', streak: 6 },
  { id: 108, rank: 8, name: 'Valentina', xp: 5900, detail: '3 cursos completados', streak: 6 },
  { id: 109, rank: 9, name: 'Mateo', xp: 5620, detail: '2 cursos completados', streak: 5 },
  { id: 110, rank: 10, name: 'Isabella', xp: 5340, detail: '2 cursos completados', streak: 4 },
  { id: 111, rank: 11, name: 'Lucas', xp: 5100, detail: '2 cursos completados', streak: 4 },
  { id: 112, rank: 12, name: 'Camila', xp: 4820, detail: '2 cursos completados', streak: 3 },
];

// Data placeholders removed — derive podium, rankings and rivals from API `rows`

type SortMode = "rank" | "xp" | "streak";

export function LeaderboardView() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("rank");
  const [rows, setRows] = useState<RankRow[]>([]);
  const [isFallback, setIsFallback] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/login');
      return;
    }

    setLoading(true);

    // Fetch leaderboard for current user (server reads user from JWT)
    const api = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
    fetch(`${api}/leaderboard`, { headers: { ...authHeaders() } })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const currentUserId = getUserIdFromToken();
          const mapped = data.map((u: any, idx: number) => ({
            id: u.id,
            rank: idx + 1,
            name: u.name ?? u.email,
            xp: u.totalPoints ?? 0,
            detail: `${(u.perCourse || []).length} cursos`,
            streak: u.streak ?? Math.max(1, Math.floor((u.totalPoints ?? 0) / 900)),
            isCurrentUser: u.id === currentUserId,
          }));
          setRows(mapped);
          setIsFallback(false);
        } else {
          setRows(simulatedLeaderboard);
          setIsFallback(true);
        }
      })
      .catch((e) => {
        console.error('Error fetching leaderboard', e);
        setRows(simulatedLeaderboard);
        setIsFallback(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  const visibleRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = rows.filter((row) => {
      if (!normalized) return true;
      return `${row.name} ${row.detail}`.toLowerCase().includes(normalized);
    });

    return [...filtered].sort((a, b) => {
      if (sortMode === "xp") return b.xp - a.xp;
      if (sortMode === "streak") return b.streak - a.streak;
      return a.rank - b.rank;
    });
  }, [query, sortMode]);

  const visiblePodium = useMemo(() => {
    return rows.slice(0, 3).map((r, idx) => ({
      id: r.id,
      name: r.name,
      xp: r.xp,
      streak: r.streak,
      detail: r.detail,
      place: idx + 1,
      avatar: '',
      isCurrentUser: r.isCurrentUser,
      highlight: idx === 0,
    }));
  }, [rows]);

  const visibleRivals = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const base = rows.slice(0, 5).map((r) => ({ id: r.id, name: r.name, event: `+${r.xp} XP ganados`, time: "h", avatar: "" }));
    if (!normalized) return base;
    return base.filter((rival) => rival.name.toLowerCase().includes(normalized));
  }, [query]);

  const currentUser = rows.find((row) => row.isCurrentUser) ?? { rank: rows[0]?.rank ?? 0, xp: 0 };
  const topXp = rows.length ? Math.max(...rows.map((r) => r.xp)) : 1;
  const percentile = Math.round((currentUser.xp / Math.max(1, topXp)) * 100);

  const formatNumber = (value: number) => value.toLocaleString("es-ES");

  return (
    <div className="min-h-screen bg-neutral-50 text-[#264653] font-sans">
      <main className="mx-auto w-full max-w-6xl p-4 md:p-8">
        <section className="mb-8 rounded-3xl border border-[#e5e7eb] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2A9D8F]/80">Leaderboard</p>
              <h1 className="text-4xl font-semibold text-[#264653]">Ranking de estudiantes</h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#64748b]">
                Convierte tus lecciones en puntos y sube en la tabla de clasificación junto a otros alumnos.
              </p>
            </div>
            <button
              type="button"
              className="rounded-2xl bg-[#F4A261] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e5983f]"
            >
              Ir a desafíos
            </button>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              {[
                ["rank", "Por rango"],
                ["xp", "Por XP"],
                ["streak", "Por racha"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSortMode(value as SortMode)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition ${
                    sortMode === value
                      ? "border-[#47a599] bg-[#47a599] text-white"
                      : "border-[#FFBE19] bg-[#FFBE19] text-[#1A5E7F] hover:opacity-95"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="min-w-[220px] rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3">
              <input
                type="search"
                placeholder="Buscar usuario"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full border-none bg-transparent text-sm text-[#264653] outline-none placeholder:text-[#94a3b8]"
              />
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          {isFallback ? (
            <div className="mb-6 rounded-3xl border border-[#f8d3a3] bg-[#fff7eb] px-6 py-5 text-sm font-semibold text-[#92400e]">
              Los datos son de ejemplo. Completa cursos y lecciones para ver tu ranking real.
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-3">
            {visiblePodium.map((user) => (
              <article
                key={user.place}
                className="rounded-3xl border border-[#e5e7eb] bg-[#fafafa] p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Top {user.place}</p>
                    <h2 className="mt-3 text-xl font-semibold text-[#264653]">{user.name}</h2>
                  </div>
                  {user.isCurrentUser ? (
                    <span className="rounded-full bg-[#2a9d8f]/10 px-3 py-1 text-[11px] font-semibold text-[#0f766e]">
                      Tú
                    </span>
                  ) : null}
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 text-sm text-[#64748b]">
                  <p>{user.detail}</p>
                  <p className="font-bold text-[#FD7B2C]">{formatNumber(user.xp)} XP</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm">
          <div className="grid grid-cols-[64px_1fr_110px_110px] gap-4 border-b border-[#e5e7eb] bg-[#f8fafc] px-4 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#64748b]">
            <span>Rango</span>
            <span>Usuario</span>
            <span className="text-right">Racha</span>
            <span className="text-right">XP</span>
          </div>

          {visibleRows.map((row) => (
            <div
              key={row.id}
              className={`grid grid-cols-[64px_1fr_110px_110px] gap-4 border-b border-[#f1f5f9] px-4 py-4 transition-colors ${
                row.isCurrentUser ? "bg-[#fef3c7]" : "hover:bg-[#f8fafc]"
              }`}
            >
              <div className="flex items-center justify-center text-lg font-black text-[#264653]">{row.rank}</div>
              <div className="flex flex-col justify-center">
                <p className="text-sm font-semibold text-[#264653]">{row.name}</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#94a3b8]">{row.detail}</p>
              </div>
              <div className="flex items-center justify-end text-sm font-semibold text-[#264653]">
                {row.streak}d
              </div>
              <div className="flex items-center justify-end text-sm font-bold text-[#FD7B2C]">{formatNumber(row.xp)}</div>
            </div>
          ))}

          {loading ? (
            <div className="p-6 text-center text-sm text-[#64748b]">Cargando usuarios...</div>
          ) : visibleRows.length === 0 ? (
            <div className="p-6 text-center text-sm font-semibold text-[#64748b]">No se encontró ningún usuario.</div>
          ) : null}
        </section>

        <section className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2A9D8F]/80">Únete al Top</p>
              <h2 className="mt-3 text-2xl font-black text-[#264653]">Aprende más y alcanza el siguiente nivel</h2>
              <p className="mt-2 max-w-2xl text-sm text-[#64748b]">
                Consigue más XP completando lecciones y observa cómo subes posiciones cada semana.
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.alert("Nuevos desafíos disponibles pronto.")}
              className="rounded-2xl bg-[#264653] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1e3a4d]"
            >
              Ver retos
            </button>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#64748b]">Tu posición</h3>
            <p className="mt-4 text-3xl font-black text-[#264653]">#{currentUser.rank}</p>
            <p className="mt-2 text-sm text-[#64748b]">Sigue subiendo tus puntos con más lecciones.</p>
          </div>

          <div className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#64748b]">XP actual</h3>
            <p className="mt-4 text-3xl font-black text-[#FD7B2C]">{formatNumber(currentUser.xp)}</p>
            <p className="mt-2 text-sm text-[#64748b]">Promedio por día: {formatNumber(Math.round(currentUser.xp / 10))}</p>
          </div>

          <div className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#64748b]">Porcentaje</h3>
            <p className="mt-4 text-3xl font-black text-[#264653]">Top {Math.max(1, 100 - percentile)}%</p>
            <p className="mt-2 text-sm text-[#64748b]">Comparado con los mejores alumnos.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
