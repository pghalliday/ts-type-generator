import { Type1, isType1 } from "./Type1";
import { Type2, isType2 } from "./Type2";

export type UnionType = Type1 | Type2;

export function isUnionType(value: unknown): value is UnionType {
    if (isType1(value)) return true;
    if (isType2(value)) return true;
    return false;
}
