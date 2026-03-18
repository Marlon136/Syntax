"use client";

import { Exercise } from "./PremiumContent";

export default function ExerciseList({
  exercises,
  setExercise,
}: {
  exercises: Exercise[];
  setExercise: (e: Exercise) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6">

      <h2 className="font-bold text-[#264653] mb-4">
        Extra Exercises
      </h2>

      <ul className="space-y-3">

        {exercises.map((e, i) => (
          <li
            key={i}
            onClick={() => setExercise(e)}
            className="p-3 rounded-lg border border-neutral-200 hover:border-[#E76F51] hover:bg-[#E76F51]/5 cursor-pointer text-black"
          >
            {e.title}
          </li>
        ))}

      </ul>

    </div>
  );
}