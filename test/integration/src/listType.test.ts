import {
    Validated,
    ValidationError,
} from "./types";
import {expect} from 'chai'

describe('Types', () => {
    describe('validateList', () => {
        describe('with an invalid value', function () {
            it('translate with an invalid value should return an error', () => {
                const result = Validated.validateList("orange")
                result.should.be.an.instanceOf(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Not a list')
                expect(error.cause).to.be.undefined
            })
        });

        describe('with an invalid element', function () {
            it('should return an error', () => {
                const result = Validated.validateList([99])
                result.should.be.an.instanceOf(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Error encountered validating index: [0]')
                error.cause?.should.be.an.instanceof(ValidationError)
                const cause = <ValidationError> error.cause
                cause.message.should.equal('Type not in [List100 | List101 | List102]')
            })
        });

        describe('with a valid list', function () {
            it('should return a copy of the list', () => {
                const list = [
                    101,
                    102,
                    100,
                    101,
                    102,
                ]
                const result = Validated.validateList(list)
                result.should.not.equal(list)
                result.should.eql(list)
            })
        });
    })
})