"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CourseListCard({
  slug,
  title,
  lessons,
  img,
  completed,
}: {
  slug: string;
  title: string;
  lessons: string;
  img: string;
  completed?: boolean;
}) {
  const router = useRouter();

  return (
    <div className="rounded-3xl border border-[#d1d5db] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-44 flex items-center justify-center overflow-hidden rounded-2xl bg-[#f4f4f4]">
        <Image src={img} alt={title} width={150} height={120} style={{ borderRadius: 8, objectFit: "cover", display: 'block' }} />
      </div>
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-[#264653]">{title}</h3>
          <span className={completed ? "rounded-full bg-[#2a9d8f] px-3 py-1 text-xs text-white" : "rounded-full bg-[#ffbe19] px-3 py-1 text-xs font-semibold text-[#264653]"}>
            {completed ? "Completado" : "Nuevo"}
          </span>
        </div>
        <p className="text-sm text-[#475569]">{lessons}</p>
        <button
          type="button"
          onClick={() => router.push(`/coursesDisplay/${slug}`)}
          className="mt-4 inline-flex w-full justify-center rounded-2xl bg-[#2a4d60] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#47a599]"
        >
          Ver curso
        </button>
      </div>
    </div>
  );
}
