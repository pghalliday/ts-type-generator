import { isMapOf } from "./isMapOf";
import { Type, isType } from "./Type";

export type MyMapType = Record<string, Type>;

export function isMyMapType(value: unknown): value is MyMapType {
    if (!(typeof value === "object")) return false;
    if (value === null) return false;
    return isMapOf(value, isType);
}
