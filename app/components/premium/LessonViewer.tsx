"use client";

import { Lesson } from "./PremiumContent";
import CodeEditor from "./CodeEditor";

export default function LessonViewer({
  lesson,
  code,
  setCode,
}: {
  lesson: Lesson;
  code: string;
  setCode: (v: string) => void;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border">

      <h2 className="text-xl font-bold text-[#264653] mb-2">
        {lesson.title}
      </h2>

      <p className="text-[#264653]/80 mb-4">
        {lesson.text}
      </p>

      <CodeEditor code={code} setCode={setCode} />

    </div>
  );
}