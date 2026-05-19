"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";
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
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    apiFetch<any>("/users/me")
      .then((u) => {
        setUser(u);
        // Backend might not have separate lastName/country fields (DB schema may lack them).
        // If lastName is missing, try to split it from `name`.
        const fullName: string = u?.name || "";
        if (u && typeof u.lastName === 'string') {
          setName(u?.name || "");
          setLastName(u?.lastName || "");
        } else {
          if (fullName.trim() === "") {
            setName("");
            setLastName("");
          } else {
            const parts = fullName.trim().split(/\s+/);
            if (parts.length === 1) {
              setName(parts[0]);
              setLastName("");
            } else {
              setLastName(parts.pop() || "");
              setName(parts.join(' '));
            }
          }
        }
        setCountry(u && typeof u.country === 'string' ? u.country : "");
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
      // Build payload depending on backend support. If backend returns lastName/country
      // we will send them individually. Otherwise send `name` as full name.
      const payload: any = {};
      if (user && (typeof user.lastName === 'string' || typeof user.country === 'string')) {
        payload.name = name || undefined;
        payload.lastName = lastName || undefined;
        payload.country = country || undefined;
      } else {
        // backend likely only supports `name` field
        const full = [name, lastName].filter(Boolean).join(' ').trim();
        payload.name = full || undefined;
      }
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
      <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-2xl">
        <h3 className="text-2xl font-bold mb-4 text-[#47a599]">My Profile</h3>

        {loading && <p>Loading...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && (
          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {avatarPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-2xl text-gray-500">{(user?.name || user?.email || 'U')[0]}</div>
                )}
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">Name</label>
                  <input value={name} onChange={(e)=>setName(e.target.value)} className="block mt-1 p-2 border rounded-lg w-full" />
                </div>

                <div>
                  <label className="text-sm font-semibold">Lastname</label>
                  <input value={lastName} onChange={(e)=>setLastName(e.target.value)} className="block mt-1 p-2 border rounded-lg w-full" />
                </div>

                <div>
                  <label className="text-sm font-semibold">País</label>
                  <input value={country} onChange={(e)=>setCountry(e.target.value)} className="block mt-1 p-2 border rounded-lg w-full" />
                </div>

                <div>
                  <label className="text-sm font-semibold">Correo</label>
                  <input value={user?.email || ''} readOnly className="block mt-1 p-2 border rounded-lg w-full bg-gray-50" />
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-semibold">Avatar</label>
                  <div className="mt-2 flex items-center gap-3">
                    <input ref={fileInputRef} onChange={onFile} type="file" accept="image/*" className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="px-3 py-2 bg-[#47a599] text-white rounded-lg">Seleccionar avatar</button>
                    {avatarFile ? (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border">
                        <span className="text-sm">{avatarFile.name}</span>
                        <button type="button" onClick={() => { setAvatarFile(null); setAvatarPreview(user?.avatarUrl || null); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="ml-2 text-sm text-[#E76F51]">Eliminar</button>
                      </div>
                    ) : (
                      avatarPreview && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border">
                          <span className="text-sm">Archivo cargado</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="px-4 py-2 rounded-lg border">{t('common.cancel') || 'Cancel'}</button>
              <button onClick={save} className="px-4 py-2 rounded-lg bg-[#2a4d60] text-white transition hover:bg-[#47a599]">{loading ? (t('profile.saving') || 'Saving...') : (t('profile.save') || 'Save')}</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
