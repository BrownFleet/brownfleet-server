export function assignRelationId<T extends object>(
  data: any,
  key: string,
  entityClass: new () => T,
) {
  if (data[key] && typeof data[key] === "string") {
    data[key] = { id: data[key] } as T;
  }
}
