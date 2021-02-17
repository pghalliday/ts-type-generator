import {stringType} from "../../../../src";

describe('stringType', () => {
    it('should have the correct validation type name', () => {
        stringType.getValidationTypeName().should.equal('string')
    })

    it('should have the correct namespaced validation type name', () => {
        stringType.getNamespacedValidationTypeName().should.equal('string')
    })

    it('should have the correct validator name', () => {
        stringType.getValidatorName().should.equal('validate_string')
    })

    it('should have the correct namespaced validator name', () => {
        stringType.getNamespacedValidatorName().should.equal('Private.validate_string')
    })

    it('should report the correct dependencies', () => {
        stringType.getDependencies().should.eql([])
    })
})
