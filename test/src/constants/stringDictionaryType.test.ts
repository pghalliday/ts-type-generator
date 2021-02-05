import {stringDictionaryType, DictionaryType, stringType} from "../../../src"

const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_Dictionary_[0-9]+$')

describe('stringDictionaryType', () => {
    it('should be a DictionaryType', () => {
        stringDictionaryType.should.be.an.instanceOf(DictionaryType)
    })

    it('should have the correct name', () => {
        stringDictionaryType.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
    })

    it('should not be exported', () => {
        stringDictionaryType.isExported().should.be.false
    })

    it('should be an array of strings', () => {
        stringDictionaryType.type.should.equal(stringType);
    })
})
