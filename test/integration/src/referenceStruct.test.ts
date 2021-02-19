import {
    BooleanDictionary,
    BooleanList,
    BooleanType, NumberDictionary,
    NumberList,
    NumberType,
    ReferenceStruct, StringDictionary,
    StringList,
    StringType
} from "./types/validate";
import {resolveAll} from "./types";

const boolean1: BooleanType = true
const boolean2: BooleanType = false

const BooleanReference = {
    key1: boolean1,
    key2: boolean2,
}

const booleanList1: BooleanList = [true, false]
const booleanList2: BooleanList = [false, true]

const BooleanListReference = {
    key1: booleanList1,
    key2: booleanList2,
}

const booleanDictionary1: BooleanDictionary = {
    key1: true,
    key2: false,
}
const booleanDictionary2: BooleanDictionary = {
    key3: false,
    key4: true,
}

const BooleanDictionaryReference = {
    key1: booleanDictionary1,
    key2: booleanDictionary2,
}

const number1: NumberType = 100
const number2: NumberType = 101

const NumberReference = {
    key1: number1,
    key2: number2,
}

const numberList1: NumberList = [101, 102]
const numberList2: NumberList = [201, 202]

const NumberListReference = {
    key1: numberList1,
    key2: numberList2,
}

const numberDictionary1: NumberDictionary = {
    key1: 101,
    key2: 102,
}
const numberDictionary2: NumberDictionary = {
    key3: 201,
    key4: 202,
}

const NumberDictionaryReference = {
    key1: numberDictionary1,
    key2: numberDictionary2,
}

const string1: StringType = 'apple'
const string2: StringType = 'banana'

const StringReference = {
    key1: string1,
    key2: string2,
}

const stringList1: StringList = ['apple', 'banana']
const stringList2: StringList = ['kiwi', 'pear']

const StringListReference = {
    key1: stringList1,
    key2: stringList2,
}

const stringDictionary1: StringDictionary = {
    key1: 'apple',
    key2: 'banana',
}
const stringDictionary2: StringDictionary = {
    key3: 'pear',
    key4: 'kiwi',
}

const StringDictionaryReference = {
    key1: stringDictionary1,
    key2: stringDictionary2,
}

const struct1: ReferenceStruct = {
    booleanReference: 'key1',
    numberReference: 'key1',
    stringReference: 'key1',
    booleanListReference: 'key1',
    numberListReference: 'key1',
    stringListReference: 'key1',
    booleanDictionaryReference: 'key1',
    numberDictionaryReference: 'key1',
    stringDictionaryReference: 'key1',
}

const struct2: ReferenceStruct = {
    booleanReference: 'key2',
    numberReference: 'key2',
    stringReference: 'key2',
    booleanListReference: 'key2',
    numberListReference: 'key2',
    stringListReference: 'key2',
    booleanDictionaryReference: 'key2',
    numberDictionaryReference: 'key2',
    stringDictionaryReference: 'key2',
}

const struct3: ReferenceStruct = {
    booleanReference: 'key3',
    numberReference: 'key3',
    stringReference: 'key3',
    booleanListReference: 'key3',
    numberListReference: 'key3',
    stringListReference: 'key3',
    booleanDictionaryReference: 'key3',
    numberDictionaryReference: 'key3',
    stringDictionaryReference: 'key3',
}

const StructReference = {
    key1: struct1,
    key2: struct2,
}

const invalidStructReference = {
    key1: struct1,
    key2: struct2,
    key3: struct3,
}

const validReferences = {
    BooleanReference,
    NumberReference,
    StringReference,
    BooleanListReference,
    NumberListReference,
    StringListReference,
    BooleanDictionaryReference,
    NumberDictionaryReference,
    StringDictionaryReference,
    StructReference,
}

const invalidReferences = {
    BooleanReference,
    NumberReference,
    StringReference,
    BooleanListReference,
    NumberListReference,
    StringListReference,
    BooleanDictionaryReference,
    NumberDictionaryReference,
    StringDictionaryReference,
    StructReference: invalidStructReference,
}

describe('Types', () => {
    describe('referenceStruct', () => {
        describe('resolveAll', () => {
            describe('with valid references', () => {
                it('should correctly resolve the references', () => {
                    const collapsedReferences = resolveAll(validReferences)
                    collapsedReferences.StructReference['key1'].booleanReference.should.equal(boolean1)
                    collapsedReferences.StructReference['key1'].numberReference.should.equal(number1)
                    collapsedReferences.StructReference['key1'].stringReference.should.equal(string1)
                    collapsedReferences.StructReference['key1'].booleanListReference.should.eql(booleanList1)
                    collapsedReferences.StructReference['key1'].numberListReference.should.eql(numberList1)
                    collapsedReferences.StructReference['key1'].stringListReference.should.eql(stringList1)
                    collapsedReferences.StructReference['key1'].booleanDictionaryReference.should.eql(booleanDictionary1)
                    collapsedReferences.StructReference['key1'].numberDictionaryReference.should.eql(numberDictionary1)
                    collapsedReferences.StructReference['key1'].stringDictionaryReference.should.eql(stringDictionary1)
                    collapsedReferences.StructReference['key2'].booleanReference.should.equal(boolean2)
                    collapsedReferences.StructReference['key2'].numberReference.should.equal(number2)
                    collapsedReferences.StructReference['key2'].stringReference.should.equal(string2)
                    collapsedReferences.StructReference['key2'].booleanListReference.should.eql(booleanList2)
                    collapsedReferences.StructReference['key2'].numberListReference.should.eql(numberList2)
                    collapsedReferences.StructReference['key2'].stringListReference.should.eql(stringList2)
                    collapsedReferences.StructReference['key2'].booleanDictionaryReference.should.eql(booleanDictionary2)
                    collapsedReferences.StructReference['key2'].numberDictionaryReference.should.eql(numberDictionary2)
                    collapsedReferences.StructReference['key2'].stringDictionaryReference.should.eql(stringDictionary2)
                })
            })

            describe('with invalid references', () => {
                it('should throw an error', () => {
                    (() => {
                        resolveAll(invalidReferences)
                    }).should.throw('key3')
                })
            })
        })
    })
})