"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CourseListCard from "@/app/components/CourseListCard";
import { apiFetch } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import { getCompletedCourseSlugs } from "@/lib/courseCompletion";

type Course = {
  id: number;
  slug: string;
  title: string;
  description?: string | null;
  lessons: Array<{ id: number; title: string; content: string; order: number }>;
};

export default function CoursesDisplay() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/login');
      return;
    }

    (async () => {
      const completed = await getCompletedCourseSlugs();
      setCompletedCourses(completed);
    })();
    apiFetch<Course[]>("/courses")
      .then(setCourses)
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <div className="p-5">
      <div className="border border-[#f0a262] rounded-2xl bg-[#fff8f3] p-6 mt-5 min-h-[500px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#264653]">Cursos</h1>
            <p className="text-[#264653]/90">Selecciona un curso para ver su contenido, codificar en el ejercicio y marcarlo completado.</p>
          </div>
          <p className="text-sm text-[#264653]/80">{completedCourses.length} de {courses.length} completados</p>
        </div>

        <div className="mb-6 rounded-2xl border border-[#264653]/10 bg-white p-5 text-[#264653] shadow-sm">
          <h2 className="font-semibold text-lg">Guía rápida para aprender</h2>
          <p className="mt-2 text-sm leading-6">
            1) Elige un curso. 2) Abre una lección. 3) Usa el editor con sintaxis para escribir tu respuesta. 4) Marca el curso como completado al terminar.
          </p>
          <p className="mt-3 text-sm text-[#264653]/80">
            Este listado carga los cursos desde el backend con la API en <code className="rounded bg-[#eef2ff] px-1 py-0.5">/courses</code>. Cada curso tiene detalles en <code className="rounded bg-[#eef2ff] px-1 py-0.5">/courses/slug</code>.
          </p>
        </div>

        {loading && <p className="text-[#264653]">Cargando cursos...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[...courses]
              .sort((a, b) => {
                const aSlug = a.slug.toLowerCase();
                const bSlug = b.slug.toLowerCase();
                if (aSlug.includes("python") && !bSlug.includes("python")) return -1;
                if (!aSlug.includes("python") && bSlug.includes("python")) return 1;
                return 0;
              })
              .map((course) => {
                const slug = course.slug.toLowerCase();
                const img = slug.includes("javascript") || slug.includes("js") ? "/jsh.jpg" : slug.includes("python") ? "/Py.jpg" : "/Java.jpg";
                return (
                  <CourseListCard
                    key={course.id}
                    slug={course.slug}
                    title={course.title}
                    lessons={`${course.lessons.length} lecciones`}
                    img={img}
                    completed={completedCourses.includes(course.slug)}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
