import {
    Types,
    ValidationError,
} from "./types/validation";
import {expect} from 'chai'

describe('Types', () => {
    describe('validateOneHundred', () => {
        describe('with an invalid value', function () {
            it('should return an error', () => {
                const result = Types.validateOneHundred(true)
                result.should.be.an.instanceOf(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Error encountered validating: [number]')
                error.cause?.should.be.an.instanceOf(ValidationError)
                const cause = <ValidationError> error.cause
                cause.message.should.equal('Not a number')
            })
        });

        describe('with an invalid number literal', function () {
            it('should return an error', () => {
                const result = Types.validateOneHundred(101)
                result.should.be.an.instanceof(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Not [100]')
                expect(error.cause).to.be.undefined
            })
        });

        describe('with a valid number literal', function () {
            it('should return the value', () => {
                const result = Types.validateOneHundred(100)
                result.should.be.a('number')
                result.should.be.equal(100)
            })
        });
    })
})