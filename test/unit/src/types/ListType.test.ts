import {ListType} from "../../../../src"
import {TestType} from "../../TestType";

const TYPE_NAME = 'MyArrayType'
const ARRAY_TYPE_NAME = 'Type'
const TYPE = new TestType(ARRAY_TYPE_NAME)

const GENERATED_VALIDATOR_NAME_REGEXP = new RegExp('^validateList_[0-9]+$')

describe('ListType', () => {
    let instance: ListType

    describe('with name', () => {
        beforeEach(async () => {
            instance = new ListType(TYPE, TYPE_NAME)
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

        it('should report the correct dependencies', () => {
            instance.getDependencies().should.eql([TYPE])
        })
    })

    describe('when anonymous', () => {
        beforeEach(async () => {
            instance = new ListType(TYPE)
        })

        it('should use the type def as the validation type name', () => {
            instance.getTypeName().should.equal(`(${TYPE.getTypeName()})[]`)
        })

        it('should use the namespaced type def as the namespaced validation type name', () => {
            instance.getNamespacedTypeName().should.equal(`(${TYPE.getNamespacedTypeName()})[]`)
        })

        it('should have a generated validator name', () => {
            instance.getValidatorName().should.match(GENERATED_VALIDATOR_NAME_REGEXP)
        })

        it('should have the correct namespaced validator name', () => {
            instance.getNamespacedValidatorName().should.equal(`Private.${instance.getValidatorName()}`)
        })
    })
})
