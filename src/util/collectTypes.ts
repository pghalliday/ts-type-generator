import {Type} from "../internal";

function _collectTypes(types: Type[], all: Type[]): void {
    for (const type of types) {
        if (!all.includes(type)) {
            all.push(type)
            _collectTypes(type.getDependencies(), all)
        }
    }
}

export function collectTypes(types: Type[]): Type[] {
    const all: Type[] = []
    _collectTypes(types, all)
    return all
}
