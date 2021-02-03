export type BooleanLiteralType = false;

export function isBooleanLiteralType(value: unknown): value is BooleanLiteralType {
    if (!(typeof value === "boolean")) return false;
    return (value === false);
}
