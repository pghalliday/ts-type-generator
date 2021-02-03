export type StringType = string;

export function isStringType(value: unknown): value is StringType {
    return typeof value === "string";
}