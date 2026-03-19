"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {

  const router = useRouter();


  const [mounted, setMounted] = useState(false);


  const [isLogged] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.cookie.includes("syntax-auth=1");
  });


  const [email] = useState(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("syntax-user-email");
  });


  // mount guard
  if (!mounted) {
    if (typeof window !== "undefined") {
      setMounted(true);
    }
    return null;
  }



  function logout() {

    document.cookie =
      "syntax-auth=; Path=/; Max-Age=0";

    localStorage.removeItem(
      "syntax-user-email"
    );

    router.push("/");
    router.refresh();
  }


  function goToCourses() {
    router.push("/coursesDisplay");
  }

  function goToPath() {
    router.push("/learningPath");
  }

  function goToSubscribe() {
    router.push("/subscribe");
  }


  return (
    <nav className="fixed w-full h-17 flex justify-between items-center px-12 py-5 bg-[#fff8f3] border-b border-[#264653]/20">

      <div className="flex items-center gap-10">

        <div
          onClick={() => router.push("/")}
          className="text-3xl font-bold text-[#2a4d60] cursor-pointer"
        >
          Sy<span className="text-[#47a599]">n</span>
          <span className="text-[#E76F51]">taX</span>
        </div>


        {isLogged && (
          <div className="flex gap-6 text-l text-[#264653]">

            <button onClick={goToCourses}>
              Courses
            </button>

            <button onClick={goToPath}>
              Paths
            </button>

            <button onClick={goToSubscribe}>
              Get Pro
            </button>

          </div>
        )}

      </div>



      <div className="flex gap-3">

        {!isLogged && (
          <>
            <button
              onClick={() => router.push("/login")}
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
            <span>{email || "User"}</span>

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