"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/app/providers/LanguageProvider";
import LessonList from "./LessonList";
import LessonViewer from "./LessonViewer";
import ExerciseList from "./ExerciseList";

export type Lesson = {
  title: string;
  text: string;
  code: string;
};

export type Exercise = {
  title: string;
  description: string;
  code: string;
};

export default function PremiumContentJava() {
  const { t, lang } = useLanguage();

  const lessons: Lesson[] = useMemo(
    () => [
      {
        title: t("premium.java.lesson.condicionales.title"),
        text: t("premium.java.lesson.condicionales.text"),
        code: t("premium.java.lesson.condicionales.code"),
      },
      {
        title: t("premium.java.lesson.intro.title"),
        text: t("premium.java.lesson.intro.text"),
        code: t("premium.java.lesson.intro.code"),
      },
      {
        title: t("premium.java.lesson.variables.title"),
        text: t("premium.java.lesson.variables.text"),
        code: t("premium.java.lesson.variables.code"),
      },
    ],
    [t]
  );

  const exercises: Exercise[] = useMemo(
    () => [
      {
        title: t("premium.java.exercise.condicionales.title"),
        description: t("premium.java.exercise.condicionales.description"),
        code: t("premium.java.exercise.condicionales.code"),
      },
      {
        title: t("premium.java.exercise.variable.title"),
        description: t("premium.java.exercise.variable.description"),
        code: t("premium.java.exercise.variable.code"),
      },
      {
        title: t("premium.java.exercise.loop.title"),
        description: t("premium.java.exercise.loop.description"),
        code: t("premium.java.exercise.loop.code"),
      },
    ],
    [t]
  );

  const [lesson, setLesson] = useState<Lesson>(lessons[0]);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [code, setCode] = useState<string>(lessons[0].code);

  return (
    <section key={lang} className="px-16 pb-16 bg-neutral-50">

      <div className="grid grid-cols-3 gap-6">

        <LessonList
          lessons={lessons}
          setLesson={(l) => {
            setLesson(l);
            setExercise(null);
            setCode(l.code);
          }}
        />

        <LessonViewer
          lesson={
            exercise
              ? {
                  title: exercise.title,
                  text: exercise.description,
                  code: exercise.code,
                }
              : lesson
          }
          code={code}
          setCode={setCode}
        />

        <ExerciseList
          exercises={exercises}
          setExercise={(e) => {
            setExercise(e);
            setCode(e.code);
          }}
        />

      </div>

    </section>
  );
}