import isUndefined from "lodash/isUndefined";

let increment = 0;

export interface ExportParams {
    name: string
    exported: boolean
}

export function getExportParams(type: string, name?: string): ExportParams {
    if (isUndefined(name)) {
        increment++;
        return {
            name: `__TTG_Anonymous_${type}_${increment}`,
            exported: false
        }
    }
    return {
        name,
        exported: true
    };
}
