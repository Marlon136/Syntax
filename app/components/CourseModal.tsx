"use client";

export default function CourseModal({
  open,
  onClose,
  title,
  content,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string[];
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-neutral-50 rounded-xl p-6 w-[400px] border border-neutral-200">

        <h2 className="text-xl font-bold text-[#264653] mb-3">
          {title}
        </h2>

        <ul className="space-y-2 text-[#264653] mb-4">
          {content.map((c, i) => (
            <li key={i}>• {c}</li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="w-full bg-[#E76F51] hover:bg-[#d45d42] text-white py-2 rounded"
        >
          Close
        </button>

      </div>

    </div>
  );
}