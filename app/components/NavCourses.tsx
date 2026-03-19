"use client";

import { useRouter, usePathname } from "next/navigation";
import { use, useState } from "react";

export default function NavCourses({ setView }: any) {

const router = useRouter();

  return (
    <nav className="w-medium h-17 flex justify-between items-center px-12 py-5 bg-[#fff8f3] border-b border-[#264653]/20">
    <div className="flex items-center gap-10">
      

      <div style={{ display: "flex", gap: "10px" }}>
      
      <button 
      onClick={() => setView("java")}
      className="bg-[#f0a262] hover:bg-[#d45d42] text-white px-6 py-3 rounded transition">
        Java
      </button>

      <button 
      onClick={() => setView("python")}
      className="bg-[#f0a262] hover:bg-[#d45d42] text-white px-6 py-3 rounded transition">
        Python
      </button>

      <button 
      onClick={() => setView("js")}
      className="bg-[#f0a262] hover:bg-[#d45d42] text-white px-6 py-3 rounded transition">
        JavaScript
      </button>

    </div>


    </div>
    </nav>
  );
}


