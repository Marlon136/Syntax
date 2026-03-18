export default function Features() {

  const items = [
    ["Error Review", "Review mistakes faster"],
    ["Extra Exercises", "More practice"],
    ["Unlimited Hearts", "No limits"],
    ["No Ads", "Focus learning"],
  ];

  return (
    <section className="px-16 py-16 bg-neutral-50 text-center">

      <h2 className="text-3xl font-bold text-[#264653] mb-2">
        Everything you need to succeed
      </h2>

      <p className="text-[#264653]/70 mb-10">
        Features designed to accelerate your learning
      </p>

      <div className="grid grid-cols-4 gap-6">

        {items.map((f, i) => (
          <div
            key={i}
            className="bg-[#fff8f3] rounded-xl p-6 border border-neutral-200 shadow-sm"
          >
            <p className="font-bold text-[#264653] mb-2">
              {f[0]}
            </p>

            <p className="text-sm text-[#264653]/70">
              {f[1]}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}