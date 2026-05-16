"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/providers/LanguageProvider";

export default function RightPanel() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="w-80 border-l border-gray-100 bg-white p-6 shadow-sm">

      <h2 className="text-lg font-bold text-[#264653] mb-6">
        {t("rightPanel.community")}
      </h2>

      <div className="rounded-2xl border border-gray-100 bg-[#FAFAFA] p-5 shadow-sm">

        <p className="text-xs font-bold uppercase text-gray-400 mb-1">
          {t("rightPanel.ranking")}
        </p>

        <p className="text-lg font-bold text-[#264653]">
          {t("rightPanel.globalLeaderboard")}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          {t("rightPanel.seeMoreXp")}
        </p>

        <button
          onClick={() => router.push("/leaderboard")}
          className="mt-4 w-full rounded-xl bg-[#F4A261] py-2 font-bold text-white"
        >
          {t("rightPanel.viewLeaderboard")}
        </button>

      </div>

    </div>
  );
}