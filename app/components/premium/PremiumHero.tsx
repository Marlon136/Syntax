import { useLanguage } from "@/app/providers/LanguageProvider";

export default function PremiumHeroPyhon() {
  const { t } = useLanguage();

  return (
    <section className="px-16 py-10 bg-neutral-50">

      <h1 className="text-3xl font-bold text-[#264653]">
        {t("premium.hero.title")}
      </h1>

      <p className="text-[#264653]/70">
        {t("premium.hero.subtitle")}
      </p>

    </section>
  );
}