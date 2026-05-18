"use client";

import { useLanguage } from "@/app/providers/LanguageProvider";

export default function PlanTable() {
  const { t } = useLanguage();

  return (
    <section className="px-16 py-20 bg-[#fff8f3] rounded-xl border-2 w-1/2 mx-auto">

      <h2 className="text-center text-2xl font-bold text-[#264653] mb-10">
        {t("planTable.title")}
      </h2>

      <table className="w-full max-w-4xl mx-auto text-sm">

        <thead>
          <tr className="text-[#264653] border-b">
            <th className="text-left py-3">{t("planTable.feature")}</th>
            <th className="text-left">{t("planTable.free")}</th>
            <th className="text-left text-[#E76F51]">{t("planTable.pro")}</th>
          </tr>
        </thead>

        <tbody className="text-[#264653]/80">

          <tr className="border-b">
            <td className="py-3">{t("planTable.dailyLessons")}</td>
            <td>8</td>
            <td className="text-[#E76F51]">{t("planTable.unlimited")}</td>
          </tr>

          <tr className="border-b">
            <td className="py-3">{t("planTable.offlineAccess")}</td>
            <td>—</td>
            <td className="text-[#E76F51]">{t("planTable.yes")}</td>
          </tr>

          <tr className="border-b">
            <td className="py-3">{t("planTable.certificate")}</td>
            <td>—</td>
            <td className="text-[#E76F51]">{t("planTable.yes")}</td>
          </tr>

        </tbody>

      </table>

    </section>
  );
}