const COURSE_COMPLETION_STORAGE_KEY = "syntax-completed-courses";

export function getCompletedCourseSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(COURSE_COMPLETION_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.warn("Failed to read completed courses from storage:", error);
    return [];
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
  const completed = new Set(getCompletedCourseSlugs());
  completed.add(slug);
  saveCompletedCourseSlugs(Array.from(completed));
  return Array.from(completed);
}
