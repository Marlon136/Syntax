"use client";
import Image from "next/image";

export default function PricingHero() {

  const goToPlans = () => {
    const element = document.getElementById("plans");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="px-16 py-20 bg-neutral-50 flex justify-between items-center">

      <div className="max-w-2xl">

        <p className="text-sm text-[#47a599] font-semibold mb-3">
          LEVEL UP YOUR CODING SKILLS
        </p>

        <h1 className="text-5xl font-bold text-[#2a4d60] mb-5">
          Unlock Your Full Potential with
          <span className="text-[#2a4d60]"> Sy</span> 
          <span className="text-[#47a599]">n</span> 
          <span className="text-[#E76F51]">taX Pro</span>
        </h1>

        <p className="text-[#2a4d60]/80 mb-6">
          Master coding faster with advanced learning tools.
        </p>

        <button
          onClick={goToPlans}
          className="bg-[#f0a262] hover:bg-[#d45d42] text-white px-6 py-3 rounded-lg"
        >
          Upgrade Now
        </button>

      </div>

      <Image
        src="/gopro.jpg"
        alt="code"
        width={600}
        height={200}
        className="w-[600px] h-[270px] object-cover rounded-xl shadow"
      />

    </section>
  );
}