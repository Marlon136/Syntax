"use client";

export default function CurriculumModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-neutral-50 p-6 rounded-xl w-[420px] border border-neutral-200">

        <h2 className="text-xl font-bold text-[#264653] mb-3">
          Curriculum
        </h2>

        <ul className="space-y-2 text-[#264653] mb-4">
          <li>• Java Fundamentals</li>
          <li>• Python Basics</li>
          <li>• JavaScript DOM</li>
          <li>• React</li>
          <li>• Backend APIs</li>
          <li>• Databases</li>
        </ul>

        <button
          onClick={onClose}
          className="w-full bg-[#E76F51] text-white py-2 rounded"
        >
          Close
        </button>

      </div>

    </div>
  );
}