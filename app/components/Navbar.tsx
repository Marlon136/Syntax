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
    <nav className="flex justify-between items-center px-12 py-5 bg-neutral-50 border-b border-[#264653]/20">

      <div
        onClick={() => router.push("/")}
        className="text-xl font-bold text-[#E76F51] cursor-pointer"
      >
        Syntax
      </div>

      <div className="flex gap-6 text-sm text-[#264653]">

        <button
          onClick={goToCourses}
          className="hover:text-[#E76F51] transition"
        >
          Courses
        </button>

        <button className="hover:text-[#E76F51] transition">
          Paths
        </button>

        <button
          onClick={goToPricing}
          className="hover:text-[#E76F51] transition"
        >
          Pricing
        </button>

      </div>

      <div className="flex gap-3">

        <button className="text-[#264653] hover:text-[#E76F51] transition">
          Log in
        </button>

        <button className="bg-[#E76F51] hover:bg-[#d45d42] text-white px-4 py-2 rounded-lg transition">
          Sign Up
        </button>

      </div>

    </nav>
  );
}