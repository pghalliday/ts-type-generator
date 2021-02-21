import {
    Validated,
    ValidationError,
} from "./types";
import {expect} from 'chai'

describe('Types', () => {
    describe('validateUnion', () => {
        describe('with an invalid value', function () {
            it('should return an error', () => {
                const result = Validated.validateUnion("orange")
                result.should.be.an.instanceOf(ValidationError)
                const error = <ValidationError> result
                error.message.should.equal('Type not in [Apple | Banana | Pear]')
                expect(error.cause).to.be.undefined
            })
        });

        describe('with "apple"', function () {
            it('should return "apple"', () => {
                const result = Validated.validateUnion('apple')
                result.should.be.equal('apple')
            })
        });

        describe('with "banana"', function () {
            it('should return "banana"', () => {
                const result = Validated.validateUnion('banana')
                result.should.be.equal('banana')
            })
        });

        describe('with "pear"', function () {
            it('should return "pear"', () => {
                const result = Validated.validateUnion('pear')
                result.should.be.equal('pear')
            })
        });
    })
})