import {
    translateStruct,
    TTG_TranslationError,
} from "./types";
import {expect} from 'chai'

const VALUE: unknown = {
    boolean: true,
    number: 100,
    string: 'hello',
    booleanList: [true, false],
    numberList: [100, 101, 102],
    stringList: ['apple', 'banana', 'pear'],
    booleanDictionary: {
        prop1: true,
        prop2: false,
        prop3: true,
    },
    numberDictionary: {
        prop1: 200,
        prop2: 201,
        prop3: 202,
    },
    stringDictionary: {
        prop1: 'apple',
        prop2: 'banana',
        prop3: 'pear',
    },
}

describe('TsTypeGenerator', () => {
    describe('translateStruct', () => {
        it('translate with an invalid value should return an error', () => {
            const result = translateStruct("orange")
            result.should.be.an.instanceOf(TTG_TranslationError)
            const error = <TTG_TranslationError> result
            error.message.should.equal('Not an object')
            expect(error.cause).to.be.undefined
        })

        it('translate with incomplete properties should return an error', () => {
            const result = translateStruct({
                boolean: true,
            })
            result.should.be.an.instanceOf(TTG_TranslationError)
            const error = <TTG_TranslationError> result
            error.message.should.equal('Property missing: ["number"]')
            expect(error.cause).to.be.undefined
        })

        it('translate with an invalid property should return an error', () => {
            const invalidValue = Object.assign({}, VALUE, {
                boolean: 100,
            })
            const result = translateStruct(invalidValue)
            result.should.be.an.instanceOf(TTG_TranslationError)
            const error = <TTG_TranslationError> result
            error.message.should.equal('Error encountered translating property: ["boolean"]')
            error.cause?.should.be.an.instanceOf(TTG_TranslationError)
            const cause = <TTG_TranslationError> error.cause
            cause.message.should.equal('Not a boolean')
        })

        it('translate with a valid value should return a copy of the value', () => {
            const result = translateStruct(VALUE)
            result.should.not.equal(VALUE)
            result.should.eql(VALUE)
        })
    })
})