import {
    Validated,
    ValidationError,
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

describe('Types', () => {
    describe('validateStruct', () => {
        describe('with an invalid value', function () {
            it('should return an error`', () => {
                const result = Validated.validateStruct("orange")
                result.should.be.an.instanceOf(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Not an object')
                expect(error.cause).to.be.undefined
            })
        });

        describe('with incomplete properties', () => {
            it('should return an error', () => {
                const result = Validated.validateStruct({
                    boolean: true,
                })
                result.should.be.an.instanceOf(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Property missing: ["number"]')
                expect(error.cause).to.be.undefined
            })
        })

        describe('with an invalid property', function () {
            it('should return an error', () => {
                const invalidValue = Object.assign({}, VALUE, {
                    boolean: 100,
                })
                const result = Validated.validateStruct(invalidValue)
                result.should.be.an.instanceOf(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Error encountered validating property: ["boolean"]')
                error.cause?.should.be.an.instanceOf(ValidationError)
                const cause = <ValidationError> error.cause
                cause.message.should.equal('Not a boolean')
            })
        });

        describe('with a valid value', function () {
            it('should return a copy of the value', () => {
                const result = Validated.validateStruct(VALUE)
                result.should.not.equal(VALUE)
                result.should.eql(VALUE)
            })
        });
    })
})