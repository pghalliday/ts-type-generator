import {
    Types,
    ValidationError,
} from "./types/validation";
import {expect} from 'chai'

describe('Types', () => {
    describe('validateList', () => {
        describe('with an invalid value', function () {
            it('translate with an invalid value should return an error', () => {
                const result = Types.validateList("orange")
                result.should.be.an.instanceOf(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Not a list')
                expect(error.cause).to.be.undefined
            })
        });

        describe('with an invalid element', function () {
            it('should return an error', () => {
                const result = Types.validateList([99])
                result.should.be.an.instanceOf(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Error encountered validating index: [0]')
                error.cause?.should.be.an.instanceof(ValidationError)
                const cause = <ValidationError> error.cause
                cause.message.should.equal('Type not in [100 | 101 | 102]')
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
                const result = Types.validateList(list)
                result.should.not.equal(list)
                result.should.eql(list)
            })
        });
    })
})