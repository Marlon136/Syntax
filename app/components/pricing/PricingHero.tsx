"use client";
import Image from "next/image";
import { useLanguage } from "@/app/providers/LanguageProvider";

export default function PricingHero() {
  const { t } = useLanguage();

  const goToPlans = () => {
    const element = document.getElementById("plans");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="px-6 py-16 bg-neutral-50 flex flex-col-reverse items-center gap-10 lg:flex-row lg:justify-between lg:py-20 lg:px-16">

      <div className="w-full max-w-2xl lg:max-w-3xl">

        <p className="text-sm text-[#47a599] font-semibold mb-3">
          {t("pricing.hero.tagline")}
        </p>

        <h1 className="text-5xl font-bold text-[#2a4d60] mb-5">
          Unlock Your Full Potential with
          <span className="text-[#2a4d60]"> Sy</span> 
          <span className="text-[#47a599]">n</span> 
          <span className="text-[#ffbe19]">t</span> 
          <span className="text-[#E76F51]">aX Pro</span>
        </h1>

        <p className="text-[#2a4d60]/80 mb-6">
          {t("pricing.hero.description")}
        </p>

        <button
          onClick={goToPlans}
          className="bg-[#f0a262] hover:bg-[#d45d42] text-white px-6 py-3 rounded-lg"
        >
          {t("pricing.hero.cta")}
        </button>

      </div>

      <Image
        src="/gopro.jpg"
        alt="code"
        width={1200}
        height={700}
        className="w-full max-w-3xl rounded-xl shadow-xl object-cover h-[300px] sm:h-[360px] md:h-[420px]"
      />

    </section>
  );
}