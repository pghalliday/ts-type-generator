export class TTG_TranslationError extends Error {
    public readonly cause?: TTG_TranslationError;
    constructor(message: string, cause?: TTG_TranslationError) {
        super(message);
        this.cause = cause;
    }
}
function __TTG_hasOwnProperty<X extends {}, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
    return obj.hasOwnProperty(prop);
}
function __TTG_isList(value: unknown): value is Array<unknown> {
    return Array.isArray(value);
}
function __TTG_isObject(value: unknown): value is {[key: string]: unknown} {
    if (typeof value !== 'object') return false;
    return value !== null;
}
type __TTG_translate<T> = (data: unknown) => T | TTG_TranslationError;
function __TTG_translateList<T>(translate: __TTG_translate<T>) {
    return (data: unknown): T[] | TTG_TranslationError => {
        if (!__TTG_isList(data)) return new TTG_TranslationError('Not a list');
        const list: T[] = [];
        for (const index in data) {
            const translated = translate(data[index]);
            if (translated instanceof TTG_TranslationError) return new TTG_TranslationError(`Error encountered translating index: [${index}]`, translated);
            list.push(translated);
        }
        return list;
    }
}
function __TTG_translateDictionary<T>(translate: __TTG_translate<T>) {
    return (data: unknown): {[key: string]: T} | TTG_TranslationError => {
        if (!__TTG_isObject(data)) return new TTG_TranslationError('Not an object');
        const dictionary: {[key: string]: T} = {};
        for (const key in data) {
            const translated = translate(data[key]);
            if (translated instanceof TTG_TranslationError) return new TTG_TranslationError(`Error encountered translating key: [${key}]`, translated);
            dictionary[key] = translated;
        }
        return dictionary;
    }
}
function __TTG_translateProperty<T>(data: {}, property: string, translate: __TTG_translate<T>): T | TTG_TranslationError {
    if (!__TTG_hasOwnProperty(data, property)) return new TTG_TranslationError(`Property missing: ["${property}"]`);
    const translated = translate(data[property]);
    if (translated instanceof TTG_TranslationError) return new TTG_TranslationError(`Error encountered translating property: ["${property}"]`, translated);
    return translated;
}
