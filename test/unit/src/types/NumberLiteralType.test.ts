import {LiteralType} from "../../../../src"
import {Type} from "../../../../src/util/Type";

const NAME = 'MyNumberLiteralType'
const VALUE = 100

describe('NumberLiteralType', () => {
    let instance: LiteralType<number>

    before(() => {
        instance = new LiteralType<number>(NAME, VALUE)
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
