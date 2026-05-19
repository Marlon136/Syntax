"use client";

import { useLanguage } from "@/app/providers/LanguageProvider";

export default function PlanTable() {
  const { t } = useLanguage();

  const rows = [
    {
      feature: t("planTable.dailyLessons"),
      free: "8",
      pro: t("planTable.unlimited"),
    },
    {
      feature: t("planTable.offlineAccess"),
      free: "—",
      pro: t("planTable.yes"),
    },
    {
      feature: t("planTable.certificate"),
      free: "—",
      pro: t("planTable.yes"),
    },
  ];

  return (
    <section className="w-full max-w-5xl px-6 py-12 sm:px-10 sm:py-16 bg-[#fff8f3] rounded-xl border-2 mx-auto">

      <h2 className="text-center text-2xl font-bold text-[#264653] mb-10">
        {t("planTable.title")}
      </h2>

      <div className="grid gap-4 md:hidden">
        {rows.map((row) => (
          <div key={row.feature} className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-[#264653] mb-4">{row.feature}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#f8fafc] p-4 text-center text-sm text-[#264653]">
                <p className="font-semibold">{t("planTable.free")}</p>
                <p className="mt-2">{row.free}</p>
              </div>
              <div className="rounded-2xl bg-[#fff4e6] p-4 text-center text-sm text-[#264653]">
                <p className="font-semibold text-[#E76F51]">{t("planTable.pro")}</p>
                <p className="mt-2">{row.pro}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[540px] text-sm">

        <thead>
          <tr className="text-[#264653] border-b">
            <th className="text-left py-3">{t("planTable.feature")}</th>
            <th className="text-left">{t("planTable.free")}</th>
            <th className="text-left text-[#E76F51]">{t("planTable.pro")}</th>
          </tr>
        </thead>

        <tbody className="text-[#264653]/80">
          {rows.map((row) => (
            <tr key={row.feature} className="border-b">
              <td className="py-3">{row.feature}</td>
              <td>{row.free}</td>
              <td className="text-[#E76F51]">{row.pro}</td>
            </tr>
          ))}
        </tbody>

      </table>
      </div>

    </section>
  );
}