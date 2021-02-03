export type MyNumberLiteralType = 100;

export function isMyNumberLiteralType(value: unknown): value is MyNumberLiteralType {
    if (!(typeof value === "number")) return false;
    return (value === 100);
}
