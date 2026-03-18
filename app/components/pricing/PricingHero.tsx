"use client";

export default function PricingHero() {

  const checkout = async () => {

    const res = await fetch("/api/checkout", {
      method: "POST",
    });

    const data = await res.json();

    window.location.href = data.url;
  };

  return (
    <section className="px-16 py-20 bg-neutral-50 flex justify-between items-center">

      <div className="max-w-xl">

        <p className="text-sm text-[#E76F51] font-semibold mb-3">
          NEW · SUPER POWERED DASHBOARD
        </p>

        <h1 className="text-5xl font-bold text-[#264653] mb-4">
          Unlock Your Full Potential with
          <span className="text-[#E76F51]"> Syntax Pro</span>
        </h1>

        <p className="text-[#264653]/80 mb-6">
          Master coding faster with advanced learning tools.
        </p>

        <button
          onClick={checkout}
          className="bg-[#E76F51] hover:bg-[#d45d42] text-white px-6 py-3 rounded-lg"
        >
          Upgrade Now
        </button>

      </div>

      <div className="w-[420px] h-[260px] rounded-2xl bg-gradient-to-br from-orange-200 to-purple-200 shadow-xl" />

    </section>
  );
}