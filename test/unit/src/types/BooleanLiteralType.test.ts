import {LiteralType, booleanType} from "../../../../src"

const TYPE_NAME = 'MyBooleanLiteralType'
const GENERATED_VALIDATOR_NAME_REGEXP = new RegExp('^validatebooleanLiteral_[0-9]+$')
const VALUE = false

describe('BooleanLiteralType', () => {
    let instance: LiteralType

    describe('with name', () => {
        beforeEach(async () => {
            instance = new LiteralType(VALUE, TYPE_NAME)
        })

        it('should have the correct validation type name', () => {
            instance.getTypeName().should.equal(TYPE_NAME)
        })

        it('should have the correct namespaced validation type name', () => {
            instance.getNamespacedTypeName().should.equal(`Public.${instance.getTypeName()}`)
        })

        it('should have the correct validator name', () => {
            instance.getValidatorName().should.equal(`validate${instance.getTypeName()}`)
        })

        it('should have the correct namespaced validator name', () => {
            instance.getNamespacedValidatorName().should.equal(`Public.${instance.getValidatorName()}`)
        })

        it('should depend on the primitive type', () => {
            instance.getDependencies().should.eql([booleanType])
        })
    })

    describe('when anonymous', () => {
        beforeEach(async () => {
            instance = new LiteralType(VALUE)
        })

        it('should have the value as its validation type name', () => {
            instance.getTypeName().should.equal(JSON.stringify(VALUE))
        })

        it('should have the correct namespaced validation type name', () => {
            instance.getNamespacedTypeName().should.equal(instance.getTypeName())
        })

        it('should have a generated validator name', () => {
            instance.getValidatorName().should.match(GENERATED_VALIDATOR_NAME_REGEXP)
        })

        it('should have the correct namespaced validator name', () => {
            instance.getNamespacedValidatorName().should.equal(`Private.${instance.getValidatorName()}`)
        })
    })
})
