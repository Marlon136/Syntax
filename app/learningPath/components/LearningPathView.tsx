"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken, authHeaders } from "@/lib/auth";
import { getCompletedLessonsSync, getCompletedCourseSlugsSync } from "@/lib/courseCompletion";

type Milestone = {
  id: number;
  title: string;
  status: "completed" | "in-progress" | "locked";
  side: "left" | "right";
  progress?: number;
  slug?: string;
  courseTitle?: string;
  lessonsRemainingInCourse?: number;
  lessonCompleted?: boolean;
  coursePercent?: number;
};

export function LearningPathView() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [learningPath, setLearningPath] = useState<any>(null);
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);

  const loadMilestones = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const api = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
      
      // Fetch first learning path
      const pathsRes = await fetch(`${api}/learning-paths`, { headers: { ...authHeaders() } });
      const paths = await pathsRes.json();
      const path = Array.isArray(paths) && paths[0] ? paths[0] : null;
      
      if (!path) {
        setMilestones([]);
        setLoading(false);
        return;
      }

      setLearningPath(path);

      // fetch completed courses for current user
      const completedRes = await fetch(`${api}/users/me/completed-courses`, { headers: { ...authHeaders() } });
      let completed: string[] = [];
      if (completedRes.ok) {
        const data = await completedRes.json();
        completed = Array.isArray(data) ? data : getCompletedCourseSlugsSync();
      } else {
        completed = getCompletedCourseSlugsSync();
      }
      setCompletedCourses(completed);

      // build milestones as one node per lesson (ordered by path course and lesson order)
      const pcs = Array.isArray(path.pathCourses)
        ? [...path.pathCourses].sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
        : [];
      const lessonsMap = getCompletedLessonsSync();
      const built: Milestone[] = [];

      for (const pc of pcs) {
        const courseTitle = pc.course?.title ?? `Curso ${pc.courseId ?? ""}`;
        const courseSlug = pc.course?.slug;
        const courseKey = courseSlug ?? String(pc.courseId);
        const lessons = Array.isArray(pc.course?.lessons)
          ? [...pc.course.lessons].sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
          : [];

        const completedLessonIds = new Set<number>(lessonsMap[courseKey] ?? []);
        const isCourseCompleted = Boolean(
          (courseSlug && completed.includes(courseSlug)) || completed.includes(String(pc.courseId))
        );
        const courseDoneCount = isCourseCompleted ? lessons.length : completedLessonIds.size;
        const lessonsRemainingInCourse = Math.max(0, lessons.length - courseDoneCount);
        const coursePercent = lessons.length > 0 ? Math.round((courseDoneCount / lessons.length) * 100) : 0;

        for (const lesson of lessons) {
          const lessonCompleted = isCourseCompleted || completedLessonIds.has(lesson.id);
          built.push({
            id: lesson.id,
            title: lesson.title,
            status: "locked",
            side: built.length % 2 === 0 ? "left" : "right",
            progress: lessonCompleted ? 100 : 0,
            slug: courseSlug,
            courseTitle,
            lessonsRemainingInCourse,
            lessonCompleted,
            coursePercent,
          });
        }
      }

      // assign statuses: completed for lessons already done, in-progress for next available lesson, rest locked
      let unlocked = false;
      for (const m of built) {
        if (m.lessonCompleted) {
          m.status = 'completed';
          m.progress = 100;
        } else if (!unlocked) {
          m.status = 'in-progress';
          m.progress = Math.max(10, m.coursePercent ?? 10);
          unlocked = true;
        } else {
          m.status = 'locked';
          m.progress = 0;
        }
      }

      setMilestones(built);
    } catch (err) {
      console.error('Error loading learning path', err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Load milestones on mount
  useEffect(() => {
    loadMilestones();
  }, [loadMilestones]);

  // Listen for storage changes (when lessons are marked as completed in other tabs or components)
  useEffect(() => {
    const handleStorageChange = () => {
      console.log('Storage changed, reloading milestones...');
      loadMilestones();
    };

    // Listen to storage events from other tabs
    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom events from the same tab (when lessons are marked completed)
    window.addEventListener('lesson-completed', handleStorageChange);
    window.addEventListener('course-completed', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('lesson-completed', handleStorageChange);
      window.removeEventListener('course-completed', handleStorageChange);
    };
  }, [loadMilestones]);

  const completedCount = milestones.filter((item) => item.status === "completed").length;
  const totalProgress = milestones.length ? Math.round(milestones.reduce((acc, item) => acc + (item.progress ?? 0), 0) / milestones.length) : 0;

  const visibleMilestones = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return milestones;
    }

    return milestones.filter((item) => item.title.toLowerCase().includes(normalized));
  }, [milestones, query]);

  return (
    <div className="flex min-h-screen bg-neutral-50 text-[#264653] font-sans">
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-6xl p-4 md:p-8">
          <section className="mb-10 rounded-3xl border border-[#e5e7eb] bg-white p-8 shadow-sm">
            <nav className="mb-3 flex gap-2 text-xs font-semibold uppercase tracking-widest text-[#2A9D8F]/80">
              <span>Curso</span>
              <span>/</span>
              <span className="text-[#264653]">Especialización</span>
            </nav>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-4xl font-semibold text-[#264653]">Ruta de Aprendizaje</h1>
                <p className="mt-2 text-lg leading-relaxed text-[#64748b]">
                  Cada vez que completes una lección se reflejará en tu hoja de ruta.
                </p>
              </div>
              <button
                onClick={() => router.push("/leaderboard")}
                className="inline-flex items-center justify-center rounded-2xl bg-[#F4A261] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e5983f]"
              >
                Ver leaderboard
              </button>
            </div>
          </section>

          <section className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              ["Racha de Días", `${Math.max(1, completedCount * 3)} Días`, "local_fire_department", "#F59E0B", "Sigue así"],
              ["Total XP", `${(completedCount * 3500 + totalProgress * 10).toLocaleString("es-ES")}`, "stars", "#F4A261", "+450 hoy"],
              ["Progreso", `${completedCount}/${milestones.length}`, "check_circle", "#0D9488", "Lecciones completadas"],
            ].map(([title, value, icon, iconColor, footer]) => (
              <article
                key={title}
                className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">{title}</p>
                  <div className="rounded-2xl bg-[#f8fafc] p-2">
                    <span className="material-symbols-outlined text-xl" style={{ color: iconColor }}>
                      {icon}
                    </span>
                  </div>
                </div>
                <p className="text-3xl font-semibold text-[#264653]">{value}</p>
                <p className="mt-2 text-sm font-medium text-[#2A9D8F]">{footer}</p>
              </article>
            ))}
          </section>

          <section className="relative pb-20">
            <h2 className="mb-10 flex items-center gap-3 text-2xl font-semibold text-[#264653]">
              <span className="h-1 w-10 rounded-full bg-[#F4A261]" />
              Tu hoja de ruta
            </h2>

            <div className="relative flex flex-col items-center gap-16">
              {loading && <p className="text-[#64748b]">Cargando ruta...</p>}
              {visibleMilestones.map((item, index) => {
                const isCompleted = item.status === "completed";
                const isInProgress = item.status === "in-progress";
                const isLocked = item.status === "locked";

                return (
                  <div key={`${item.slug ?? "course"}-${item.id}`} className="relative z-10 flex w-full justify-center">
                    <div
                      className={`flex items-center justify-center rounded-full border-4 border-white ${
                        isInProgress
                          ? "h-28 w-28 border-[#F4A261] bg-white ring-8 ring-[#F4A261]/10"
                          : isCompleted
                            ? "h-20 w-20 bg-[#2A9D8F] shadow-xl shadow-[#2A9D8F]/20"
                            : "h-20 w-20 bg-gray-100 text-gray-400 shadow-inner"
                      }`}
                    >
                      <span className={`material-symbols-outlined ${isInProgress ? "text-5xl text-[#F4A261]" : "text-3xl"}`}>
                        {isInProgress ? "play_circle" : isLocked ? "lock" : "check"}
                      </span>
                    </div>

                    <div
                      className={`absolute top-2 w-72 rounded-3xl border bg-white p-5 shadow-sm ${
                        item.side === "left" ? "left-[56%]" : "right-[56%] text-right"
                      } ${isInProgress ? "border-[#F4A261] shadow-lg" : "border-[#e5e7eb]"} ${isLocked ? "opacity-70" : ""}`}
                    >
                      <p
                        className={`mb-2 text-[11px] font-bold uppercase tracking-[0.2em] ${
                          isCompleted || isInProgress ? "text-[#264653]" : "text-gray-400"
                        }`}
                      >
                        {isInProgress ? "En progreso" : isCompleted ? "Completado" : "Bloqueado"}
                      </p>
                      <p className={`text-sm font-bold leading-tight ${isLocked ? "text-gray-400" : "text-[#264653]"}`}>
                        {item.title}
                      </p>
                      {item.courseTitle ? (
                        <p className="mt-2 text-xs font-semibold text-[#64748b]">{item.courseTitle}</p>
                      ) : null}
                      {typeof item.lessonsRemainingInCourse === "number" ? (
                        <p className="mt-2 text-xs font-medium text-[#64748b]">
                          {item.lessonsRemainingInCourse} lecciones faltantes en este curso
                        </p>
                      ) : null}

                      {isInProgress ? (
                        <>
                          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#e2e8f0]">
                            <div className="h-full rounded-full bg-[#F4A261]" style={{ width: `${item.progress ?? 0}%` }} />
                          </div>
                          <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-[#64748b]">
                            <span>Avance</span>
                            <span>{item.progress}%</span>
                          </div>
                        </>
                      ) : null}
                    </div>

                    {index < visibleMilestones.length - 1 ? (
                      <div
                        className={`absolute left-1/2 top-[78px] h-24 w-1.5 -translate-x-1/2 rounded-full ${
                          isCompleted || isInProgress ? "bg-[#F4A261]" : "bg-gray-200"
                        }`}
                      />
                    ) : null}
                  </div>
                );
              })}

              {visibleMilestones.length === 0 && !loading ? (
                <p className="rounded-3xl bg-white p-6 text-sm font-semibold text-[#64748b] shadow-sm">
                  No encontramos módulos con esa búsqueda.
                </p>
              ) : null}
            </div>
          </section>

          <section className="mt-4 rounded-3xl border border-white/20 bg-gradient-to-br from-[#F4A261] to-[#E76F51] p-8 text-white shadow-2xl shadow-[#F4A261]/30">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
                    Proximo Hito
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-white/80">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    Lectura de 15 min
                  </span>
                </div>
                <h3 className="text-2xl font-black">Interfaces y Abstraccion</h3>
                <p className="mt-2 max-w-md font-medium text-white/90">
                  Desbloquea el nucleo del codigo modular. Completa cursos para avanzar en la ruta.
                </p>
              </div>

              <button
                type="button"
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                className="rounded-2xl bg-white px-10 py-4 font-black text-[#F4A261] shadow-xl transition-all hover:scale-105 hover:shadow-white/20"
              >
                Reanudar Aprendizaje
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
