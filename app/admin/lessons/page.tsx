"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, postJson } from "@/lib/api";
import { getAuthEmail, getEmailFromToken } from "@/lib/auth";

type Course = { id: number; slug: string; title: string };

export default function AdminLessonsPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [order, setOrder] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const email = getAuthEmail() ?? getEmailFromToken();
    if (!email || email.toLowerCase().trim() !== 'marlon@gmail.com') {
      // protect UI; backend still enforces
      router.push('/');
      return;
    }

    apiFetch<Course[]>('/courses')
      .then((list) => {
        setCourses(list.map((c: any) => ({ id: c.id, slug: c.slug, title: c.title })));
        if (list[0]) setSelected(list[0].slug);
      })
      .catch(() => setCourses([]));
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!selected) return setError('Selecciona un curso');
    if (!title.trim() || !content.trim()) return setError('Completa título y enunciado');

    try {
      await postJson(`/courses/${selected}/lessons`, { title, content, order: order || undefined });
      setMessage('Lección creada.');
      setTitle('');
      setContent('');
      setOrder(undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la lección');
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Crear lección (Admin)</h1>
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Curso</label>
            <select value={selected} onChange={(e) => setSelected(e.target.value)} className="mt-2 w-full rounded border px-3 py-2">
              {courses.map((c) => (
                <option key={c.id} value={c.slug}>{c.title} ({c.slug})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Título</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded border px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Enunciado</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} className="mt-2 w-full rounded border px-3 py-2 min-h-[120px]" />
          </div>

          <div>
            <label className="block text-sm font-medium">Orden (opcional)</label>
            <input type="number" value={order ?? ''} onChange={(e) => setOrder(e.target.value ? Number(e.target.value) : undefined)} className="mt-2 w-full rounded border px-3 py-2" />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-600">{message}</p>}

          <div>
            <button className="bg-[#2a9d8f] text-white px-4 py-2 rounded">Crear lección</button>
          </div>
        </form>
      </div>
    </div>
  );
}
