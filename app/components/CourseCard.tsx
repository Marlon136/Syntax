"use client";

import Image from "next/image";
import { useState } from "react";
import CourseModal from "./CourseModal";

export default function CourseCard({
  title,
  price,
  lessons,
  img,
  content,
}: {
  title: string;
  price: string;
  lessons: string;
  img: string;
  content: string[];
}) {

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-neutral-50 rounded-xl shadow-md p-4 border border-neutral-200">

      <Image
        src={img}
        alt="course"
        width={150}
        height={120}
        className="rounded mx-auto h-32 object-cover"
      />

      <h3 className="font-bold mt-3 text-[#264653]">
        {title}
      </h3>

      <p className="width: 100% margin-0">
      <span className="float-left text-[#264653] mt-2">{lessons}</span>
      <span className="float-right text-[#E76F51] mt-2">{price}</span>
      </p>

      <button
        onClick={() => setOpen(true)}
        className="mt-3 w-full bg-[#2a4d60] hover:bg-[#47a599] text-white px-6 py-3 rounded-lg transition"
      >
        View Course
      </button>

      <CourseModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        content={content}
      />

    </div>
  );
}