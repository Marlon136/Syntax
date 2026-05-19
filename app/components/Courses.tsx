"use client";
import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { useLanguage } from "@/app/providers/LanguageProvider";
import { apiFetch } from "@/lib/api";
import { getCompletedCourseSlugs } from "@/lib/courseCompletion";

type Course = {
  id: number;
  slug: string;
  title: string;
  description?: string | null;
  lessons: Array<{ id: number; title: string; content: string; order: number }>;
};

const getCourseImage = (slug: string) => {
  if (slug.includes("javascript") || slug.includes("js")) return "/jsh.jpg";
  if (slug.includes("python")) return "/Py.jpg";
  if (slug.includes("java")) return "/Java.jpg";
  return "/Java.jpg";
};

const getCourseLessons = (slug: string, t: (key: string) => string) => {
  if (slug.includes("javascript") || slug.includes("js")) return t("courses.js.lessons");
  if (slug.includes("python")) return t("courses.python.lessons");
  if (slug.includes("java")) return t("courses.java.lessons");
  return t("courses.python.lessons");
};

const getCoursePrice = (slug: string, t: (key: string) => string) => {
  if (slug.includes("javascript") || slug.includes("js")) return t("courses.js.price");
  if (slug.includes("python")) return t("courses.python.price");
  if (slug.includes("java")) return t("courses.java.price");
  return t("courses.python.price");
};

export default function Courses() {
  const { t } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const completed = await getCompletedCourseSlugs();
      setCompletedCourses(completed);
    })();
    apiFetch<Course[]>("/courses")
      .then(setCourses)
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section 
      id="courses"
      className="bg-[#2a4d60] py-14">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-8 text-[#ffffff]">
          {t("courses.title")}
        </h2>

        {loading && <p className="text-white">{t("courses.loading")}</p>}
        {error && <p className="text-red-300">{t("courses.error")}: {error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                slug={course.slug}
                title={course.title}
                lessons={getCourseLessons(course.slug, t)}
                price={getCoursePrice(course.slug, t)}
                img={getCourseImage(course.slug)}
                content={course.lessons.map((lesson) => lesson.title)}
                completed={completedCourses.includes(course.slug)}
              />
            ))}
          </div>
        )}

      </div>

    </section>
  );
}