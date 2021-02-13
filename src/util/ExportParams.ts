import isUndefined from "lodash/isUndefined";

let increment = 0;

export interface ExportParams {
    typeName: string
    translateName: string
    exported: boolean
}

export function getExportParams(type: string, name?: string): ExportParams {
    if (isUndefined(name)) {
        increment++;
        return {
            typeName: `__TTG_Anonymous_${type}_${increment}`,
            translateName: `__TTG_Anonymous_translate_${type}_${increment}`,
            exported: false
        }
    }
    return {
        typeName: name,
        translateName: `translate${name}`,
        exported: true
    };
}
