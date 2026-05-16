"use client";
import CourseCard from "./CourseCard";
import { useLanguage } from "@/app/providers/LanguageProvider";

export default function Courses() {
  const { t } = useLanguage();

  const courses = [
    {
      title: t("courses.java.title"),
      lessons: t("courses.java.lessons"),
      price: t("courses.java.price"),
      img: "/Java.jpg",
      content: [
        t("courses.java.content.oop"),
        t("courses.java.content.spring"),
        t("courses.java.content.collections"),
        t("courses.java.content.threads"),
      ],
    },
    {
      title: t("courses.python.title"),
      lessons: t("courses.python.lessons"),
      price: t("courses.python.price"),
      img: "/Py.jpg",
      content: [
        t("courses.python.content.variables"),
        t("courses.python.content.loops"),
        t("courses.python.content.functions"),
        t("courses.python.content.django"),
      ],
    },
    {
      title: t("courses.js.title"),
      lessons: t("courses.js.lessons"),
      price: t("courses.js.price"),
      img: "/jsh.jpg",
      content: [
        t("courses.js.content.dom"),
        t("courses.js.content.react"),
        t("courses.js.content.node"),
        t("courses.js.content.async"),
      ],
    },
  ];

  return (
    <section 
      id="courses"
      className="bg-[#2a4d60] py-14">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-8 text-[#ffffff]">
          {t("courses.title")}
        </h2>

        <div className="grid grid-cols-3 gap-6">

          <CourseCard
            title="Java Bootcamp"
            lessons="60+ Lessons"
            price="Pro: $59.99"
            img="/Java.jpg"
            content={[
              "OOP",
              "Spring Boot",
              "Collections",
              "Threads",
            ]}
          />

          <CourseCard
            title="Python Mastery"
            lessons="120+ Lessons"
            price="Pro: $49.99"
            img="/Py.jpg"
            content={[
              "Variables",
              "Loops",
              "Functions",
              "Django",
            ]}
          />

          <CourseCard
            title="JavaScript"
            lessons="40+ Lessons"
            price="Pro: $39.99"
            img="/jsh.jpg"
            content={[
              "DOM",
              "React",
              "Node",
              "Async",
            ]}
          />

        </div>

      </div>

    </section>
  );
}