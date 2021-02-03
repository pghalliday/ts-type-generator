export type MyStringLiteralType = "hello";

export function isMyStringLiteralType(value: unknown): value is MyStringLiteralType {
    if (!(typeof value === "string")) return false;
    return (value === "hello");
}
