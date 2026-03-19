import CourseCard from "./CourseCard";

export default function Courses() {
  return (
    <section 
      id="courses"
      className="bg-[#2a4d60] py-14">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-8 text-[#ffffff]">
          Our Popular Courses
        </h2>

        <div className="grid grid-cols-3 gap-6">

          <CourseCard
            title="Java Bootcamp"
            lessons="60+ Lessons"
            price="Pro: $59.99"
            img="/Java.jpg"
            content={[
              "OOP",
              "Spring Boot",
              "Collections",
              "Threads",
            ]}
          />

          <CourseCard
            title="Python Mastery"
            lessons="120+ Lessons"
            price="Pro: $49.99"
            img="/Py.jpg"
            content={[
              "Variables",
              "Loops",
              "Functions",
              "Django",
            ]}
          />

          <CourseCard
            title="JavaScript"
            lessons="40+ Lessons"
            price="Pro: $39.99"
            img="/jsh.jpg"
            content={[
              "DOM",
              "React",
              "Node",
              "Async",
            ]}
          />

        </div>

      </div>

    </section>
  );
}