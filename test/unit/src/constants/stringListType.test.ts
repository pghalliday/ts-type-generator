import {stringListType, stringType} from "../../../../src"

describe('stringListType', () => {
    it('should have the correct validation type name', () => {
        stringListType.getTypeName().should.equal('(string)[]')
    })

    it('should have the correct namespaced validation type name', () => {
        stringListType.getNamespacedTypeName().should.equal('(string)[]')
    })

    it('should have the correct validator name', () => {
        stringListType.getValidatorName().should.equal('validate_stringList')
    })

    it('should have the correct namespaced validator name', () => {
        stringListType.getNamespacedValidatorName().should.equal('Private.validate_stringList')
    })

    it('should depend on the primitive type', () => {
        stringListType.getDependencies().should.eql([stringType])
    })
})
