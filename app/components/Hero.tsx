"use client";

import Image from "next/image";
import { useState } from "react";
import CurriculumModal from "./CurriculumModal";

export default function Hero() {

  const [open, setOpen] = useState(false);

  function goToCourses() {
    const el = document.getElementById("courses");
    el?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="flex justify-between items-center px-16 py-20 bg-neutral-50">

      <div className="max-w-xl">

        <h1 className="text-5xl font-bold mb-4 text-[#264653]">
          Master <span className="text-[#E76F51]">Java</span> & Beyond
        </h1>

        <p className="text-[#264653]/80 mb-6 text-lg">
          Learn Java, Python, and JavaScript through
          interactive lessons.
        </p>

        <div className="flex gap-4">

          <button
            onClick={goToCourses}
            className="bg-[#E76F51] hover:bg-[#d45d42] text-white px-6 py-3 rounded-lg transition"
          >
            Start Learning
          </button>

          <button
            onClick={() => setOpen(true)}
            className="border border-[#264653]/30 px-6 py-3 text-[#264653] rounded-lg hover:bg-[#264653]/10 transition"
          >
            View Curriculum
          </button>

        </div>

      </div>

      <Image
        src="/homeimaage.jpg"
        alt="code"
        width={600}
        height={200}
        className="w-[600px] h-[270px] object-cover rounded-xl shadow"
      />

      <CurriculumModal
        open={open}
        onClose={() => setOpen(false)}
      />

    </section>
  );
}