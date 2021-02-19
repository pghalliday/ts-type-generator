import {stringDictionaryType, stringType} from "../../../../src"

describe('stringDictionaryType', () => {
    it('should have the correct validation type name', () => {
        stringDictionaryType.getTypeName().should.equal('{[key: string]: string}')
    })

    it('should have the correct namespaced validation type name', () => {
        stringDictionaryType.getNamespacedTypeName().should.equal('{[key: string]: string}')
    })

    it('should have the correct validator name', () => {
        stringDictionaryType.getValidatorName().should.equal('validate_stringDictionary')
    })

    it('should have the correct namespaced validator name', () => {
        stringDictionaryType.getNamespacedValidatorName().should.equal('Private.validate_stringDictionary')
    })

    it('should depend on the primitive type', () => {
        stringDictionaryType.getDependencies().should.eql([stringType])
    })
})
