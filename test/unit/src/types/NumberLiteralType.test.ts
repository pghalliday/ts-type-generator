import {NumberLiteralType, numberType} from "../../../../src"

const TYPE_NAME = 'MyNumberLiteralType'
const GENERATED_VALIDATOR_NAME_REGEXP = new RegExp('^validatenumberLiteral_[0-9]+$')
const VALUE = 100

describe('NumberLiteralType', () => {
    let instance: NumberLiteralType

    describe('with name', () => {
        beforeEach(async () => {
            instance = new NumberLiteralType(VALUE, TYPE_NAME)
        })

        it('should have the correct validation type name', () => {
            instance.getValidationTypeName().should.equal(TYPE_NAME)
        })

        it('should have the correct namespaced validation type name', () => {
            instance.getNamespacedValidationTypeName().should.equal(`Public.${instance.getValidationTypeName()}`)
        })

        it('should have the correct validator name', () => {
            instance.getValidatorName().should.equal(`validate${instance.getValidationTypeName()}`)
        })

        it('should have the correct namespaced validator name', () => {
            instance.getNamespacedValidatorName().should.equal(`Public.${instance.getValidatorName()}`)
        })

        it('should depend on the primitive type', () => {
            instance.getDependencies().should.eql([numberType])
        })
    })

    describe('when anonymous', () => {
        beforeEach(async () => {
            instance = new NumberLiteralType(VALUE)
        })

        it('should have the value as its validation type name', () => {
            instance.getValidationTypeName().should.equal(JSON.stringify(VALUE))
        })

        it('should have the correct namespaced validation type name', () => {
            instance.getNamespacedValidationTypeName().should.equal(instance.getValidationTypeName())
        })

        it('should have a generated validator name', () => {
            instance.getValidatorName().should.match(GENERATED_VALIDATOR_NAME_REGEXP)
        })

        it('should have the correct namespaced validator name', () => {
            instance.getNamespacedValidatorName().should.equal(`Private.${instance.getValidatorName()}`)
        })
    })
})
