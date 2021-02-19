import {booleanDictionaryType, booleanType} from "../../../../src"

describe('booleanDictionaryType', () => {
    it('should have the correct validation type name', () => {
        booleanDictionaryType.getTypeName().should.equal('{[key: string]: boolean}')
    })

    it('should have the correct namespaced validation type name', () => {
        booleanDictionaryType.getNamespacedTypeName().should.equal('{[key: string]: boolean}')
    })

    it('should have the correct validator name', () => {
        booleanDictionaryType.getValidatorName().should.equal('validate_booleanDictionary')
    })

    it('should have the correct namespaced validator name', () => {
        booleanDictionaryType.getNamespacedValidatorName().should.equal('Private.validate_booleanDictionary')
    })

    it('should depend on the primitive type', () => {
        booleanDictionaryType.getDependencies().should.eql([booleanType])
    })
})
