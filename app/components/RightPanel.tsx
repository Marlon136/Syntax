"use client";

import { useRouter } from "next/navigation";

export default function RightPanel() {
  const router = useRouter();

  return (
    <div className="w-80 border-l border-gray-100 bg-white p-6 shadow-sm">

      <h2 className="text-lg font-bold text-[#264653] mb-6">
        Comunidad
      </h2>

      <div className="rounded-2xl border border-gray-100 bg-[#FAFAFA] p-5 shadow-sm">

        <p className="text-xs font-bold uppercase text-gray-400 mb-1">
          Ranking
        </p>

        <p className="text-lg font-bold text-[#264653]">
          Leaderboard Global
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Mira quién tiene más XP
        </p>

        <button
          onClick={() => router.push("/leaderboard")}
          className="mt-4 w-full rounded-xl bg-[#F4A261] py-2 font-bold text-white"
        >
          Ver Leaderboard
        </button>

      </div>

    </div>
  );
}