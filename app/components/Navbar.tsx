"use client";

import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {

  const router = useRouter();
  const pathname = usePathname();

  function goToCourses() {

    if (pathname !== "/") {
      router.push("/");

      setTimeout(() => {
        const el = document.getElementById("courses");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 300);

    } else {

      const el = document.getElementById("courses");
      el?.scrollIntoView({ behavior: "smooth" });

    }

  }

  function goToPricing() {
    router.push("/unlockPro");
  }

  return (
    <nav className="fixed w-full h-17 flex justify-between items-center px-12 py-5 bg-[#fff8f3] border-b border-[#264653]/20">
    <div className="flex items-center gap-10">
      <div
        onClick={() => router.push("/")}
        className="text-3xl font-bold text-[#2a4d60] cursor-pointer"
      >
        Sy<span className="text-[#47a599]">n</span><span className="text-[#E76F51]">taX</span>

      </div>

      <div className="flex gap-6 text-l text-[#264653]">
        <button
          onClick={goToCourses}
          className="hover:text-[#E76F51] transition"
        >
          Courses
        </button>

        <button className="hover:text-[#E76F51] transition">
          Paths
        </button>
      </div>
    </div>

      <div className="flex gap-3">

        <button className="text-l text-[#264653] hover:text-[#47a599] transition">
          Log in
        </button>

        <button className="bg-[#E76F51] hover:bg-[#d45d42] text-white px-4 py-2 rounded-lg transition">
          Sign Up
        </button>

      </div>
    
    </nav>
  );
}