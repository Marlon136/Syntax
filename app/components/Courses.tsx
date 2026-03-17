import CourseCard from "./CourseCard";

export default function Courses() {
  return (
    <section className="bg-neutral-50 py-14">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-2xl font-bold mb-8 text-[#264653]">
          Popular Courses
        </h2>

        <div className="grid grid-cols-3 gap-6">

          <CourseCard
            title="Java Bootcamp"
            price="$59.99"
            img="/Java.jpg"
          />

          <CourseCard
            title="Python Mastery"
            price="$49.99"
            img="/Py.jpg"
          />

          <CourseCard
            title="JavaScript"
            price="$39.99"
            img="/jsh.jpg"
          />

        </div>

      </div>

    </section>
  );
}