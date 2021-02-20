import {LiteralType} from "../../../../src"
import {Type} from "../../../../src/util/Type";

const NAME = 'MyBooleanLiteralType'
const VALUE = false

describe('BooleanLiteralType', () => {
    let instance: LiteralType<boolean>

    before(() => {
        instance = new LiteralType<boolean>(NAME, VALUE)
    })

    it('should be a type', () => {
        instance.should.be.an.instanceof(Type)
    })

    it('should have the correct name', () => {
        instance.getTypeName().should.equal(NAME)
    })

    it('should not have any dependencies', () => {
        instance.getDependencies().should.eql([])
    })

    it('should not have any references', () => {
        instance.getReferences().should.eql([])
    })
})
