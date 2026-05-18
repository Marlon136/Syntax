import { authHeaders } from "@/lib/auth";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function apiFetch<T>(path: string, options: RequestInit = {}) {
  const url = `${API_URL}${path}`;
  console.debug("[apiFetch] URL:", url);

  try {
    const headers = new Headers(options.headers as HeadersInit);
    headers.set("Content-Type", "application/json");

    const auth = authHeaders();
    if (auth.Authorization) {
      headers.set("Authorization", auth.Authorization);
    }

    const response = await fetch(url, {
      credentials: "include",
      ...options,
      headers,
    });

    const text = await response.text();
    let data: any = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.warn("[apiFetch] Failed to parse JSON response:", parseErr, text);
        data = text;
      }
    }

    if (!response.ok) {
      throw new Error(data?.message || data?.error || response.statusText);
    }

    return data as T;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`[Network] Request to ${url} failed: ${msg}`);
  }
}

export function postJson<T>(path: string, body: unknown) {
  return apiFetch<T>(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
