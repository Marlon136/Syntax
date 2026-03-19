"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {

  const router = useRouter();
  const pathname = usePathname();

  const [isLogged, setIsLogged] = useState<boolean>(() =>
    typeof document !== "undefined" &&
    document.cookie.includes("syntax-auth=1")
  );

  const [email, setEmail] = useState<string | null>(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("syntax-user-email")
      : null
  );



  function logout() {

    document.cookie =
      "syntax-auth=; Path=/; Max-Age=0";

    localStorage.removeItem(
      "syntax-user-email"
    );

    setIsLogged(false);
    setEmail(null);

    router.push("/");
  }



  function goToCourses() {
    router.push("/premium");
  }


  

  function goToPath() {
    router.push("/learningPath");
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

        <button 
        onClick={goToPath}
        className="hover:text-[#E76F51] transition">
          Paths
        </button>
      </div>



    </div>

      <div className="flex gap-3">

      {!isLogged && (

          <>
            <button
              onClick={() => router.push("/login")}
              className="text-l text-[#264653] hover:text-[#47a599] transition"
            >
              Log in
            </button>

            <button
              onClick={() => router.push("/premium")}
              className="bg-[#E76F51] hover:bg-[#d45d42] text-white px-4 py-2 rounded-lg transition"
            >
              Sign Up
            </button>
          </>

        )}

        {isLogged && (

          <>
            <span className="text-[#264653] font-semibold">

              {email || "User"}

            </span>

            <button
              onClick={logout}
              className="bg-[#264653] text-white px-4 py-2 rounded-lg"
            >
              Log out
            </button>
          </>

        )}

      </div>
    
    </nav>
  );
}
