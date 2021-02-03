export type NumberType = number;

export function isNumberType(value: unknown): value is NumberType {
    return typeof value === "number";
}
