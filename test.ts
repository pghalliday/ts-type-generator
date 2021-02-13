// eslint-disable-next-line @typescript-eslint/ban-types
function hasOwnProperty<X extends {}, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
    // eslint-disable-next-line no-prototype-builtins
    return obj.hasOwnProperty(prop);
}

class TranslationError extends Error {
    public readonly cause?: TranslationError;
    constructor(message: string, cause?: TranslationError) {
        super(message);
        this.cause = cause;
    }
}

function isList(value: unknown): value is Array<unknown> {
    return Array.isArray(value);
}

function isDictionary(value: unknown): value is {[key: string]: unknown} {
    if (typeof value !== 'object') return false;
    return value !== null;
}

function isBoolean(value: unknown): value is boolean {
    return (typeof value === 'boolean');
}
function translateBoolean(data: unknown): boolean | TranslationError {
    if (!isBoolean(data)) {
        return new TranslationError('Not a boolean');
    }
    return data;
}
function translateBooleanList(data: unknown): boolean[] | TranslationError {
    if (!isList(data)) {
        return new TranslationError('Not a list');
    }
    const list: boolean[] = [];
    for (const index in data) {
        const translated = translateBoolean(data[index]);
        if (translated instanceof TranslationError) {
            return new TranslationError(`Error encountered translating index: [${index}]`, translated);
        }
        list.push(translated);
    }
    return list;
}
function translateBooleanDictionary(data: unknown): {[key: string]: boolean} | TranslationError {
    if (!isDictionary(data)) {
        return new TranslationError('Not a dictionary');
    }
    const dictionary: {[key: string]: boolean} = {};
    for (const key in data) {
        const translated = translateBoolean(data[key]);
        if (translated instanceof TranslationError) {
            return new TranslationError(`Error encountered translating key: [${key}]`, translated);
        }
        dictionary[key] = translated;
    }
    return dictionary;
}

function isNumber(value: unknown): value is number {
    return (typeof value === 'number');
}
function translateNumber(data: unknown): number | TranslationError {
    if (!isNumber(data)) {
        return new TranslationError('Not a number');
    }
    return data;
}
function translateNumberList(data: unknown): number[] | TranslationError {
    if (!isList(data)) {
        return new TranslationError('Not a list');
    }
    const list: number[] = [];
    for (const index in data) {
        const translated = translateNumber(data[index]);
        if (translated instanceof TranslationError) {
            return new TranslationError(`Error encountered translating index: [${index}]`, translated);
        }
        list.push(translated);
    }
    return list;
}
function translateNumberDictionary(data: unknown): {[key: string]: number} | TranslationError {
    if (!isDictionary(data)) {
        return new TranslationError('Not a dictionary');
    }
    const dictionary: {[key: string]: number} = {};
    for (const key in data) {
        const translated = translateNumber(data[key]);
        if (translated instanceof TranslationError) {
            return new TranslationError(`Error encountered translating key: [${key}]`, translated);
        }
        dictionary[key] = translated;
    }
    return dictionary;
}

function isString(value: unknown): value is string {
    return (typeof value === 'string');
}
function translateString(data: unknown): string | TranslationError {
    if (!isString(data)) {
        return new TranslationError('Not a string');
    }
    return data;
}
function translateStringList(data: unknown): string[] | TranslationError {
    if (!isList(data)) {
        return new TranslationError('Not a list');
    }
    const list: string[] = [];
    for (const index in data) {
        const translated = translateString(data[index]);
        if (translated instanceof TranslationError) {
            return new TranslationError(`Error encountered translating index: [${index}]`, translated);
        }
        list.push(translated);
    }
    return list;
}
function translateStringDictionary(data: unknown): {[key: string]: string} | TranslationError {
    if (!isDictionary(data)) {
        return new TranslationError('Not a dictionary');
    }
    const dictionary: {[key: string]: string} = {};
    for (const key in data) {
        const translated = translateString(data[key]);
        if (translated instanceof TranslationError) {
            return new TranslationError(`Error encountered translating key: [${key}]`, translated);
        }
        dictionary[key] = translated;
    }
    return dictionary;
}

type BooleanLiteral = true;
function translateBooleanLiteral(data: unknown): BooleanLiteral | TranslationError {
    if (data === true) return data;
    return new TranslationError('Not [true]');
}

type StringLiteral = "hello";
function translateStringLiteral(data: unknown): StringLiteral | TranslationError {
    if (data === "hello") return data;
    return new TranslationError('Not ["hello"]');
}

type NumberLiteral = 100;
function translateNumberLiteral(data: unknown): NumberLiteral | TranslationError {
    if (data === 100) return data;
    return new TranslationError('Not [100]');
}

type UnionData = string | number
function translateUnionData(data: unknown): UnionData | TranslationError {
    let translated: UnionData | TranslationError;
    translated = translateString(data);
    if (!(translated instanceof TranslationError)) return translated;
    translated = translateNumber(data);
    if (!(translated instanceof TranslationError)) return translated;
    return new TranslationError('Type not in [string | number]');
}

type StructData1 = {
    apple: string;
};
class StructClass1 {
    apple: string;
    constructor(data: unknown) {
        if (typeof data !== "object") throw new TranslationError("Not an object");
        if (data === null) throw new TranslationError("Is null");
        if (!hasOwnProperty(data, "apple")) throw new TranslationError("Property missing: [\"apple\"]");
        const apple = translateString(data["apple"]);
        if (apple instanceof TranslationError) throw new TranslationError("Error encountered translating property: [\"apple\"]", apple);
        this.apple = apple;
    }
}
function translateStructData1(data: unknown): StructClass1 | TranslationError {
    try {
        return new StructClass1(data);
    } catch (e) {
        if (e instanceof TranslationError) {
            return e;
        }
        throw e;
    }
}

type StructData2 = {
    banana: string;
    apple: StructData1;
}
class StructClass2 {
    banana: string;
    apple: StructClass1;
    constructor(data: unknown) {
        if (typeof data !== "object") throw new TranslationError("Not an object");
        if (data === null) throw new TranslationError("Is null");
        if (!hasOwnProperty(data, "banana")) throw new TranslationError("Property missing: [\"banana\"]");
        const banana = translateString(data["banana"]);
        if (banana instanceof TranslationError) throw new TranslationError("Error encountered translating property: [\"banana\"]", banana);
        this.banana = banana;
        if (!hasOwnProperty(data, "apple")) throw new TranslationError("Property missing: [\"apple\"]");
        const apple = translateStructData1(data["apple"]);
        if (apple instanceof TranslationError) throw new TranslationError("Error encountered translating property: [\"apple\"]", apple);
        this.apple = apple;
    }
}
function translateStructData2(data: unknown): StructClass2 | TranslationError {
    try {
        return new StructClass2(data);
    } catch (e) {
        if (e instanceof TranslationError) {
            return e;
        }
        throw e;
    }
}

type Struct = {
    apple: string,
    banana: string,
}

const struct: Struct = {}

const booleanList = translateBooleanList([
    true,
    100,
    true,
])
console.log(booleanList);

const booleanDictionary = translateBooleanDictionary({
    apple: true,
    banana: 0,
    pear: true,
})
console.log(booleanDictionary);

const numberList = translateNumberList([
    100,
    -30,
    1234.5,
])
console.log(numberList);

const numberDictionary = translateNumberDictionary({
    apple: 100,
    banana: -30,
    pear: 1234.5,
})
console.log(numberDictionary);

const stringList = translateStringList([
    'banana',
    'apple',
    'pear',
])
console.log(stringList);

const stringDictionary = translateStringDictionary({
    apple: 'banana',
    banana: 'apple',
    pear: 'pear',
})
console.log(stringDictionary);

const structClass2 = translateStructData2({
    banana: 'hello',
    apple: {
        apple: 'hello',
    },
})
console.log(structClass2);
