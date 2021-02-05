import {stringListType, ListType, stringType} from "../../../src"

const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_List_[0-9]+$')

describe('stringListType', () => {
    it('should be a ListType', () => {
        stringListType.should.be.an.instanceOf(ListType);
    })

    it('should have the correct name', () => {
        stringListType.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
    })

    it('should not be exported', () => {
        stringListType.isExported().should.be.false
    })

    it('should be an array of strings', () => {
        stringListType.type.should.equal(stringType);
    })
})
