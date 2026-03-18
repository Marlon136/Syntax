"use client";

import { useState } from "react";

export default function Subscribe() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function validateEmail(mail: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  }

  function handleSubscribe() {

    if (!email) {
      setMessage("Please enter an email");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Invalid email");
      return;
    }

    // fake success
    setMessage("Email saved successfully ✅");
    setEmail("");
  }

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="px-4 py-3 rounded-lg border border-[#264653]/30 text-[#264653] w-64"
          />

          <button
            onClick={handleSubscribe}
            className="bg-[#E76F51] hover:bg-[#d45d42] text-white px-6 py-3 rounded-lg transition"
          >
            Subscribe
          </button>

        </div>

        {message && (
          <p className="mt-4 text-[#264653] font-semibold">
            {message}
          </p>
        )}

      </div>

    </section>
  );
}