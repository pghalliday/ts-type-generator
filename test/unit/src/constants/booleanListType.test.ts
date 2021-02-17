import {booleanListType, booleanType} from "../../../../src"

describe('booleanListType', () => {
    it('should have the correct validation type name', () => {
        booleanListType.getValidationTypeName().should.equal('(boolean)[]')
    })

    it('should have the correct namespaced validation type name', () => {
        booleanListType.getNamespacedValidationTypeName().should.equal('(boolean)[]')
    })

    it('should have the correct validator name', () => {
        booleanListType.getValidatorName().should.equal('validate_booleanList')
    })

    it('should have the correct namespaced validator name', () => {
        booleanListType.getNamespacedValidatorName().should.equal('Private.validate_booleanList')
    })

    it('should depend on the primitive type', () => {
        booleanListType.getDependencies().should.eql([booleanType])
    })
})
