"use client";

export default function Plans() {

  const checkout = async () => {

    const res = await fetch("/api/checkout", {
      method: "POST",
    });

    const data = await res.json();

    window.location.href = data.url;
  };

  return (
    <section className="px-16 py-20 bg-neutral-50 text-center">

      <h2 className="text-2xl font-bold text-[#264653] mb-10">
        Choose Your Plan
      </h2>

      <div className="flex justify-center gap-10">

        {/* FREE */}

        <div className="w-80 bg-white p-6 rounded-xl border border-neutral-200">

          <p className="font-bold text-[#264653]">Free</p>

          <p className="text-3xl font-bold text-[#264653]">
            $0
          </p>

          <button className="mt-4 w-full border border-[#264653]/30 py-2 rounded">
            Current Plan
          </button>

        </div>


        {/* PRO */}

        <div className="w-80 bg-white p-6 rounded-xl border-2 border-[#E76F51] shadow-lg">

          <p className="font-bold text-[#264653]">
            Pro
          </p>

          <p className="text-3xl font-bold text-[#264653]">
            $9
          </p>

          <button
            onClick={checkout}
            className="mt-4 w-full bg-[#E76F51] hover:bg-[#d45d42] text-white py-2 rounded"
          >
            Go Pro
          </button>

        </div>

      </div>

    </section>
  );
}