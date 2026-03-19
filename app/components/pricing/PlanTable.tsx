export default function PlanTable() {
  return (
    <section className="px-16 py-20 bg-[#fff8f3] rounded-xl border-2 w-1/2 mx-auto">

      <h2 className="text-center text-2xl font-bold text-[#264653] mb-10">
        Detailed Plan Comparison
      </h2>

      <table className="w-full max-w-4xl mx-auto text-sm">

        <thead>
          <tr className="text-[#264653] border-b">
            <th className="text-left py-3">Feature</th>
            <th className="text-left">Free</th>
            <th className="text-left text-[#E76F51]">Pro</th>
          </tr>
        </thead>

        <tbody className="text-[#264653]/80">

          <tr className="border-b">
            <td className="py-3">Daily Lessons</td>
            <td>8</td>
            <td className="text-[#E76F51]">Unlimited</td>
          </tr>

          <tr className="border-b">
            <td className="py-3">Offline Access</td>
            <td>—</td>
            <td className="text-[#E76F51]">✔</td>
          </tr>

          <tr className="border-b">
            <td className="py-3">Certificate</td>
            <td>—</td>
            <td className="text-[#E76F51]">✔</td>
          </tr>

        </tbody>

      </table>

    </section>
  );
}