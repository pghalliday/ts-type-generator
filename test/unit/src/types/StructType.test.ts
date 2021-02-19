import {StructType} from "../../../../src"
import {TestType} from "../../TestType";

const TYPE_NAME = 'MyInterfaceType'
const PROPERTY_1 = 'property1'
const PROPERTY_TYPE_1 = 'Type1'
const TYPE_1 = new TestType(PROPERTY_TYPE_1)
const PROPERTY_2 = 'property2'
const PROPERTY_TYPE_2 = 'Type2'
const TYPE_2 = new TestType(PROPERTY_TYPE_2)
const GENERATED_VALIDATOR_NAME_REGEXP = new RegExp('^validateStruct_[0-9]+$')

describe('StructType', () => {
    let instance: StructType

    beforeEach(async () => {
        instance = new StructType(TYPE_NAME)
            .property(PROPERTY_1, TYPE_1)
            .property(PROPERTY_2, TYPE_2)
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
        instance.getDependencies().should.eql([
            TYPE_1,
            TYPE_2
        ])
    })

    describe('when anonymous', () => {
        beforeEach(async () => {
            instance = new StructType()
                .property(PROPERTY_1, TYPE_1)
                .property(PROPERTY_2, TYPE_2)
        })

        it('should use the type def for the validation type name', () => {
            instance.getTypeName().should.equal(`{
    ${PROPERTY_1}: ${TYPE_1.getTypeName()},
    ${PROPERTY_2}: ${TYPE_2.getTypeName()},
}`)
        })

        it('should use the namespaced type def for the validation namespaced type name', () => {
            instance.getNamespacedTypeName().should.equal(`{
    ${PROPERTY_1}: ${TYPE_1.getNamespacedTypeName()},
    ${PROPERTY_2}: ${TYPE_2.getNamespacedTypeName()},
}`)
        })

        it('should have a generated validator name', () => {
            instance.getValidatorName().should.match(GENERATED_VALIDATOR_NAME_REGEXP)
        })

        it('should have the correct namespaced validator name', () => {
            instance.getNamespacedValidatorName().should.equal(`Private.${instance.getValidatorName()}`)
        })
    })
})
