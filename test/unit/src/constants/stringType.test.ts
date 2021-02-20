import {stringType} from "../../../../src";
import {Type} from "../../../../src/util/Type";

describe('stringType', () => {
    it('should be a Type', () => {
        stringType.should.be.an.instanceof(Type)
    })

    it('should have the correct type name', () => {
        stringType.getTypeName().should.equal('StringType')
    })

    it('should not have any dependencies', () => {
        stringType.getDependencies().should.eql([])
    })

    it('should not have any references', () => {
        stringType.getReferences().should.eql([])
    })
})
