"use client";

import { useSearchParams } from "next/navigation";

export default function SubscribeStatus() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "1";
  const canceled = searchParams.get("canceled") === "1";

  if (!success && !canceled) return null;

  return (
    <section className="mx-auto max-w-4xl px-6 py-6 text-center">
      <div className={`rounded-2xl border p-6 ${success ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}>
        <h2 className="text-2xl font-semibold text-[#264653] mb-2">
          {success ? "Pago completado" : "Pago cancelado"}
        </h2>
        <p className="text-gray-700">
          {success
            ? "Gracias por tu compra. Tu cuenta se actualizará a Pro en unos minutos."
            : "No se realizó el pago. Puedes volver a intentarlo cuando quieras."}
        </p>
      </div>
    </section>
  );
}
