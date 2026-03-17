export default function Subscribe() {
  return (
    <section className="px-16 py-16 bg-neutral-50">

      <div className="bg-neutral-50 rounded-xl shadow-md p-6 border border-[#264653]/20 text-center">

        <h3 className="text-3xl font-bold mb-3 text-[#264653]">
          Ready to level up your career?
        </h3>

        <p className="mb-6 text-[#264653]/80">
          Subscribe for free coding tips
        </p>

        <div className="flex justify-center gap-3">

          <input
            placeholder="Email"
            className="px-4 py-3 rounded-lg border border-[#264653]/30 text-[#264653] w-64"
          />

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition">
            Subscribe
          </button>

        </div>

      </div>

    </section>
  );
}