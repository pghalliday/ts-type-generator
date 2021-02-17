import {
    Types,
    ValidationError,
} from "./types/validation";
import {expect} from 'chai'

describe('Types', () => {
    describe('validateDictionary', () => {
        describe('with an invalid value', function () {
            it('should return an error', () => {
                const result = Types.validateDictionary("orange")
                result.should.be.an.instanceOf(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Not a dictionary')
                expect(error.cause).to.be.undefined
            })
        });

        describe('with an invalid element', function () {
            it('should return an error', () => {
                const result = Types.validateDictionary({
                    apple: 99,
                })
                result.should.be.an.instanceOf(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Error encountered validating key: [apple]')
                error.cause?.should.be.an.instanceof(ValidationError)
                const cause = <ValidationError> error.cause
                cause.message.should.equal('Type not in [false | true]')
            })
        });

        describe('with a valid dictionary', function () {
            it('should return a copy of the dictionary', () => {
                const dictionary = {
                    apple: true,
                    banana: false,
                    pear: true,
                }
                const result = Types.validateDictionary(dictionary)
                result.should.not.equal(dictionary)
                result.should.eql(dictionary)
            })
        });
    })
})