import { hasOwnProperty } from "./hasOwnProperty";
import { Type1, isType1 } from "./Type1";
import { Type2, isType2 } from "./Type2";

export interface InterfaceType {
    property1: Type1;
    property2: Type2;
}

export function isInterfaceType(value: unknown): value is InterfaceType {
    if (typeof value !== "object") return false;
    if (value === null) return false;
    if (!hasOwnProperty(value, "property1")) return false;
    if (!isType1(value["property1"])) return false;
    if (!hasOwnProperty(value, "property2")) return false;
    if (!isType2(value["property2"])) return false;
    return true;
}
