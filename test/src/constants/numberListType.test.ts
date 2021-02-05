import {numberListType, ListType, numberType} from "../../../src"

const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_List_[0-9]+$')

describe('numberListType', () => {
    it('should be a ListType', () => {
        numberListType.should.be.an.instanceOf(ListType);
    })

    it('should have the correct name', () => {
        numberListType.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
    })

    it('should not be exported', () => {
        numberListType.isExported().should.be.false
    })

    it('should be an array of numbers', () => {
        numberListType.type.should.equal(numberType);
    })
})
