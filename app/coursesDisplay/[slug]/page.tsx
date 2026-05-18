"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch, postJson } from "@/lib/api";
import { getAuthEmail, getAuthToken, getEmailFromToken } from "@/lib/auth";
import { getCompletedCourseSlugs, markCourseCompleted, markLessonCompleted, getCompletedLessonsForCourseSync } from "@/lib/courseCompletion";
import CodeEditor from "@/app/components/premium/CodeEditor";

type Lesson = {
  id: number;
  title: string;
  content: string;
  order: number;
};

type Course = {
  id: number;
  slug: string;
  title: string;
  description?: string | null;
  lessons: Lesson[];
};

function getStarterCode(slug: string, lesson: Lesson | null) {
  if (!lesson) {
    return "";
  }

  const isPython = slug.includes("python");
  const isJavaScript = slug.includes("javascript");
  const isJava = slug.includes("java");

  if (lesson.title.includes("Introducción") || lesson.title.includes("Sintaxis básica")) {
    return isPython
      ? "# Escribe tu primer programa aquí\n"
      : isJavaScript
      ? "// Escribe tu primer script aquí\n"
      : "// Escribe tu primer programa Java aquí\n";
  }

  if (lesson.title.includes("Tipos") || lesson.title.includes("variables")) {
    return isPython
      ? "x = 10\ny = 'hola'\nis_active = True\nprint(x, y, is_active)\n"
      : isJavaScript
      ? "const x = 10;\nconst y = 'hola';\nconst isActive = true;\nconsole.log(x, y, isActive);\n"
      : "int x = 10;\nString y = \"hola\";\nboolean isActive = true;\nSystem.out.println(x + \" \" + y + \" \" + isActive);\n";
  }

  if (lesson.title.includes("Funciones modernas") || lesson.title.includes("Funciones")) {
    return isJavaScript
      ? "const saludar = (nombre) => {\n  return `Hola ${nombre}`;\n};\nconsole.log(saludar('Mundo'));\n"
      : isPython
      ? "def saludar(nombre):\n    return f'Hola {nombre}'\n\nprint(saludar('Mundo'))\n"
      : "public class Main {\n  public static String saludar(String nombre) {\n    return \"Hola \" + nombre;\n  }\n\n  public static void main(String[] args) {\n    System.out.println(saludar(\"Mundo\"));\n  }\n}\n";
  }

  if (lesson.title.includes("Asincronía")) {
    return "async function obtenerDatos() {\n  const respuesta = await fetch('https://api.example.com/data');\n  const datos = await respuesta.json();\n  console.log(datos);\n}\n\nobtenerDatos();\n";
  }

  return isPython
    ? "# Escribe tu solución aquí\n"
    : "// Escribe tu solución aquí\n";
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [code, setCode] = useState<string>("");
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [authEmail, setAuthEmail] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lessonOrder, setLessonOrder] = useState(1);
  const [formError, setFormError] = useState<string | null>(null);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const slug = params.slug as string;
  const editorLanguage = slug.includes("python")
    ? "python"
    : slug.includes("javascript")
    ? "javascript"
    : "java";

  useEffect(() => {
    // Proteger ruta: si no hay token, redirigir a login
    const token = getAuthToken();
    if (!token) {
      router.push('/login');
      return;
    }

    (async () => {
      const completed = await getCompletedCourseSlugs();
      setCompletedCourses(completed);
    })();
    setAuthEmail(getAuthEmail());
    if (!slug) return;
    apiFetch<Course>(`/courses/${slug}`)
      .then((data) => {
        setCourse(data);
        const firstLesson = data.lessons[0] ?? null;
        setSelectedLesson(firstLesson);
        setCode(getStarterCode(slug, firstLesson));
        setLessonOrder((data.lessons.length || 0) + 1);
      })
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false));
  }, [slug, router]);

  function handleComplete() {
    if (!slug) return;
    // Persist completion to server (adds points) and then update local state
    const token = getAuthToken();
    if (!token) {
      router.push('/login');
      return;
    }

    (async () => {
      try {
        await postJson('/scores', { courseId: course?.id, points: 1000 });
        // refresh completed courses from server
        const res = await fetch((process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001') + '/users/me/completed-courses', { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (Array.isArray(data)) {
          setCompletedCourses(data);
          // keep local copy as well
          data.forEach((s: string) => markCourseCompleted(s));
        }
      } catch (err) {
        console.error('Error marking course complete', err);
        // fallback to local-only
        const updated = markCourseCompleted(slug);
        setCompletedCourses(updated);
      }
    })();
  }

  const isCompleted = slug ? completedCourses.includes(slug) : false;
  const effectiveEmail = (authEmail ?? getAuthEmail() ?? getEmailFromToken())?.toLowerCase().trim();
  const isMarlon = effectiveEmail === 'marlon@gmail.com';

  async function handleCreateLesson(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setFormMessage(null);

    if (!slug) {
      setFormError('No se encontró el curso.');
      return;
    }

    if (!lessonTitle.trim() || !lessonContent.trim()) {
      setFormError('Completa título y enunciado antes de guardar.');
      return;
    }

    try {
      const created = await postJson<Lesson>(`/courses/${slug}/lessons`, {
        title: lessonTitle,
        content: lessonContent,
        order: Number(lessonOrder) || undefined,
      });

      setCourse((current) =>
        current
          ? {
              ...current,
              lessons: [...current.lessons, created],
            }
          : current,
      );
      setLessonTitle('');
      setLessonContent('');
      setLessonOrder((course?.lessons.length || 0) + 2);
      setFormMessage('Lección creada correctamente.');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Error al crear la lección.');
    }
  }

  return (
    <div className="p-5">
      <div className="border border-[#f0a262] rounded-2xl bg-[#fff8f3] p-6 mt-5 min-h-[500px]">
        <button
          className="mb-4 inline-flex items-center gap-2 rounded-lg border border-[#264653]/30 bg-white px-4 py-2 text-sm text-[#264653] hover:bg-[#f0e8d8]"
          onClick={() => router.push('/coursesDisplay')}
        >
          ← Volver a cursos
        </button>

        {loading && <p className="text-[#264653]">Cargando curso...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && course && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#264653]">{course.title}</h1>
                <p className="text-[#264653]/90">{course.description || 'Este curso no tiene descripción.'}</p>
              </div>
              <span className={isCompleted ? "rounded-full bg-[#2a9d8f] px-4 py-2 text-sm text-white" : "rounded-full bg-[#e76f51] px-4 py-2 text-sm text-white"}>
                {isCompleted ? 'Completado' : 'En progreso'}
              </span>
            </div>

            <div className="rounded-2xl border border-[#264653]/10 bg-[#eaf7f1] p-5 text-[#264653]">
              <h2 className="font-semibold text-lg">¿Cómo aprender bien con este curso?</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6">
                <li>Selecciona una lección en la columna izquierda.</li>
                <li>Lee el enunciado y usa el editor para probar tu solución.</li>
                <li>Guarda tu código localmente y vuelve cuando quieras.</li>
                <li>Marca el curso como completado cuando termines todas las lecciones.</li>
              </ol>
              <p className="mt-3 text-xs text-[#264653]/80">El editor usa resaltado de sintaxis para que veas mejor el código.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
              <div className="rounded-2xl border border-[#264653]/20 bg-white p-5">
                <h2 className="mb-4 text-xl font-semibold text-[#264653]">Lecciones</h2>
                <ul className="space-y-3">
                  {course.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <button
                        className={`w-full text-left rounded-xl border px-4 py-3 transition ${selectedLesson?.id === lesson.id ? 'border-[#264653] bg-[#f0e8d8]' : 'border-[#d1d5db] bg-white hover:border-[#264653]'}`}
                        onClick={() => {
                          setSelectedLesson(lesson);
                          setCode(getStarterCode(slug, lesson));
                        }}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-medium text-[#264653]">{lesson.title}</span>
                          <span className="text-sm text-[#64748b]">Ejercicio</span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-[#264653]/20 bg-white p-5">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-[#264653]">Editor de código</h2>
                      <p className="text-sm text-[#64748b]">Escribe o ajusta tu solución para el ejercicio seleccionado.</p>
                    </div>
                    <span className="rounded-full bg-[#264653] px-3 py-1 text-sm text-white">{selectedLesson?.title ?? 'Selecciona una lección'}</span>
                  </div>
                  <div className="rounded-2xl border border-[#d1d5db] bg-[#f8fafc] p-5">
                    <h3 className="mb-3 text-lg font-semibold text-[#264653]">Enunciado</h3>
                    <p className="mb-5 whitespace-pre-line text-sm leading-7 text-[#264653]/90">
                      {selectedLesson?.content || 'Selecciona una lección para ver el enunciado.'}
                    </p>
                    <div className="rounded-2xl border border-[#d1d5db] bg-white p-2">
                      <CodeEditor code={code} setCode={setCode} language={editorLanguage} />
                    </div>
                  </div>
                    </div>
                    <div className="mt-3 flex gap-3">
                      <button
                        onClick={async () => {
                          if (!course || !selectedLesson) return;
                          const result = await markLessonCompleted(course.id, slug, selectedLesson.id, course.lessons.length);
                          if (result.completed) {
                            // refresh completed courses list from server if possible
                            const token = getAuthToken();
                            if (token) {
                              try {
                                const api = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
                                const res = await fetch(`${api}/users/me/completed-courses`, { headers: { Authorization: `Bearer ${token}` } });
                                const data = await res.json();
                                if (Array.isArray(data)) setCompletedCourses(data);
                              } catch (err) {
                                // fallback to local
                                setCompletedCourses(markCourseCompleted(slug));
                              }
                            } else {
                              setCompletedCourses(markCourseCompleted(slug));
                            }
                          }
                        }}
                        className="rounded-2xl bg-[#F4A261] px-4 py-2 text-sm font-bold text-white"
                      >
                        Marcar lección completada
                      </button>
                      <div className="ml-auto text-sm text-gray-500">
                        {course ? `${course.lessons.length - getCompletedLessonsForCourseSync(slug).length} lecciones restantes` : ''}
                      </div>
                    </div>
                {isMarlon && (
                  <div className="rounded-2xl border border-[#264653]/20 bg-white p-5">
                    <h3 className="mb-4 text-xl font-semibold text-[#264653]">Crear nueva lección</h3>
                    <form onSubmit={handleCreateLesson} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#264653]">Título de la lección</label>
                        <input
                          value={lessonTitle}
                          onChange={(event) => setLessonTitle(event.target.value)}
                          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-[#264653] focus:ring-2 focus:ring-[#264653]/20"
                          placeholder="Por ejemplo: Bucles en JavaScript"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#264653]">Enunciado</label>
                        <textarea
                          value={lessonContent}
                          onChange={(event) => setLessonContent(event.target.value)}
                          className="mt-2 w-full min-h-[120px] rounded-lg border px-4 py-3 outline-none focus:border-[#264653] focus:ring-2 focus:ring-[#264653]/20"
                          placeholder="Describe qué debe resolver el estudiante"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#264653]">Orden</label>
                        <input
                          type="number"
                          min={1}
                          value={lessonOrder}
                          onChange={(event) => setLessonOrder(Number(event.target.value))}
                          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-[#264653] focus:ring-2 focus:ring-[#264653]/20"
                        />
                      </div>
                      {formError && <p className="text-sm text-red-500">{formError}</p>}
                      {formMessage && <p className="text-sm text-[#2a9d8f]">{formMessage}</p>}
                      <button
                        type="submit"
                        className="rounded-2xl bg-[#2a9d8f] px-6 py-3 text-white hover:bg-[#23825c]"
                      >
                        Guardar lección
                      </button>
                    </form>
                  </div>
                )}
                {!isMarlon && authEmail && (
                  <div className="rounded-2xl border border-[#e76f51]/20 bg-[#fff1f0] p-4 text-[#9b2c2c]">
                    Solo el usuario <strong>Marlon@gmail.com</strong> puede crear lecciones desde aquí.
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleComplete}
                    className="rounded-2xl bg-[#2a9d8f] px-6 py-3 text-white transition hover:bg-[#23825c]"
                  >
                    Marcar curso completado
                  </button>
                  <button
                    onClick={() => alert('Tu código se guardó localmente en este editor.')}
                    className="rounded-2xl border border-[#264653] px-6 py-3 text-[#264653] transition hover:bg-[#f0e8d8]"
                  >
                    Guardar ejercicio
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
