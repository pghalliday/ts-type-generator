import {numberDictionaryType, numberType} from "../../../../src"

describe('numberDictionaryType', () => {
    it('should have the correct validation type name', () => {
        numberDictionaryType.getTypeName().should.equal('{[key: string]: number}')
    })

    it('should have the correct namespaced validation type name', () => {
        numberDictionaryType.getNamespacedTypeName().should.equal('{[key: string]: number}')
    })

    it('should have the correct validator name', () => {
        numberDictionaryType.getValidatorName().should.equal('validate_numberDictionary')
    })

    it('should have the correct namespaced validator name', () => {
        numberDictionaryType.getNamespacedValidatorName().should.equal('Private.validate_numberDictionary')
    })

    it('should depend on the primitive type', () => {
        numberDictionaryType.getDependencies().should.eql([numberType])
    })
})
