"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/providers/LanguageProvider";
import { getAuthToken } from "@/lib/auth";

export default function Hero() {

  const router = useRouter();
  const { t } = useLanguage();

  return (
    <section className="flex flex-col-reverse md:flex-row justify-between items-center px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-20 bg-neutral-50">

      <div className="max-w-xl w-full mt-8 md:mt-0">

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#2a4d60]">
          Master <span className="text-[#E76F51]">Java</span> & Beyond with Syntax
        </h1>

        <p className="text-[#264653]/80 mb-6 text-base sm:text-lg">
          {t('hero.subtitle') || 'Learn Java, Python, and JavaScript through interactive lessons. '}<br />
          {t('hero.join') || 'Join 6,000+ students and start your coding journey today.'}
        </p>

        <div className="flex gap-4">

          <button
            onClick={() => {
              const token = getAuthToken();
              if (token) router.push("/coursesDisplay");
              else router.push("/login");
            }}
            className="bg-[#f0a262] hover:bg-[#d45d42] text-white px-6 py-3 rounded-lg transition"
          >
            {t('hero.cta') || 'Start Learning'}
          </button>

        </div>

      </div>

      <Image
        src="/homeimaage.jpg"
        alt="code"
        width={600}
        height={200}
        className="w-[280px] sm:w-[380px] md:w-[480px] lg:w-[600px] h-[180px] sm:h-[220px] md:h-[250px] object-cover rounded-xl shadow"
      />

    </section>
  );
}