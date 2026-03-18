type PodiumUser = {
  name: string;
  xp: string;
  place: number;
  avatar: string;
  highlight?: boolean;
};

type RankRow = {
  rank: number;
  name: string;
  detail: string;
  streak: string;
  isCurrentUser?: boolean;
};

const podium: PodiumUser[] = [
  {
    name: "Sarah Miller",
    xp: "18,240",
    place: 2,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMq2d394iwHMpND87WkGoMMxM-5eIJ5dWZ3tvbCf4M6ykDvg6jf6YfxNgXpcxx1Ha9Jlr1NkCIvw3iXy_F2HDtX2fdHcfd6OHsL-DtUSKWVIFpqGZvXDEiuFluGsW4Ys6c4GHavVW4W3ihqi9YQQhq6-329JGlXWJZuzBEFc2avRb6olBpu9njyZN9guoAoHR_PT9QrxOoSYBkRP40opQW5RD9YMXd2ZHkCsCov9Bj8Jm7FFI78oreSS8PuezDhf7qkPnAcKqxl8A",
  },
  {
    name: "David Jo",
    xp: "24,500",
    place: 1,
    highlight: true,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCE9LzKE-Y9go8O9yJURLGtvr60szPmdxpKbDgVZwUbZPJ_BH92Q-4YFi3Kyd5_vwSIVkfWNyuktMlB9OSHv3bxsMIetXip96cyCi4gH5CGO4eTZ3R5GaFIe5AmYQYo9vUdSuh8ishHUaOiv-rLq1X4D03KjWYz5_GuAWSGQt3r3sakoDg3yld-Aq45o_i4aPZ1I6lVxxjiraILqL7wDN92eA3ZTZ7RCNgmVASqcCq4JpUdG0-nMsOdiTWlJRYRyQ4syocBKok6iKQ",
  },
  {
    name: "Alex Chen",
    xp: "15,800",
    place: 3,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCEG3M45mhWOlVRLlYx8XmRE-u0SSyiSzvlpTmcH36yKDY8sQGoqm5PTq1nxj1Y-xsK4nAyDrwUhjJjVcSgKE06R_K0g0DtNXRYkQwKYOrrqAOXIZh1cbFRr5w2-vj8hkqv-uVc_IzbDWZFt96Bnbjvga8-EA8rGLcQwRXD2y0CtMy-a0--B4o59WPT7JPpijmDFE_zIVmHxDJQSLr98GZC2yZjKy_FQLq6UDZAOwdzL29Ank9-N5CNS6hbpon0cMESfPsDjxMfsLk",
  },
];

const rankings: RankRow[] = [
  {
    rank: 4,
    name: "Tu",
    detail: "Estrella Naciente",
    streak: "12d",
    isCurrentUser: true,
  },
  {
    rank: 5,
    name: "Rival Nivel 24",
    detail: "Compitiendo en Liga Diamante",
    streak: "8d",
  },
  {
    rank: 6,
    name: "Rival Nivel 22",
    detail: "Compitiendo en Liga Diamante",
    streak: "45d",
  },
  {
    rank: 7,
    name: "Rival Nivel 19",
    detail: "Compitiendo en Liga Diamante",
    streak: "2d",
  },
];

export function LeaderboardView() {
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
                ["grid_view", "Panel"],
                ["map", "Ruta"],
                ["emoji_events", "Clasificacion"],
                ["terminal", "Practica"],
                ["rocket_launch", "Proyectos"],
              ].map(([icon, label]) => (
                <a
                  key={label}
                  href="#"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    label === "Clasificacion"
                      ? "bg-[#F4A261] text-white shadow-md shadow-[#F4A261]/20"
                      : "hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="material-symbols-outlined">{icon}</span>
                  {label}
                </a>
              ))}
              <a
                href="#"
                className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-white/10 hover:text-white"
              >
                <span className="material-symbols-outlined">settings</span>
                Ajustes
              </a>
            </nav>
          </div>

          <a
            href="#"
            className="flex items-center gap-3 rounded-lg border-t border-white/10 px-3 pt-4 text-sm font-medium transition-colors hover:text-white"
          >
            <span className="material-symbols-outlined">help</span>
            Centro de Ayuda
          </a>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/80 px-4 py-4 backdrop-blur-md md:px-8">
          <div className="flex max-w-md flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3">
            <span className="material-symbols-outlined text-gray-400">search</span>
            <input
              type="text"
              placeholder="Buscar usuarios..."
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="ml-4 flex items-center gap-4 md:gap-6">
            <div className="hidden items-center gap-6 md:flex">
              <a href="#" className="text-sm font-medium transition-colors hover:text-[#F4A261]">
                Cursos
              </a>
              <a href="#" className="text-sm font-medium transition-colors hover:text-[#F4A261]">
                Comunidad
              </a>
            </div>
            <button className="h-10 rounded-xl bg-[#F4A261] px-4 text-sm font-bold text-white shadow-lg shadow-[#F4A261]/20 transition-all hover:brightness-110 md:px-6">
              Pasar a Pro
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

        <div className="mx-auto w-full max-w-6xl p-4 md:p-8 xl:pr-96">
          <section className="mb-12">
            <h1 className="flex items-center gap-3 text-3xl font-black text-[#264653] md:text-4xl">
              Clasificacion
              <span className="material-symbols-outlined text-4xl text-[#F4A261]">workspace_premium</span>
            </h1>
            <p className="mt-2 text-base text-gray-500 md:text-lg">
              Compitiendo en la <span className="font-bold text-[#264653]">Liga Diamante</span> • Finaliza en 2d 14h
            </p>
          </section>

          <section className="mx-auto mb-16 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3 md:items-end">
            {podium.map((user) => (
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
                    {user.xp} <span className="text-[10px]">XP</span>
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

            {rankings.map((row) => (
              <div
                key={row.rank}
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
                  {row.streak}
                  <span className="material-symbols-outlined text-base text-orange-500">local_fire_department</span>
                </div>
                <div className="hidden items-center justify-end text-right md:flex">
                  <p className="text-base font-black text-[#264653]">Liga Diamante • 2d 14h</p>
                </div>
              </div>
            ))}
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
                <button className="w-full rounded-2xl bg-[#F4A261] px-10 py-4 font-black text-white shadow-xl shadow-[#F4A261]/30 transition-all hover:scale-105 md:w-auto">
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

      <aside className="fixed right-0 top-0 hidden h-screen w-80 flex-col overflow-y-auto border-l border-gray-100 bg-white p-8 xl:flex">
        <h3 className="mb-8 text-lg font-bold text-[#264653]">Estadisticas Semanales</h3>

        <div className="mb-12 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Posicion Activa</p>
              <span className="material-symbols-outlined text-xl text-[#F4A261]">trending_up</span>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-black text-[#264653]">#4</p>
              <p className="mb-1 text-sm font-bold text-[#2A9D8F]">+2 desde ayer</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Promedio Puntos / Dia</p>
              <span className="material-symbols-outlined text-xl text-[#F4A261]">insights</span>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-black text-[#264653]">1,240</p>
              <p className="mb-1 text-sm font-bold text-gray-400">Top 5%</p>
            </div>
          </div>
        </div>

        <h3 className="mb-6 text-lg font-bold text-[#264653]">Rivales Recientes</h3>
        <div className="flex flex-col gap-6">
          {[
            [
              "Alex Chen",
              "+400 XP ganados",
              "2m",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCEG3M45mhWOlVRLlYx8XmRE-u0SSyiSzvlpTmcH36yKDY8sQGoqm5PTq1nxj1Y-xsK4nAyDrwUhjJjVcSgKE06R_K0g0DtNXRYkQwKYOrrqAOXIZh1cbFRr5w2-vj8hkqv-uVc_IzbDWZFt96Bnbjvga8-EA8rGLcQwRXD2y0CtMy-a0--B4o59WPT7JPpijmDFE_zIVmHxDJQSLr98GZC2yZjKy_FQLq6UDZAOwdzL29Ank9-N5CNS6hbpon0cMESfPsDjxMfsLk",
            ],
            [
              "Sarah Miller",
              "Cuestionario Completado",
              "15m",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuBMq2d394iwHMpND87WkGoMMxM-5eIJ5dWZ3tvbCf4M6ykDvg6jf6YfxNgXpcxx1Ha9Jlr1NkCIvw3iXy_F2HDtX2fdHcfd6OHsL-DtUSKWVIFpqGZvXDEiuFluGsW4Ys6c4GHavVW4W3ihqi9YQQhq6-329JGlXWJZuzBEFc2avRb6olBpu9njyZN9guoAoHR_PT9QrxOoSYBkRP40opQW5RD9YMXd2ZHkCsCov9Bj8Jm7FFI78oreSS8PuezDhf7qkPnAcKqxl8A",
            ],
          ].map(([name, event, time, avatar]) => (
            <div key={name} className="flex items-center gap-4">
              <div
                className="h-11 w-11 rounded-full bg-cover bg-center ring-2 ring-[#F4A261] ring-offset-2"
                style={{ backgroundImage: `url('${avatar}')` }}
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#264653]">{name}</p>
                <p className="mt-1 text-xs text-gray-500">{event}</p>
              </div>
              <span className="text-[10px] font-bold text-gray-400">{time}</span>
            </div>
          ))}
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
