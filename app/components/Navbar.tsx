"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {

  const router = useRouter();
  const pathname = usePathname(); // 👈 detecta cambio de página

  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);


  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const cookie =
      document.cookie.includes("syntax-auth=1");

    setIsLogged(cookie);

    const storedEmail =
      localStorage.getItem("syntax-user-email");

    setEmail(storedEmail);

  }, [pathname]); // 👈 se ejecuta cada vez que cambias de página


  if (!mounted) return null;


  function logout() {

    document.cookie =
      "syntax-auth=; Path=/; Max-Age=0";

    localStorage.removeItem(
      "syntax-user-email"
    );

    setIsLogged(false);

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
    <nav className="fixed w-full h-16 flex justify-between items-center px-12 py-5 bg-[#fff8f3] border-b border-[#264653]/20">

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
            <button onClick={() => router.push("/login")}>
              Log in
            </button>

            <button
              onClick={() => router.push("/login")}
              className="bg-[#E76F51] text-white px-4 py-2 rounded-lg"
            >
              Sign Up
            </button>
          </>
        )}


        {isLogged && (
          <>
            <span>{email}</span>

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