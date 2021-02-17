import {
    Types,
    ValidationError,
} from "./types/validation";
import {expect} from 'chai'

describe('Types', () => {
    describe('validateHello', () => {
        describe('with an invalid value', function () {
            it('should return an error', () => {
                const result = Types.validateHello(100)
                result.should.be.an.instanceOf(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Error encountered validating: [string]')
                error.cause?.should.be.an.instanceOf(ValidationError)
                const cause = <ValidationError> error.cause
                cause.message.should.equal('Not a string')
            })
        });

        describe('with an invalid string literal', function () {
            it('should return an error', () => {
                const result = Types.validateHello('banana')
                result.should.be.an.instanceof(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Not ["Hello"]')
                expect(error.cause).to.be.undefined
            })
        });

        describe('with a valid string literal', function () {
            it('should return the value', () => {
                const result = Types.validateHello('Hello')
                result.should.be.a('string')
                result.should.be.equal('Hello')
            })
        });
    })
})