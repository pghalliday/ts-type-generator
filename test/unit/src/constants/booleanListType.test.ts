import {booleanListType, booleanType, ListType} from "../../../../src"

describe('booleanListType', () => {
    it('should be a ListType', () => {
        booleanListType.should.be.an.instanceof(ListType)
    })

    it('should have the correct type name', () => {
        booleanListType.getTypeName().should.equal('BooleanList')
    })

    it('should have the correct dependencies', () => {
        booleanListType.getDependencies().should.eql([booleanType])
    })

    it('should not have any references', () => {
        booleanListType.getReferences().should.eql([])
    })
})
