"use client";

export default function NavCourses({ courses, selectedSlug, setView }: { courses: { slug: string; title: string }[]; selectedSlug: string; setView: (slug: string) => void; }) {
  return (
    <nav className="w-full flex flex-wrap justify-between items-center px-6 py-5 bg-[#fff8f3] border-b border-[#264653]/20">
      <div className="flex flex-wrap gap-3">
        {courses.map((course) => (
          <button
            key={course.slug}
            onClick={() => setView(course.slug)}
            className={`px-5 py-3 rounded transition ${selectedSlug === course.slug ? "bg-[#f0a262] text-white" : "bg-white text-[#264653] border border-[#264653]/20 hover:bg-[#f0a262] hover:text-white"}`}
          >
            {course.title}
          </button>
        ))}
      </div>
    </nav>
  );
}


