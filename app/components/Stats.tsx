export default function Stats() {

  const stats = [
    ["Active Students", "50,000+"],
    ["Courses Available", "120+"],
    ["Success Rate", "98%"],
    ["Average Rating", "4.9/5"],
  ];

  return (
    <section className="bg-neutral-50 pb-14">

      <div className="grid grid-cols-4 gap-6 px-16">

        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-[#264653]/5 p-6 rounded-xl border border-[#264653]/20 text-center"
          >
            <p className="text-sm text-[#264653]/80">
              {s[0]}
            </p>

            <p className="text-3xl font-bold text-[#E76F51]">
              {s[1]}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}