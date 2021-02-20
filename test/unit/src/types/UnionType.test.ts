import {UnionType} from "../../../../src"
import {TestType} from "../../TestType";
import {Type} from "../../../../src/util/Type";

const NAME = 'MyUnionType'
const TYPE_1 = new TestType('Type1')
const TYPE_2 = new TestType('Type2')

describe('UnionType', () => {
    let instance: UnionType

    before(() => {
        instance = new UnionType(NAME)
            .type(TYPE_1)
            .type(TYPE_2)
    })

    it('should be a type', () => {
        instance.should.be.an.instanceof(Type)
    })

    it('should have the correct name', () => {
        instance.getTypeName().should.equal(NAME)
    })

    it('should have the correct dependencies', () => {
        instance.getDependencies().should.eql([TYPE_1, TYPE_2])
    })

    it('should have the correct references', () => {
        instance.getReferences().should.eql([])
    })
})
