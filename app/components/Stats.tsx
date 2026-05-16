"use client";
import { useLanguage } from "@/app/providers/LanguageProvider";

export default function Stats() {
  const { t } = useLanguage();

  const stats = [
    [t("stats.activeStudents"), "6,000+"],
    [t("stats.lessonsAvailable"), "120+"],
    [t("stats.successRate"), "98%"],
    [t("stats.averageRating"), "4.9/5"],
  ];

  return (
    <section className="bg-neutral-50 pb-14">

      <div className="grid grid-cols-4 gap-6 px-16">

        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-[#fff8f3] p-6 rounded-xl border border-[#264653]/20 text-center"
          >
            <p className="text-sm font-bold text-[#264653]/80">
              {s[0]}
            </p>

            <p className="text-3xl font-bold text-[#E76F51]">
              {s[1]}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}