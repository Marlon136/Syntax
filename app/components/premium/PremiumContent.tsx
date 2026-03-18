"use client";

import { useState } from "react";
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

export default function PremiumContent() {

  const lessons: Lesson[] = [
    {
      title: "Intro",
      text: "Print in python",
      code: `print("Hello")`,
    },
    {
      title: "Variables",
      text: "Create variables",
      code: `x = 5\nprint(x)`,
    },
  ];

  const exercises: Exercise[] = [
    {
      title: "Variables quiz",
      description: "Create x = 10",
      code: `x = 10\nprint(x)`,
    },
    {
      title: "Loop challenge",
      description: "Print 0-4",
      code: `for i in range(5):\n  print(i)`,
    },
  ];

  const [lesson, setLesson] = useState<Lesson>(lessons[0]);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [code, setCode] = useState<string>(lessons[0].code);

  return (
    <section className="px-16 pb-16 bg-neutral-50">

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