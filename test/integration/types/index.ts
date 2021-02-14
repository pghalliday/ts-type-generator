import {resolve} from "path";
import {
    TsTypeGenerator,
    BooleanLiteralType,
    NumberLiteralType,
    StringLiteralType,
    UnionType,
    ListType,
    DictionaryType,
    StructType,
    booleanType,
    numberType,
    stringType,
    booleanListType,
    numberListType,
    stringListType,
    booleanDictionaryType,
    numberDictionaryType,
    stringDictionaryType,
} from "../../../lib";
import {writeFileSync} from "fs";

try {
    const code = new TsTypeGenerator()
        .type(new BooleanLiteralType(true, 'True'))
        .type(new NumberLiteralType(100, 'OneHundred'))
        .type(new StringLiteralType("Hello", 'Hello'))
        .type(
            new UnionType('Union')
                .type(new StringLiteralType('apple'))
                .type(new StringLiteralType('banana'))
                .type(new StringLiteralType('pear'))
        )
        .type(new ListType(
            new UnionType()
                .type(new NumberLiteralType(100))
                .type(new NumberLiteralType(101))
                .type(new NumberLiteralType(102)),
            'List',
        ))
        .type(new DictionaryType(
            new UnionType()
                .type(new BooleanLiteralType(false))
                .type(new BooleanLiteralType(true)),
            'Dictionary',
        ))
        .type(
            new StructType('Struct')
                .property('boolean', booleanType)
                .property('number', numberType)
                .property('string', stringType)
                .property('booleanList', booleanListType)
                .property('numberList', numberListType)
                .property('stringList', stringListType)
                .property('booleanDictionary', booleanDictionaryType)
                .property('numberDictionary', numberDictionaryType)
                .property('stringDictionary',stringDictionaryType)
        )
        .generate()
    writeFileSync(resolve(__dirname, "../src/types.ts"), code)
} catch (error) {
    console.error(error)
    process.exit(1)
}
