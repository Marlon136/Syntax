"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/providers/LanguageProvider";
import ProfileModal from "./ProfileModal";
import { apiFetch } from "@/lib/api";

export default function Navbar() {

  const router = useRouter();
  const pathname = usePathname(); // 👈 detecta cambio de página
  const searchParams = useSearchParams();

  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const { lang, setLang, t } = useLanguage();

  function changeLanguage(value: string) {
    const selected = value as "en" | "pt" | "es";
    if (selected === lang) return;

    setLang(selected);

    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("lang", selected);
    router.replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const cookie =
      document.cookie.includes("syntax-auth=1");

    setIsLogged(cookie);

    const storedEmail =
      localStorage.getItem("syntax-user-email");

    setEmail(storedEmail);

    if (cookie) {
      apiFetch('/users/me').then((u) => setUser(u)).catch(() => setUser(null));
    } else {
      setUser(null);
    }

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
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-wrap items-center justify-between gap-4 bg-[#fff8f3] border-b border-[#264653]/20 px-4 py-3 sm:px-6 lg:px-12">

      <div className="flex flex-wrap items-center gap-4">

        <div
          onClick={() => router.push("/")}
          className="text-2xl sm:text-3xl font-bold text-[#2a4d60] cursor-pointer"
        >
          Sy<span className="text-[#47a599]">n</span>
          <span className="text-[#E76F51]">taX</span>
        </div>


        {isLogged && (
          <div className="flex gap-6 text-l text-[#264653]">

            <button onClick={goToCourses}>
              {t('nav.courses')}
            </button>

            <button onClick={goToPath}>
              {t('nav.paths')}
            </button>

            <button onClick={goToSubscribe}>
              {t('nav.getPro')}
            </button>

          </div>
        )}

      </div>


      <div className="flex flex-wrap items-center gap-3">

        <select
          value={lang}
          onChange={(event) => changeLanguage(event.target.value)}
          className="border border-[#264653]/30 rounded-lg px-3 py-2 text-sm bg-white text-[#264653]"
          aria-label={t("nav.language")}
        >
          <option value="en">{t("nav.english")}</option>
          <option value="es">{t("nav.spanish")}</option>
          <option value="pt">{t("nav.portuguese")}</option>
        </select>

        {!isLogged && (
          <>
            <button onClick={() => router.push("/login")}>
              {t('nav.login')}
            </button>

            <button
              onClick={() => router.push("/register")}
              className="bg-[#E76F51] text-white px-4 py-2 rounded-lg"
            >
              {t('nav.signup')}
            </button>
          </>
        )}

        {isLogged && (
          <>
            {user?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <button onClick={() => setProfileOpen(true)} className="w-10 h-10 rounded-full overflow-hidden">
                <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              </button>
            ) : (
              <button onClick={() => setProfileOpen(true)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-sm text-[#264653]">{(user?.name || email || 'U')[0]}</span>
              </button>
            )}

            <button
              onClick={logout}
              className="bg-[#264653] text-white px-4 py-2 rounded-lg"
            >
              {t('nav.logout')}
            </button>

            <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
          </>
        )}

      </div>

    </nav>
  );
}