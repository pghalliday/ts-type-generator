export type BooleanType = boolean;

export function isBooleanType(value: unknown): value is BooleanType {
    return typeof value === "boolean";
}
