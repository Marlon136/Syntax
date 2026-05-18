import { getAuthToken, authHeaders } from "./auth";

const COURSE_COMPLETION_STORAGE_KEY = "syntax-completed-courses";
const LESSON_COMPLETION_STORAGE_KEY = "syntax-completed-lessons";

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

export function getCompletedLessonsSync(): Record<string, number[]> {
  if (typeof window === "undefined") return {};
  try {
    const saved = window.localStorage.getItem(LESSON_COMPLETION_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.warn("Failed to read completed lessons from storage:", error);
    return {};
  }
}

export function getCompletedLessonsForCourseSync(slug: string): number[] {
  const map = getCompletedLessonsSync();
  return Array.isArray(map[slug]) ? map[slug] : [];
}

export function saveCompletedLessonsMap(map: Record<string, number[]>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LESSON_COMPLETION_STORAGE_KEY, JSON.stringify(map));
  } catch (error) {
    console.warn("Failed to save completed lessons to storage:", error);
  }
}

export async function markLessonCompleted(courseId: number, slug: string, lessonId: number, totalLessons: number, points = 1000) {
  // Update local storage
  const map = getCompletedLessonsSync();
  const list = new Set<number>(Array.isArray(map[slug]) ? map[slug] : []);
  list.add(lessonId);
  map[slug] = Array.from(list);
  saveCompletedLessonsMap(map);

  // If all lessons completed, mark course completed and persist to server if authenticated
  if (map[slug].length >= totalLessons) {
    // mark locally
    markCourseCompleted(slug);

    const token = getAuthToken();
    if (!token) return { completed: true, synced: false };

    try {
      const api = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
      await fetch(`${api}/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ courseId, points }),
      });

      // refresh server completed courses list and persist locally
      const res = await fetch(`${api}/users/me/completed-courses`, { headers: { ...authHeaders() } });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) saveCompletedCourseSlugs(data);
      }

      return { completed: true, synced: true };
    } catch (err) {
      console.warn('Failed to sync course completion to server', err);
      return { completed: true, synced: false };
    }
  }

  return { completed: false, synced: false };
}
