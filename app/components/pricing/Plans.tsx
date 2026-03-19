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
    <section id="plans" className="px-16 py-20 bg-neutral-50 text-center">

      <h2 className="text-2xl font-bold text-[#264653] mb-10">
        Choose Your Plan
      </h2>

      <div className="flex justify-center gap-10">

        {/* FREE */}

        <div className="w-80 bg-[#fff8f3] p-6 rounded-xl border-2 border-[#E76F51] shadow-lg">

          <p className="font-bold text-[#264653]">Free</p><br></br>

          <p className="text-3xl font-bold text-[#264653]">
            $0
          </p>

          <button className="mt-4 w-full border border-[#E76F51]/30 py-2 rounded text-[#264653]">
            Current Plan
          </button>

        </div>


        {/* PRO  JAVA*/}

        <div className="w-80 bg-[#2a4d60] p-6 rounded-xl shadow-lg">

          <p className="font-bold text-[#ffffff]">
            Java Bootcamp Pro
          </p><br></br>

          <p className="text-3xl text-[#ffffff]">
            $59.99
          </p>

          <button
            onClick={checkout}
            className="mt-4 w-full bg-[#f0a262] hover:bg-[#47a599] text-white py-2 rounded"
          >
            Get Plan
          </button>

        </div>

        {/* PRO  PYTHON*/}

        <div className="w-80 bg-[#2a4d60] p-6 rounded-xl shadow-lg">

          <p className="font-bold text-[#ffffff]">
            Python Mastery Pro
          </p><br></br>

          <p className="text-3xl text-[#ffffff]">
            $49.99
          </p>

          <button
            onClick={checkout}
            className="mt-4 w-full bg-[#f0a262] hover:bg-[#47a599] text-white py-2 rounded"
          >
            Get Plan
          </button>

        </div>

        {/* PRO  JAVA SCRIPT*/}

        <div className="w-80 bg-[#2a4d60] p-6 rounded-xl shadow-lg">

          <p className="font-bold text-[#ffffff]">
            JavaScript Pro
          </p><br></br>

          <p className="text-3xl text-[#ffffff]">
            $39.99
          </p>

          <button
            onClick={checkout}
            className="mt-4 w-full bg-[#f0a262] hover:bg-[#47a599] text-white py-2 rounded"
          >
            Get Plan
          </button>

        </div>

      </div>

    </section>
  );
}