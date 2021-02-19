export function isArray<T>(value: unknown): value is unknown[] {
    return Array.isArray(value);
}
