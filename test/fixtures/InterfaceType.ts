import {hasOwnProperty} from "./hasOwnProperty";

export interface InterfaceType {
    string1: string;
    string2: string;
    number1: number;
    number2: number;
    boolean1: boolean;
    boolean2: boolean;
}

export function isInterfaceType(value: unknown): value is InterfaceType {
    if (typeof value !== "object") return false;
    if (value === null) return false;
    if (!hasOwnProperty(value, "string1")) return false;
    if (typeof value.string1 !== "string") return false;
    if (!hasOwnProperty(value, "string2")) return false;
    if (typeof value.string2 !== "string") return false;
    if (!hasOwnProperty(value, "number1")) return false;
    if (typeof value.number1 !== "number") return false;
    if (!hasOwnProperty(value, "number2")) return false;
    if (typeof value.number2 !== "number") return false;
    if (!hasOwnProperty(value, "boolean1")) return false;
    if (typeof value.boolean1 !== "boolean") return false;
    if (!hasOwnProperty(value, "boolean2")) return false;
    if (typeof value.boolean2 !== "boolean") return false;
    return true;
}
