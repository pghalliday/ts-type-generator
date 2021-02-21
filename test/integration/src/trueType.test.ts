import {
    Validated,
    ValidationError,
} from "./types";
import {expect} from 'chai'

describe('Types', () => {
    describe('validateTrue', () => {
        describe('with an invalid value', function () {
            it('translate with an invalid value should return an error', () => {
                const result = Validated.validateTrue(100)
                result.should.be.an.instanceOf(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Not a [boolean]')
                expect(error.cause).to.be.undefined
            })
        });

        describe('with an invalid boolean literal', function () {
            it('should return an error', () => {
                const result = Validated.validateTrue(false)
                result.should.be.an.instanceof(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Not [true]')
                expect(error.cause).to.be.undefined
            })
        });

        describe('with a valid boolean literal', function () {
            it('translate with a valid boolean value should the value', () => {
                const result = Validated.validateTrue(true)
                result.should.be.a('boolean')
                result.should.be.true
            })
        });
    })
})