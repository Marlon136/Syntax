import { useLanguage } from "@/app/providers/LanguageProvider";

export default function PremiumHeroPython() {
  const { t } = useLanguage();

  return (
    <section className="px-16 py-10 bg-neutral-50">

      <h1 className="text-3xl font-bold text-[#264653]">
        {t("premium.python.hero.title")}
      </h1>

    </section>
  );
}