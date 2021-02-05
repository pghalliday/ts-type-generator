import {numberDictionaryType, DictionaryType, numberType} from "../../../src"

const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_Dictionary_[0-9]+$')

describe('numberDictionaryType', () => {
    it('should be a DictionaryType', () => {
        numberDictionaryType.should.be.an.instanceOf(DictionaryType);
    })

    it('should have the correct name', () => {
        numberDictionaryType.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
    })

    it('should not be exported', () => {
        numberDictionaryType.isExported().should.be.false
    })

    it('should be an array of numbers', () => {
        numberDictionaryType.type.should.equal(numberType);
    })
})
