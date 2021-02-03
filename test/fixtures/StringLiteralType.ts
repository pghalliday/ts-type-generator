export type StringLiteralType = "hello";

export function isStringLiteralType(value: unknown): value is StringLiteralType {
    if (!(typeof value === "string")) return false;
    return (value === "hello");
}
