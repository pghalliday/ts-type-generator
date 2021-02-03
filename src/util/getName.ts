import isUndefined from "lodash/isUndefined";

let increment = 0;

export function getName(type: string, name?: string): string {
    if (isUndefined(name)) {
        increment++;
        return `TTG_Anonymous_${type}_${increment}`;
    }
    return name;
}
