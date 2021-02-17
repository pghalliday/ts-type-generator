import {numberType} from "../../../../src";

describe('numberType', () => {
    it('should have the correct validation type name', () => {
        numberType.getValidationTypeName().should.equal('number')
    })

    it('should have the correct namespaced validation type name', () => {
        numberType.getNamespacedValidationTypeName().should.equal('number')
    })

    it('should have the correct validator name', () => {
        numberType.getValidatorName().should.equal('validate_number')
    })

    it('should have the correct namespaced validator name', () => {
        numberType.getNamespacedValidatorName().should.equal('Private.validate_number')
    })

    it('should not have dependencies', () => {
        numberType.getDependencies().should.eql([])
    })
})
