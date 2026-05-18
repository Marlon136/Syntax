"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/providers/LanguageProvider";
import { API_URL } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

export default function Plans() {
  const router = useRouter();
  const { t } = useLanguage();

  const checkout = async (plan: "java" | "python" | "js" = "java") => {
    const token = getAuthToken();
    if (!token) {
      router.push(`/login?from=/subscribe`);
      return;
    }

    const res = await fetch(`${API_URL}/payments/create-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ plan }),
    });

    const data = await res.json();

    if (data?.url) {
      window.location.href = data.url;
    } else {
      alert("Error starting checkout: " + (data?.error || "unknown"));
    }
  };

  return (
    <section id="plans" className="px-16 py-20 bg-neutral-50 text-center">

      <h2 className="text-3xl font-bold text-[#264653] mb-10">
        {t("plans.title")}
      </h2>

      <div className="flex justify-center gap-10">

        {/* FREE */}

        <div className="w-80 bg-[#fff8f3] p-6 rounded-xl border-2 border-[#E76F51] shadow-lg">

          <p className="font-bold text-[#264653]">{t("plans.free")}</p><br></br>

          <p className="text-3xl font-bold text-[#264653]">
            $0
          </p>

          <button className="mt-4 w-full border border-[#E76F51]/30 py-2 rounded text-[#264653]">
            {t("plans.currentPlan")}
          </button>

        </div>


        {/* PRO  JAVA*/}

        <div className="w-80 bg-[#2a4d60] p-6 rounded-xl shadow-lg">

          <p className="font-bold text-[#ffffff]">
            {t("plans.javaPro")}
          </p><br></br>

          <p className="text-3xl text-[#ffffff]">
            $59.99
          </p>

          <button
            onClick={() => checkout()}
            className="mt-4 w-full bg-[#f0a262] hover:bg-[#47a599] text-white py-2 rounded"
          >
            {t("plans.getPlan")}
          </button>

        </div>

        {/* PRO  PYTHON*/}

        <div className="w-80 bg-[#2a4d60] p-6 rounded-xl shadow-lg">

          <p className="font-bold text-[#ffffff]">
            {t("plans.pythonPro")}
          </p><br></br>

          <p className="text-3xl text-[#ffffff]">
            $49.99
          </p>

          <button
            onClick={() => checkout("python")}
            className="mt-4 w-full bg-[#f0a262] hover:bg-[#47a599] text-white py-2 rounded"
          >
            {t("plans.getPlan")}
          </button>

        </div>

        {/* PRO  JAVA SCRIPT*/}

        <div className="w-80 bg-[#2a4d60] p-6 rounded-xl shadow-lg">

          <p className="font-bold text-[#ffffff]">
            {t("plans.jsPro")}
          </p><br></br>

          <p className="text-3xl text-[#ffffff]">
            $39.99
          </p>

          <button
            onClick={() => checkout("js")}
            className="mt-4 w-full bg-[#f0a262] hover:bg-[#47a599] text-white py-2 rounded"
          >
            {t("plans.getPlan")}
          </button>

        </div>

      </div>

    </section>
  );
}