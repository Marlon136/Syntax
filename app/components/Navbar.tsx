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

    <nav className="flex justify-between items-center px-12 py-5 bg-neutral-50 border-b border-[#264653]/20">

      {/* LOGO */}

      <div
        onClick={() => router.push("/")}
        className="text-xl font-bold text-[#E76F51] cursor-pointer"
      >
        Syntax
      </div>



      {/* MENU */}

      <div className="flex gap-6 text-sm text-[#264653]">

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



      {/* RIGHT */}

      <div className="flex gap-3 items-center">

        {!isLogged && (

          <>
            <button
              onClick={() => router.push("/login")}
              className="text-[#264653] hover:text-[#E76F51]"
            >
              Log in
            </button>

            <button
              onClick={() => router.push("/premium")}
              className="bg-[#E76F51] text-white px-4 py-2 rounded-lg"
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