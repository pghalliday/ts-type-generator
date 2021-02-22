import {
    Validated,
    Resolved,
    References,
    Validator,
    Resolver,
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
    referenceUnion: {
        type: 'number',
        ref: 'key1',
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
    referenceUnion: {
        type: 'string',
        ref: 'key2',
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
    referenceUnion: {
        type: 'string',
        ref: 'key3',
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

const invalidDataStructReference: {[key: string]: unknown} = {
    key1: struct1,
    key2: struct2,
    key3: {},
}

describe('Types', () => {
    describe('referenceStruct', () => {
        describe('Resolver', () => {
            let resolver: Resolver
            let validator: Validator
            let validationErrors: References.ValidationErrors
            let resolutionErrors: References.ResolutionErrors
            let resolvedReferences: References.ResolvedReferences

            beforeEach(() => {
                validationErrors = References.initValidationErrors()
                resolutionErrors = References.initResolutionErrors()
                resolvedReferences = References.initResolvedReferences()
                validator = new Validator()
                resolver = new Resolver()
                validator.success.on(data => resolver.add(data))
                validator.failure.on(data => validationErrors[data.reference][data.key] = data.error)
                resolver.success.on(data => resolvedReferences[data.reference][data.key] = data.instance)
                resolver.failure.on(data => resolutionErrors[data.reference][data.key] = data.error)
                for (const key in BooleanDictionaryReference) {
                    validator.validate({
                        reference: "BooleanDictionaryReference",
                        key,
                        data: BooleanDictionaryReference[key],
                    })
                }
                for (const key in BooleanListReference) {
                    validator.validate({
                        reference: "BooleanListReference",
                        key,
                        data: BooleanListReference[key],
                    })
                }
                for (const key in BooleanReference) {
                    validator.validate({
                        reference: "BooleanReference",
                        key,
                        data: BooleanReference[key],
                    })
                }
                for (const key in BooleanLiteralReference) {
                    validator.validate({
                        reference: "BooleanLiteralReference",
                        key,
                        data: BooleanLiteralReference[key],
                    })
                }
                for (const key in NumberDictionaryReference) {
                    validator.validate({
                        reference: "NumberDictionaryReference",
                        key,
                        data: NumberDictionaryReference[key],
                    })
                }
                for (const key in NumberListReference) {
                    validator.validate({
                        reference: "NumberListReference",
                        key,
                        data: NumberListReference[key],
                    })
                }
                for (const key in NumberReference) {
                    validator.validate({
                        reference: "NumberReference",
                        key,
                        data: NumberReference[key],
                    })
                }
                for (const key in NumberLiteralReference) {
                    validator.validate({
                        reference: "NumberLiteralReference",
                        key,
                        data: NumberLiteralReference[key],
                    })
                }
                for (const key in StringDictionaryReference) {
                    validator.validate({
                        reference: "StringDictionaryReference",
                        key,
                        data: StringDictionaryReference[key],
                    })
                }
                for (const key in StringListReference) {
                    validator.validate({
                        reference: "StringListReference",
                        key,
                        data: StringListReference[key],
                    })
                }
                for (const key in StringReference) {
                    validator.validate({
                        reference: "StringReference",
                        key,
                        data: StringReference[key],
                    })
                }
                for (const key in StringLiteralReference) {
                    validator.validate({
                        reference: "StringLiteralReference",
                        key,
                        data: StringLiteralReference[key],
                    })
                }
                for (const key in UnionReference) {
                    validator.validate({
                        reference: "UnionReference",
                        key,
                        data: UnionReference[key],
                    })
                }
            })

            describe('with valid references', () => {
                let resolvedStruct1: Resolved.ReferenceStruct
                let resolvedStruct2: Resolved.ReferenceStruct

                beforeEach(() => {
                    for (const key in StructReference) {
                        validator.validate({
                            reference: "StructReference",
                            key,
                            data: StructReference[key],
                        })
                    }
                    resolver.resolve()
                    resolvedStruct1 = resolvedReferences.StructReference['key1']
                    resolvedStruct2 = resolvedReferences.StructReference['key2']
                })

                it('should not emit any validation errors', () => {
                    validationErrors.should.eql(References.initValidationErrors())
                })

                it('should not emit any resolution errors', () => {
                    resolutionErrors.should.eql(References.initResolutionErrors())
                })

                it('should correctly resolve boolean literal references', () => {
                    resolvedStruct1.booleanLiteralReference.should.equal(booleanLiteral1)
                    resolvedStruct2.booleanLiteralReference.should.equal(booleanLiteral2)
                })

                it('should correctly resolve number literal references', () => {
                    resolvedStruct1.numberLiteralReference.should.equal(numberLiteral1)
                    resolvedStruct2.numberLiteralReference.should.equal(numberLiteral2)
                })

                it('should correctly resolve string literal references', () => {
                    resolvedStruct1.stringLiteralReference.should.equal(stringLiteral1)
                    resolvedStruct2.stringLiteralReference.should.equal(stringLiteral2)
                })

                it('should correctly resolve boolean references', () => {
                    resolvedStruct1.booleanReference.should.equal(boolean1)
                    resolvedStruct2.booleanReference.should.equal(boolean2)
                })

                it('should correctly resolve number references', () => {
                    resolvedStruct1.numberReference.should.equal(number1)
                    resolvedStruct2.numberReference.should.equal(number2)
                })

                it('should correctly resolve string references', () => {
                    resolvedStruct1.stringReference.should.equal(string1)
                    resolvedStruct2.stringReference.should.equal(string2)
                })

                it('should correctly resolve boolean list references', () => {
                    resolvedStruct1.booleanListReference.should.eql(booleanList1)
                    resolvedStruct2.booleanListReference.should.eql(booleanList2)
                })

                it('should correctly resolve number list references', () => {
                    resolvedStruct1.numberListReference.should.eql(numberList1)
                    resolvedStruct2.numberListReference.should.eql(numberList2)
                })

                it('should correctly resolve string list references', () => {
                    resolvedStruct1.stringListReference.should.eql(stringList1)
                    resolvedStruct2.stringListReference.should.eql(stringList2)
                })

                it('should correctly resolve boolean dictionary references', () => {
                    resolvedStruct1.booleanDictionaryReference.should.eql(booleanDictionary1)
                    resolvedStruct2.booleanDictionaryReference.should.eql(booleanDictionary2)
                })

                it('should correctly resolve number dictionary references', () => {
                    resolvedStruct1.numberDictionaryReference.should.eql(numberDictionary1)
                    resolvedStruct2.numberDictionaryReference.should.eql(numberDictionary2)
                })

                it('should correctly resolve string dictionary references', () => {
                    resolvedStruct1.stringDictionaryReference.should.eql(stringDictionary1)
                    resolvedStruct2.stringDictionaryReference.should.eql(stringDictionary2)
                })

                it('should correctly resolve union references', () => {
                    resolvedStruct1.unionReference.should.eql(union1)
                    resolvedStruct2.unionReference.should.eql(union2)
                })

                it('should correctly resolve lists of references', () => {
                    resolvedStruct1.stringReferenceList.should.eql([string1, string2])
                    resolvedStruct2.stringReferenceList.should.eql([string2, string1])
                })

                it('should correctly resolve dictionaries of references', () => {
                    resolvedStruct1.stringReferenceDictionary.should.eql({
                        key1: string1,
                        key2: string2,
                    })
                    resolvedStruct2.stringReferenceDictionary.should.eql({
                        key1: string2,
                        key2: string1,
                    })
                })

                it('should correctly resolve unions with references', () => {
                    resolvedStruct1.referenceUnion.should.eql({
                        type: 'number',
                        ref: number1,
                    })
                    resolvedStruct2.referenceUnion.should.eql({
                        type: 'string',
                        ref: string2,
                    })
                })

                it('should correctly resolve circular references', () => {
                    resolvedStruct1.circularReference.should.equal(resolvedStruct2)
                    resolvedStruct2.circularReference.should.equal(resolvedStruct1)
                })
            })

            describe('with invalid references', () => {
                beforeEach(() => {
                    for (const key in invalidStructReference) {
                        validator.validate({
                            reference: "StructReference",
                            key,
                            data: invalidStructReference[key],
                        })
                    }
                    resolver.resolve()
                })

                it('should not emit any validation errors', () => {
                    validationErrors.should.eql(References.initValidationErrors())
                })

                it('should emit a resolution error', () => {
                    const error = resolutionErrors.StructReference['key3']
                    error.message.should.eql('Error encountered resolving property: [booleanLiteralReference]')
                    error.cause?.message.should.eql('Reference not found: [BooleanLiteralReference/key3]')
                })
            })

            describe('with invalid data', () => {
                beforeEach(() => {
                    for (const key in invalidDataStructReference) {
                        validator.validate({
                            reference: "StructReference",
                            key,
                            data: invalidDataStructReference[key],
                        })
                    }
                    resolver.resolve()
                })

                it('should emit a validation error', () => {
                    const error = validationErrors.StructReference['key3']
                    error.message.should.eql('Property missing: ["booleanLiteralReference"]')
                })

                it('should not emit any resolution errors', () => {
                    resolutionErrors.should.eql(References.initResolutionErrors())
                })
            })
        })
    })
})