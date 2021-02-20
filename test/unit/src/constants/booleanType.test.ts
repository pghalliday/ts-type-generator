import {booleanType} from "../../../../src";
import {Type} from "../../../../src/util/Type";

describe('booleanType', () => {
    it('should be a Type', () => {
        booleanType.should.be.an.instanceof(Type)
    })

    it('should have the correct type name', () => {
        booleanType.getTypeName().should.equal('BooleanType')
    })

    it('should not have any dependencies', () => {
        booleanType.getDependencies().should.eql([])
    })

    it('should not have any references', () => {
        booleanType.getReferences().should.eql([])
    })
})
