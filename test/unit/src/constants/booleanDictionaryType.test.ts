import {booleanDictionaryType, booleanType, DictionaryType} from "../../../../src"

describe('booleanDictionaryType', () => {
    it('should be a DictionaryType', () => {
        booleanDictionaryType.should.be.an.instanceof(DictionaryType)
    })

    it('should have the correct type name', () => {
        booleanDictionaryType.getTypeName().should.equal('BooleanDictionary')
    })

    it('should have the correct dependencies', () => {
        booleanDictionaryType.getDependencies().should.eql([booleanType])
    })

    it('should not have any references', () => {
        booleanDictionaryType.getReferences().should.eql([])
    })
})
