export type NumberLiteralType = 100;

export function isNumberLiteralType(value: unknown): value is NumberLiteralType {
    if (!(typeof value === "number")) return false;
    return (value === 100);
}
