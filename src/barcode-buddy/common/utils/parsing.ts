export function parseArrayField(field: any): string[] {
  if (Array.isArray(field)) return field;
  if (typeof field === "string") {
    try {
      const parsed = JSON.parse(field);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return field.split(",").map((v) => v.trim());
    }
  }
  return [];
}

export function parseObjectField(field: any): any {
  if (typeof field === "object" && field !== null) return field;
  if (typeof field === "string") {
    try {
      return JSON.parse(field);
    } catch {
      return {};
    }
  }
  return {};
}
