import {booleanDictionaryType, DictionaryType, booleanType} from "../../../src"

const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_Dictionary_[0-9]+$')

describe('booleanDictionaryType', () => {
    it('should be a DictionaryType', () => {
        booleanDictionaryType.should.be.an.instanceOf(DictionaryType);
    })

    it('should have the correct name', () => {
        booleanDictionaryType.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
    })

    it('should not be exported', () => {
        booleanDictionaryType.isExported().should.be.false
    })

    it('should be an array of booleans', () => {
        booleanDictionaryType.type.should.equal(booleanType);
    })
})
