import {UnionType} from "../../../../src"
import {TestType} from "../../TestType";

const TYPE_NAME = 'MyUnionType'
const TYPE_NAME_1 = 'Type1'
const TYPE_NAME_2 = 'Type2'
const TYPE_1 = new TestType(TYPE_NAME_1, true)
const TYPE_2 = new TestType(TYPE_NAME_2, true)
const GENERATED_VALIDATOR_NAME_REGEXP = new RegExp('^validateUnion_[0-9]+$')

describe('UnionType', () => {
    let instance: UnionType

    describe('with name', () => {
        beforeEach(async () => {
            instance = new UnionType(TYPE_NAME)
                .type(TYPE_1)
                .type(TYPE_2)
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

        it('should report the correct dependencies', () => {
            instance.getDependencies().should.eql([
                TYPE_1,
                TYPE_2
            ])
        })
    })

    describe('when anonymous', () => {
        beforeEach(async () => {
            instance = new UnionType()
                .type(TYPE_1)
                .type(TYPE_2)
        })

        it('should have the type union as its validation type name', () => {
            instance.getValidationTypeName().should.equal([TYPE_1.getValidationTypeName(), TYPE_2.getValidationTypeName()].join(' | '))
        })

        it('should have the namespaced type union as its namespaced validation type name', () => {
            instance.getNamespacedValidationTypeName().should.equal([TYPE_1.getNamespacedValidationTypeName(), TYPE_2.getNamespacedValidationTypeName()].join(' | '))
        })

        it('should have a generated validator name', () => {
            instance.getValidatorName().should.match(GENERATED_VALIDATOR_NAME_REGEXP)
        })

        it('should have the correct namespaced validator name', () => {
            instance.getNamespacedValidatorName().should.equal(`Private.${instance.getValidatorName()}`)
        })
    })
})
