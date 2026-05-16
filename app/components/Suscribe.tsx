"use client";
import Features from "./pricing/Features";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/providers/LanguageProvider";

export default function Subscribe() {
  const router  = useRouter();
  const { t } = useLanguage();
  
  function goToSubscribe() {
    router.push("/subscribe")
  }

  return (
    <section className="px-16 py-16 bg-neutral-50">

      <div className="bg-neutral-50 rounded-xl shadow-md p-6 border border-[#264653]/20 text-center">
        <Features />
        <h3 className="text-2xl font-bold mb-3 text-[#264653]">
          {t("subscribe.readyPrefix")} <span className="text-[#E76F51]">{t("subscribe.readyHighlight")}</span> {t("subscribe.readySuffix")}
        </h3>

        <p className="mb-6 text-[#264653]/80">
          {t("subscribe.description")}
        </p>

        <div className="flex justify-center gap-3">

          <button 
            onClick={goToSubscribe}
            className="bg-[#f0a262] hover:bg-[#d45d42] text-white font-bold px-6 py-3 rounded-lg transition"
          >
            {t("subscribe.cta")}
          </button>
          
        </div>

      </div>

    </section>

  
  );
}