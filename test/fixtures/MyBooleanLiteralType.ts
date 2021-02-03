export type MyBooleanLiteralType = false;

export function isMyBooleanLiteralType(value: unknown): value is MyBooleanLiteralType {
    if (!(typeof value === "boolean")) return false;
    return (value === false);
}
