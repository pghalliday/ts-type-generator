import {DictionaryType, stringDictionaryType, stringType} from "../../../../src"

describe('stringDictionaryType', () => {
    it('should be a DictionaryType', () => {
        stringDictionaryType.should.be.an.instanceof(DictionaryType)
    })

    it('should have the correct type name', () => {
        stringDictionaryType.getTypeName().should.equal('StringDictionary')
    })

    it('should have the correct dependencies', () => {
        stringDictionaryType.getDependencies().should.eql([stringType])
    })

    it('should not have any references', () => {
        stringDictionaryType.getReferences().should.eql([])
    })
})
