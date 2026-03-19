"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Hero() {

  const router = useRouter();

  return (
    <section className="flex justify-between items-center px-16 py-20 bg-neutral-50">

      <div className="max-w-xl">

        <h1 className="text-5xl font-bold mb-4 text-[#2a4d60]">
          Master <span className="text-[#E76F51]">Java</span> & Beyond with Syntax
        </h1>

        <p className="text-[#264653]/80 mb-6 text-lg">
          Learn Java, Python, and JavaScript through
          interactive lessons. <br></br>
          Join 6,000+ students and start your coding journey today.
        </p>

        <div className="flex gap-4">

          <button
            onClick={() => router.push("/login")}
            className="bg-[#f0a262] hover:bg-[#d45d42] text-white px-6 py-3 rounded-lg transition"
          >
            Start Learning
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

  

    </section>
  );
}