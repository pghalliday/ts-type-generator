import {DictionaryType, numberDictionaryType, numberType} from "../../../../src"

describe('numberDictionaryType', () => {
    it('should be a DictionaryType', () => {
        numberDictionaryType.should.be.an.instanceof(DictionaryType)
    })

    it('should have the correct type name', () => {
        numberDictionaryType.getTypeName().should.equal('NumberDictionary')
    })

    it('should have the correct dependencies', () => {
        numberDictionaryType.getDependencies().should.eql([numberType])
    })

    it('should not have any references', () => {
        numberDictionaryType.getReferences().should.eql([])
    })
})
