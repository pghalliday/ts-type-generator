import {
    Validated,
    ValidationError,
} from "./types";
import {expect} from 'chai'

describe('Types', () => {
    describe('validateHello', () => {
        describe('with an invalid value', function () {
            it('should return an error', () => {
                const result = Validated.validate_Hello(100)
                result.should.be.an.instanceOf(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Not a [string]')
            })
        });

        describe('with an invalid string literal', function () {
            it('should return an error', () => {
                const result = Validated.validate_Hello('banana')
                result.should.be.an.instanceof(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Not ["Hello"]')
                expect(error.cause).to.be.undefined
            })
        });

        describe('with a valid string literal', function () {
            it('should return the value', () => {
                const result = Validated.validate_Hello('Hello')
                result.should.be.a('string')
                result.should.be.equal('Hello')
            })
        });
    })
})