import {booleanType, numberType, stringType, ReferenceType, StructType} from "../../../lib";
import {booleanListType, numberListType, stringListType} from "../../../lib";
import {booleanDictionaryType, numberDictionaryType, stringDictionaryType} from "../../../lib";

export const booleanReference = new ReferenceType('BooleanReference', booleanType);
export const numberReference = new ReferenceType('NumberReference', numberType);
export const stringReference = new ReferenceType('StringReference', stringType);

export const booleanListReference = new ReferenceType('BooleanListReference', booleanListType);
export const numberListReference = new ReferenceType('NumberListReference', numberListType);
export const stringListReference = new ReferenceType('StringListReference', stringListType);

export const booleanDictionaryReference = new ReferenceType('BooleanDictionaryReference', booleanDictionaryType);
export const numberDictionaryReference = new ReferenceType('NumberDictionaryReference', numberDictionaryType);
export const stringDictionaryReference = new ReferenceType('StringDictionaryReference', stringDictionaryType);

export const referenceStruct = new StructType('ReferenceStruct')
    .property('booleanReference', booleanReference)
    .property('numberReference', numberReference)
    .property('stringReference', stringReference)
    .property('booleanListReference', booleanListReference)
    .property('numberListReference', numberListReference)
    .property('stringListReference', stringListReference)
    .property('booleanDictionaryReference', booleanDictionaryReference)
    .property('numberDictionaryReference', numberDictionaryReference)
    .property('stringDictionaryReference', stringDictionaryReference)

export const structReference = new ReferenceType('StructReference', referenceStruct);
