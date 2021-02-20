import {ListType, numberListType, numberType} from "../../../../src"

describe('numberListType', () => {
    it('should be a ListType', () => {
        numberListType.should.be.an.instanceof(ListType)
    })

    it('should have the correct type name', () => {
        numberListType.getTypeName().should.equal('NumberList')
    })

    it('should have the correct dependencies', () => {
        numberListType.getDependencies().should.eql([numberType])
    })

    it('should not have any references', () => {
        numberListType.getReferences().should.eql([])
    })
})
