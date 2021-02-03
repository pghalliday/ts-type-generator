import { Type, isType } from "./Type";

export type MyArrayType = Type[];

export function isMyArrayType(value: unknown): value is MyArrayType {
    if (!Array.isArray(value)) return false;
    for (const item of value) {
        if (!isType(item)) return false;
    }
    return true;
}
