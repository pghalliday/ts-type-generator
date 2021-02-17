import {
    Types,
    ValidationError,
} from "./types/validation";
import {expect} from 'chai'

describe('Types', () => {
    describe('validateTrue', () => {
        describe('with an invalid value', function () {
            it('translate with an invalid value should return an error', () => {
                const result = Types.validateTrue(100)
                result.should.be.an.instanceOf(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Error encountered validating: [boolean]')
                error.cause?.should.be.an.instanceOf(ValidationError)
                const cause = <ValidationError> error.cause
                cause.message.should.equal('Not a boolean')
            })
        });

        describe('with an invalid boolean literal', function () {
            it('should return an error', () => {
                const result = Types.validateTrue(false)
                result.should.be.an.instanceof(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Not [true]')
                expect(error.cause).to.be.undefined
            })
        });

        describe('with a valid boolean literal', function () {
            it('translate with a valid boolean value should the value', () => {
                const result = Types.validateTrue(true)
                result.should.be.a('boolean')
                result.should.be.true
            })
        });
    })
})