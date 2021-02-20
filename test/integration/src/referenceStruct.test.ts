import {
    Validated,
    Collapsed,
    References,
    resolveReferences,
} from "./types";

const booleanLiteral1: Validated.True = true
const booleanLiteral2: Validated.True = true

const BooleanLiteralReference: References.ValidatedReference_BooleanLiteralReference = {
    key1: booleanLiteral1,
    key2: booleanLiteral2,
}

const boolean1: Validated.BooleanType = true
const boolean2: Validated.BooleanType = false

const BooleanReference: References.ValidatedReference_BooleanReference = {
    key1: boolean1,
    key2: boolean2,
}

const booleanList1: Validated.BooleanList = [true, false]
const booleanList2: Validated.BooleanList = [false, true]

const BooleanListReference: References.ValidatedReference_BooleanListReference = {
    key1: booleanList1,
    key2: booleanList2,
}

const booleanDictionary1: Validated.BooleanDictionary = {
    key1: true,
    key2: false,
}
const booleanDictionary2: Validated.BooleanDictionary = {
    key3: false,
    key4: true,
}

const BooleanDictionaryReference: References.ValidatedReference_BooleanDictionaryReference = {
    key1: booleanDictionary1,
    key2: booleanDictionary2,
}

const numberLiteral1: Validated.OneHundred = 100
const numberLiteral2: Validated.OneHundred = 100

const NumberLiteralReference: References.ValidatedReference_NumberLiteralReference = {
    key1: numberLiteral1,
    key2: numberLiteral2,
}

const number1: Validated.NumberType = 100
const number2: Validated.NumberType = 101

const NumberReference: References.ValidatedReference_NumberReference = {
    key1: number1,
    key2: number2,
}

const numberList1: Validated.NumberList = [101, 102]
const numberList2: Validated.NumberList = [201, 202]

const NumberListReference: References.ValidatedReference_NumberListReference = {
    key1: numberList1,
    key2: numberList2,
}

const numberDictionary1: Validated.NumberDictionary = {
    key1: 101,
    key2: 102,
}
const numberDictionary2: Validated.NumberDictionary = {
    key3: 201,
    key4: 202,
}

const NumberDictionaryReference: References.ValidatedReference_NumberDictionaryReference = {
    key1: numberDictionary1,
    key2: numberDictionary2,
}

const stringLiteral1: Validated.Hello = 'Hello'
const stringLiteral2: Validated.Hello = 'Hello'

const StringLiteralReference: References.ValidatedReference_StringLiteralReference = {
    key1: stringLiteral1,
    key2: stringLiteral2,
}

const string1: Validated.StringType = 'apple'
const string2: Validated.StringType = 'banana'

const StringReference: References.ValidatedReference_StringReference = {
    key1: string1,
    key2: string2,
}

const stringList1: Validated.StringList = ['apple', 'banana']
const stringList2: Validated.StringList = ['kiwi', 'pear']

const StringListReference: References.ValidatedReference_StringListReference = {
    key1: stringList1,
    key2: stringList2,
}

const stringDictionary1: Validated.StringDictionary = {
    key1: 'apple',
    key2: 'banana',
}
const stringDictionary2: Validated.StringDictionary = {
    key3: 'pear',
    key4: 'kiwi',
}

const StringDictionaryReference: References.ValidatedReference_StringDictionaryReference = {
    key1: stringDictionary1,
    key2: stringDictionary2,
}

const union1: Validated.Union = 'apple';
const union2: Validated.Union = 'banana';

const UnionReference: References.ValidatedReference_UnionReference = {
    key1: union1,
    key2: union2,
}

const struct1: Validated.ReferenceStruct = {
    booleanLiteralReference: 'key1',
    numberLiteralReference: 'key1',
    stringLiteralReference: 'key1',
    booleanReference: 'key1',
    numberReference: 'key1',
    stringReference: 'key1',
    booleanListReference: 'key1',
    numberListReference: 'key1',
    stringListReference: 'key1',
    booleanDictionaryReference: 'key1',
    numberDictionaryReference: 'key1',
    stringDictionaryReference: 'key1',
    unionReference: 'key1',
    stringReferenceList: ['key1', 'key2'],
    stringReferenceDictionary: {
        key1: 'key1',
        key2: 'key2',
    },
    circularReference: 'key2',
}

const struct2: Validated.ReferenceStruct = {
    booleanLiteralReference: 'key2',
    numberLiteralReference: 'key2',
    stringLiteralReference: 'key2',
    booleanReference: 'key2',
    numberReference: 'key2',
    stringReference: 'key2',
    booleanListReference: 'key2',
    numberListReference: 'key2',
    stringListReference: 'key2',
    booleanDictionaryReference: 'key2',
    numberDictionaryReference: 'key2',
    stringDictionaryReference: 'key2',
    unionReference: 'key2',
    stringReferenceList: ['key2', 'key1'],
    stringReferenceDictionary: {
        key1: 'key2',
        key2: 'key1',
    },
    circularReference: 'key1',
}

const struct3: Validated.ReferenceStruct = {
    booleanLiteralReference: 'key3',
    numberLiteralReference: 'key3',
    stringLiteralReference: 'key3',
    booleanReference: 'key3',
    numberReference: 'key3',
    stringReference: 'key3',
    booleanListReference: 'key3',
    numberListReference: 'key3',
    stringListReference: 'key3',
    booleanDictionaryReference: 'key3',
    numberDictionaryReference: 'key3',
    stringDictionaryReference: 'key3',
    unionReference: 'key3',
    stringReferenceList: ['key3'],
    stringReferenceDictionary: {
        key3: 'key3',
    },
    circularReference: 'key3',
}

const StructReference: References.ValidatedReference_StructReference = {
    key1: struct1,
    key2: struct2,
}

const invalidStructReference: References.ValidatedReference_StructReference = {
    key1: struct1,
    key2: struct2,
    key3: struct3,
}

const validReferences: References.ValidatedReferences = {
    BooleanLiteralReference,
    NumberLiteralReference,
    StringLiteralReference,
    BooleanReference,
    NumberReference,
    StringReference,
    BooleanListReference,
    NumberListReference,
    StringListReference,
    BooleanDictionaryReference,
    NumberDictionaryReference,
    StringDictionaryReference,
    UnionReference,
    StructReference,
}

const invalidReferences: References.ValidatedReferences = {
    BooleanLiteralReference,
    NumberLiteralReference,
    StringLiteralReference,
    BooleanReference,
    NumberReference,
    StringReference,
    BooleanListReference,
    NumberListReference,
    StringListReference,
    BooleanDictionaryReference,
    NumberDictionaryReference,
    StringDictionaryReference,
    UnionReference,
    StructReference: invalidStructReference,
}

describe('Types', () => {
    describe('referenceStruct', () => {
        describe('resolveAll', () => {
            describe('with valid references', () => {
                let collapsedStruct1: Collapsed.ReferenceStruct
                let collapsedStruct2: Collapsed.ReferenceStruct

                before(() => {
                    const collapsedReferences = resolveReferences(validReferences)
                    collapsedStruct1 = collapsedReferences.StructReference['key1']
                    collapsedStruct2 = collapsedReferences.StructReference['key2']
                })

                it('should correctly resolve boolean literal references', () => {
                    collapsedStruct1.booleanLiteralReference.should.equal(booleanLiteral1)
                    collapsedStruct2.booleanLiteralReference.should.equal(booleanLiteral2)
                })

                it('should correctly resolve number literal references', () => {
                    collapsedStruct1.numberLiteralReference.should.equal(numberLiteral1)
                    collapsedStruct2.numberLiteralReference.should.equal(numberLiteral2)
                })

                it('should correctly resolve string literal references', () => {
                    collapsedStruct1.stringLiteralReference.should.equal(stringLiteral1)
                    collapsedStruct2.stringLiteralReference.should.equal(stringLiteral2)
                })

                it('should correctly resolve boolean references', () => {
                    collapsedStruct1.booleanReference.should.equal(boolean1)
                    collapsedStruct2.booleanReference.should.equal(boolean2)
                })

                it('should correctly resolve number references', () => {
                    collapsedStruct1.numberReference.should.equal(number1)
                    collapsedStruct2.numberReference.should.equal(number2)
                })

                it('should correctly resolve string references', () => {
                    collapsedStruct1.stringReference.should.equal(string1)
                    collapsedStruct2.stringReference.should.equal(string2)
                })

                it('should correctly resolve boolean list references', () => {
                    collapsedStruct1.booleanListReference.should.eql(booleanList1)
                    collapsedStruct2.booleanListReference.should.eql(booleanList2)
                })

                it('should correctly resolve number list references', () => {
                    collapsedStruct1.numberListReference.should.eql(numberList1)
                    collapsedStruct2.numberListReference.should.eql(numberList2)
                })

                it('should correctly resolve string list references', () => {
                    collapsedStruct1.stringListReference.should.eql(stringList1)
                    collapsedStruct2.stringListReference.should.eql(stringList2)
                })

                it('should correctly resolve boolean dictionary references', () => {
                    collapsedStruct1.booleanDictionaryReference.should.eql(booleanDictionary1)
                    collapsedStruct2.booleanDictionaryReference.should.eql(booleanDictionary2)
                })

                it('should correctly resolve number dictionary references', () => {
                    collapsedStruct1.numberDictionaryReference.should.eql(numberDictionary1)
                    collapsedStruct2.numberDictionaryReference.should.eql(numberDictionary2)
                })

                it('should correctly resolve string dictionary references', () => {
                    collapsedStruct1.stringDictionaryReference.should.eql(stringDictionary1)
                    collapsedStruct2.stringDictionaryReference.should.eql(stringDictionary2)
                })

                it('should correctly resolve union references', () => {
                    collapsedStruct1.unionReference.should.eql(union1)
                    collapsedStruct2.unionReference.should.eql(union2)
                })

                it('should correctly resolve lists of references', () => {
                    collapsedStruct1.stringReferenceList.should.eql([string1, string2])
                    collapsedStruct2.stringReferenceList.should.eql([string2, string1])
                })

                it('should correctly resolve dictionaries of references', () => {
                    collapsedStruct1.stringReferenceDictionary.should.eql({
                        key1: string1,
                        key2: string2,
                    })
                    collapsedStruct2.stringReferenceDictionary.should.eql({
                        key1: string2,
                        key2: string1,
                    })
                })

                it('should correctly resolve circular references', () => {
                    collapsedStruct1.circularReference.should.equal(collapsedStruct2)
                    collapsedStruct2.circularReference.should.equal(collapsedStruct1)
                })
            })

            describe('with invalid references', () => {
                it('should throw an error', () => {
                    (() => {
                        resolveReferences(invalidReferences)
                    }).should.throw('key not found: BooleanLiteralReference/key3')
                })
            })
        })
    })
})