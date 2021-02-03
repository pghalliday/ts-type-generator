import { isMapOf } from "./isMapOf";
import { Type, isType } from "./Type";

export type MapType = Record<string, Type>;

export function isMapType(value: unknown): value is MapType {
    if (!(typeof value === "object")) return false;
    if (value === null) return false;
    return isMapOf(value, isType);
}
