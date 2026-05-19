"use client";

import { useLanguage } from "@/app/providers/LanguageProvider";

export default function Features() {
  const { t } = useLanguage();

  const items = [
    [t("features.item1.title"), t("features.item1.description")],
    [t("features.item2.title"), t("features.item2.description")],
    [t("features.item3.title"), t("features.item3.description")],
    [t("features.item4.title"), t("features.item4.description")],
  ];

  return (
    <section className="px-16 py-16 bg-neutral-50 text-center">

      <h2 className="text-3xl font-bold text-[#264653] mb-2">
        {t("features.heading")}
      </h2>

      <p className="text-[#264653]/70 mb-10">
        {t("features.description")}
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        {items.map((f, i) => (
          <div
            key={i}
            className="bg-[#fff8f3] rounded-xl p-6 border border-neutral-200 shadow-sm"
          >
            <p className="font-bold text-[#264653] mb-2">
              {f[0]}
            </p>

            <p className="text-sm text-[#264653]/70">
              {f[1]}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}