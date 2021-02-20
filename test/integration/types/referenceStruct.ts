import {booleanType, numberType, stringType, ReferenceType, StructType} from "../../../lib";
import {booleanListType, numberListType, stringListType} from "../../../lib";
import {booleanDictionaryType, numberDictionaryType, stringDictionaryType} from "../../../lib";
import {trueType} from "./trueType";
import {oneHundredType} from "./oneHundredType";
import {helloType} from "./helloType";
import {ListType} from "../../../lib";
import {DictionaryType} from "../../../lib";
import {unionType} from "./unionType";

export const booleanLiteralReference = new ReferenceType('BooleanLiteralReference', trueType);
export const numberLiteralReference = new ReferenceType('NumberLiteralReference', oneHundredType);
export const stringLiteralReference = new ReferenceType('StringLiteralReference', helloType);

export const booleanReference = new ReferenceType('BooleanReference', booleanType);
export const numberReference = new ReferenceType('NumberReference', numberType);
export const stringReference = new ReferenceType('StringReference', stringType);

export const booleanListReference = new ReferenceType('BooleanListReference', booleanListType);
export const numberListReference = new ReferenceType('NumberListReference', numberListType);
export const stringListReference = new ReferenceType('StringListReference', stringListType);

export const booleanDictionaryReference = new ReferenceType('BooleanDictionaryReference', booleanDictionaryType);
export const numberDictionaryReference = new ReferenceType('NumberDictionaryReference', numberDictionaryType);
export const stringDictionaryReference = new ReferenceType('StringDictionaryReference', stringDictionaryType);

export const stringReferenceList = new ListType('StringReferenceList', stringReference)
export const stringReferenceDictionary = new DictionaryType('StringReferenceDictionary', stringReference)

export const unionReference = new ReferenceType('UnionReference', unionType)

export const referenceStruct = new StructType('ReferenceStruct');
export const structReference = new ReferenceType('StructReference', referenceStruct);

referenceStruct
    .property('booleanLiteralReference', booleanLiteralReference)
    .property('numberLiteralReference', numberLiteralReference)
    .property('stringLiteralReference', stringLiteralReference)
    .property('booleanReference', booleanReference)
    .property('numberReference', numberReference)
    .property('stringReference', stringReference)
    .property('booleanListReference', booleanListReference)
    .property('numberListReference', numberListReference)
    .property('stringListReference', stringListReference)
    .property('booleanDictionaryReference', booleanDictionaryReference)
    .property('numberDictionaryReference', numberDictionaryReference)
    .property('stringDictionaryReference', stringDictionaryReference)
    .property('unionReference', unionReference)
    .property('stringReferenceList', stringReferenceList)
    .property('stringReferenceDictionary', stringReferenceDictionary)
    .property('circularReference', structReference)

