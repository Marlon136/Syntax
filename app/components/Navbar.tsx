"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {

  const router = useRouter();

  const isLogged =
    typeof document !== "undefined" &&
    document.cookie.includes("syntax-auth=1");

  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("syntax-user-email")
      : null;



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

        {/* LOGO */}
        <div
          onClick={() => router.push("/")}
          className="text-3xl font-bold text-[#2a4d60] cursor-pointer"
        >
          Sy<span className="text-[#47a599]">n</span>
          <span className="text-[#E76F51]">taX</span>
        </div>


        {/* SOLO SI ESTA LOGUEADO */}
        {isLogged && (

          <div className="flex gap-6 text-l text-[#264653]">

            <button
              onClick={goToCourses}
              className="hover:text-[#E76F51]"
            >
              Courses
            </button>

            <button
              onClick={goToPath}
              className="hover:text-[#E76F51]"
            >
              Paths
            </button>

            <button
              onClick={goToSubscribe}
              className="hover:text-[#E76F51]"
            >
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
            <span>
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