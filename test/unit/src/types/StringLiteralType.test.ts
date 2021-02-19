import {StringLiteralType, stringType} from "../../../../src"

const TYPE_NAME = 'MyStringLiteralType'
const GENERATED_VALIDATOR_NAME_REGEXP = new RegExp('^validatestringLiteral_[0-9]+$')
const VALUE = "hello"

describe('StringLiteralType', () => {
    let instance: StringLiteralType

    describe('with name', () => {
        beforeEach(async () => {
            instance = new StringLiteralType(VALUE, TYPE_NAME)
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
            instance.getNamespacedValidatorName().should.equal(`Public.validate${instance.getTypeName()}`)
        })

        it('should depend on the primitive type', () => {
            instance.getDependencies().should.eql([stringType])
        })
    })

    describe('when anonymous', () => {
        beforeEach(async () => {
            instance = new StringLiteralType(VALUE)
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
