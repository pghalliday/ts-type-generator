import {numberListType, numberType} from "../../../../src"

describe('numberListType', () => {
    it('should have the correct validation type name', () => {
        numberListType.getTypeName().should.equal('(number)[]')
    })

    it('should have the correct namespaced validation type name', () => {
        numberListType.getNamespacedTypeName().should.equal('(number)[]')
    })

    it('should have the correct validator name', () => {
        numberListType.getValidatorName().should.equal('validate_numberList')
    })

    it('should have the correct namespaced validator name', () => {
        numberListType.getNamespacedValidatorName().should.equal('Private.validate_numberList')
    })

    it('should depend on the primitive type', () => {
        numberListType.getDependencies().should.eql([numberType])
    })
})
