import {booleanType} from "../../../../src";

describe('booleanType', () => {
    it('should have the correct validation type name', () => {
        booleanType.getTypeName().should.equal('boolean')
    })

    it('should have the correct namespaced validation type name', () => {
        booleanType.getNamespacedTypeName().should.equal('boolean')
    })

    it('should have the correct validator name', () => {
        booleanType.getValidatorName().should.equal('validate_boolean')
    })

    it('should have the correct namespaced validator name', () => {
        booleanType.getNamespacedValidatorName().should.equal('Private.validate_boolean')
    })

    it('should not have dependencies', () => {
        booleanType.getDependencies().should.eql([])
    })
})
