"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useLanguage } from "@/app/providers/LanguageProvider";

async function compressFileToDataUrl(file: File, maxWidth = 800, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ratio = img.width / img.height;
        const width = Math.min(maxWidth, img.width);
        const height = Math.round(width / ratio);
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas not supported'));
        ctx.drawImage(img, 0, 0, width, height);
        try {
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        } catch (e) {
          reject(e);
        }
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export default function ProfileModal({ open, onClose }: { open: boolean; onClose: () => void; }) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    apiFetch<any>("/users/me")
      .then((u) => {
        setUser(u);
        setName(u?.name || "");
        setAvatarPreview(u?.avatarUrl || null);
      })
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false));
  }, [open]);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setAvatarFile(file);
    if (!file) return setAvatarPreview(null);
    // compress image before setting preview to avoid huge payloads
    compressFileToDataUrl(file, 600, 0.7)
      .then((dataUrl) => setAvatarPreview(dataUrl))
      .catch(() => {
        // fallback to direct preview if compression fails
        const reader = new FileReader();
        reader.onload = () => setAvatarPreview(String(reader.result));
        reader.readAsDataURL(file);
      });
  }

  async function save() {
    setError(null);
    setLoading(true);
    try {
      const payload: any = { name: name || undefined };
      if (avatarFile && avatarPreview) {
        // send data URL to backend as avatarUrl (simple approach)
        payload.avatarUrl = avatarPreview;
      }
      const updated = await apiFetch<any>("/users/me", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      setUser(updated);
      setAvatarPreview(updated.avatarUrl || avatarPreview);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-xl">
        <h3 className="text-xl font-bold mb-4">{t('profile.title') || 'Profile'}</h3>

        {loading && <p>Loading...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {avatarPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-xl text-gray-500">{(user?.name || user?.email || 'U')[0]}</div>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold">{t('profile.name') || 'Name'}</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} className="block mt-1 p-2 border rounded-lg w-56" />
                <input type="file" accept="image/*" onChange={onFile} className="mt-2" />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="px-4 py-2 rounded-lg border">{t('common.cancel') || 'Cancel'}</button>
              <button onClick={save} className="px-4 py-2 rounded-lg bg-[#2A9D8F] text-white">{loading ? (t('profile.saving') || 'Saving...') : (t('profile.save') || 'Save')}</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
