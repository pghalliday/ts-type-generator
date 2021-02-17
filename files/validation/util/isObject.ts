export function isObject(value: unknown): value is {[key: string]: unknown} {
    if (typeof value !== 'object') return false;
    return value !== null;
}
