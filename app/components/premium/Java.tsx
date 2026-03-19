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

export default function PremiumContentJava() {

  const lessons: Lesson[] = [
    {
      title: "Intro",
      text: "Print in Java",
      code: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello");
  }
}`,
    },
    {
      title: "Variables",
      text: "Create variables in Java",
      code: `public class Main {
  public static void main(String[] args) {
    int x = 5;
    System.out.println(x);
  }
}`,
    },
    {
      title: "If",
      text: "If statement",
      code: `public class Main {
  public static void main(String[] args) {
    int x = 10;

    if (x > 5) {
      System.out.println("Big");
    }
  }
}`,
    },
  ];

  const exercises: Exercise[] = [
    {
      title: "Variable exercise",
      description: "Create int x = 10 and print it",
      code: `public class Main {
  public static void main(String[] args) {
    int x = 10;
    System.out.println(x);
  }
}`,
    },
    {
      title: "Loop challenge",
      description: "Print numbers 0 to 4",
      code: `public class Main {
  public static void main(String[] args) {

    for (int i = 0; i < 5; i++) {
      System.out.println(i);
    }

  }
}`,
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