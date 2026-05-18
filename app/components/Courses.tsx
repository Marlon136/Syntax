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

const getCoursePrice = (slug: string) => {
  if (slug.includes("javascript") || slug.includes("js")) return "Pro: $39.99";
  if (slug.includes("python")) return "Pro: $49.99";
  if (slug.includes("java")) return "Pro: $59.99";
  return "Pro: $49.99";
};

export default function Courses() {
  const { t } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCompletedCourses(getCompletedCourseSlugs());
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

        {loading && <p className="text-white">Loading courses...</p>}
        {error && <p className="text-red-300">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                slug={course.slug}
                title={course.title}
                lessons={`${course.lessons.length}+ Lessons`}
                price={getCoursePrice(course.slug)}
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