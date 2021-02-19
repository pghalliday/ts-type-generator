import {
    booleanDictionaryType,
    booleanListType,
    booleanType, numberDictionaryType,
    numberListType,
    numberType, stringDictionaryType,
    stringListType,
    stringType,
    StructType,
} from "../../../lib";

export const structType = new StructType('Struct')
    .property('boolean', booleanType)
    .property('number', numberType)
    .property('string', stringType)
    .property('booleanList', booleanListType)
    .property('numberList', numberListType)
    .property('stringList', stringListType)
    .property('booleanDictionary', booleanDictionaryType)
    .property('numberDictionary', numberDictionaryType)
    .property('stringDictionary', stringDictionaryType)
