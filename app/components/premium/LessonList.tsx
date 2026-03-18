"use client";

import { Lesson } from "./PremiumContent";

export default function LessonList({
  lessons,
  setLesson,
}: {
  lessons: Lesson[];
  setLesson: (l: Lesson) => void;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border">

      <h2 className="font-bold text-[#264653] mb-4">
        Python Lessons
      </h2>

      <ul className="space-y-2">

        {lessons.map((l, i) => (
          <li
            key={i}
            onClick={() => setLesson(l)}
            className="p-3 rounded-lg border border-neutral-200 hover:border-[#E76F51] hover:bg-[#E76F51]/5 cursor-pointer text-black"
          >
            {l.title}
          </li>
        ))}

      </ul>

    </div>
  );
}