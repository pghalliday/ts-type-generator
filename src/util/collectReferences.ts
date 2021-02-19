import {Reference, Type} from "../internal";

export function collectReferences(types: Type[]): Reference[] {
    const all: Reference[] = []
    for (const type of types) {
        for (const reference of type.getReferences()) {
            if (!all.includes(reference)) {
                all.push(reference)
            }
        }
    }
    return all
}
