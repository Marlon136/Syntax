import { getAuthToken, authHeaders } from "./auth";

const COURSE_COMPLETION_STORAGE_KEY = "syntax-completed-courses";

export function getCompletedCourseSlugsSync(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(COURSE_COMPLETION_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.warn("Failed to read completed courses from storage:", error);
    return [];
  }
}

export async function getCompletedCourseSlugs(): Promise<string[]> {
  if (typeof window === "undefined") return [];
  const token = getAuthToken();
  if (!token) return getCompletedCourseSlugsSync();

  try {
    const api = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
    const res = await fetch(`${api}/users/me/completed-courses`, { headers: { ...authHeaders() } });
    if (!res.ok) return getCompletedCourseSlugsSync();
    const data = await res.json();
    if (Array.isArray(data)) {
      // persist locally for offline
      saveCompletedCourseSlugs(data);
      return data;
    }
    return getCompletedCourseSlugsSync();
  } catch (err) {
    console.warn('Failed to fetch completed courses from server, falling back to local', err);
    return getCompletedCourseSlugsSync();
  }
}

export function saveCompletedCourseSlugs(slugs: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(COURSE_COMPLETION_STORAGE_KEY, JSON.stringify(slugs));
  } catch (error) {
    console.warn("Failed to save completed courses to storage:", error);
  }
}

export function markCourseCompleted(slug: string) {
  const completed = new Set(getCompletedCourseSlugsSync());
  completed.add(slug);
  saveCompletedCourseSlugs(Array.from(completed));
  return Array.from(completed);
}
