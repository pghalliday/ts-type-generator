import {booleanListType, ListType, booleanType} from "../../../src"

const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_List_[0-9]+$')

describe('booleanListType', () => {
    it('should be a ListType', () => {
        booleanListType.should.be.an.instanceOf(ListType);
    })

    it('should have the correct name', () => {
        booleanListType.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
    })

    it('should not be exported', () => {
        booleanListType.isExported().should.be.false
    })

    it('should be an array of booleans', () => {
        booleanListType.type.should.equal(booleanType);
    })
})
