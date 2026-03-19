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

export default function PremiumContentJS() {

  const lessons: Lesson[] = [
    {
      title: "Intro",
      text: "Print in JavaScript",
      code: `console.log("Hello");`,
    },
    {
      title: "Variables",
      text: "Create variables",
      code: `let x = 5;
console.log(x);`,
    },
    {
      title: "If",
      text: "If statement",
      code: `let x = 10;

if (x > 5) {
  console.log("Big");
}`,
    },
    {
      title: "Function",
      text: "Functions in JS",
      code: `function greet() {
  console.log("Hello");
}

greet();`,
    },
  ];

  const exercises: Exercise[] = [
    {
      title: "Variable exercise",
      description: "Create let x = 10 and print it",
      code: `let x = 10;
console.log(x);`,
    },
    {
      title: "Loop challenge",
      description: "Print numbers 0 to 4",
      code: `for (let i = 0; i < 5; i++) {
  console.log(i);
}`,
    },
    {
      title: "Function exercise",
      description: "Create a function that prints Hi",
      code: `function sayHi() {
  console.log("Hi");
}

sayHi();`,
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