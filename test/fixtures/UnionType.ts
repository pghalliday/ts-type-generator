export type UnionType = "hello" | "new\nline" | 1 | -5.3 | true | false;

export function isUnionType(value: unknown): value is UnionType {
    if (typeof value === "string") {
        if (value === "hello") return true;
        if (value === "new\nline") return true;
    }
    if (typeof value === "number") {
        if (value === 1) return true;
        if (value === -5.3) return true;
    }
    if (typeof value === "boolean") {
        if (value === true) return true;
        if (value === false) return true;
    }
    return false;
}
