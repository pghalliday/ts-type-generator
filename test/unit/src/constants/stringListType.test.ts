import {ListType, stringListType, stringType} from "../../../../src"

describe('stringListType', () => {
    it('should be a ListType', () => {
        stringListType.should.be.an.instanceof(ListType)
    })

    it('should have the correct type name', () => {
        stringListType.getTypeName().should.equal('StringList')
    })

    it('should have the correct dependencies', () => {
        stringListType.getDependencies().should.eql([stringType])
    })

    it('should not have any references', () => {
        stringListType.getReferences().should.eql([])
    })
})
