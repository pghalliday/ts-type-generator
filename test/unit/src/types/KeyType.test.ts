import {ReferenceType, stringType} from "../../../../src"
import {TestType} from "../../TestType";

const TYPE_NAME = 'TestType'
const TYPE = new TestType(TYPE_NAME)
const COLLECTION_NAME = 'collection'

describe('KeyType', () => {
    let instance: ReferenceType

    before(() => {
        instance = new ReferenceType(COLLECTION_NAME, TYPE)
    })

    it('should have the string validation type name', () => {
        instance.getTypeName().should.equal(stringType.getTypeName())
    })

    it('should have the string namespaced validation type name', () => {
        instance.getNamespacedTypeName().should.equal(stringType.getNamespacedTypeName())
    })

    it('should have the string validator name', () => {
        instance.getValidatorName().should.equal(stringType.getValidatorName())
    })

    it('should have the string namespaced validator name', () => {
        instance.getNamespacedValidatorName().should.equal(stringType.getNamespacedValidatorName())
    })

    it('should depend on the string type', () => {
        instance.getDependencies().should.eql([stringType])
    })
})
