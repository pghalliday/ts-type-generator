import {numberType} from "../../../../src";
import {Type} from "../../../../src/util/Type";

describe('numberType', () => {
    it('should be a Type', () => {
        numberType.should.be.an.instanceof(Type)
    })

    it('should have the correct type name', () => {
        numberType.getTypeName().should.equal('NumberType')
    })

    it('should not have any dependencies', () => {
        numberType.getDependencies().should.eql([])
    })

    it('should not have any references', () => {
        numberType.getReferences().should.eql([])
    })
})
