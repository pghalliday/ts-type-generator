import { Type, isType } from "./Type";

export type ArrayType = Type[];

export function isArrayType(value: unknown): value is ArrayType {
    if (!Array.isArray(value)) return false;
    for (const item of value) {
        if (!isType(item)) return false;
    }
    return true;
}
