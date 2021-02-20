import {StructType} from "../../../../src"
import {TestType} from "../../TestType";
import {Type} from "../../../../src/util/Type";

const NAME = 'MyInterfaceType'
const PROPERTY_1 = 'property1'
const TYPE_1 = new TestType('Type1')
const PROPERTY_2 = 'property2'
const TYPE_2 = new TestType('Type2')

describe('StructType', () => {
    let instance: StructType

    before(() => {
        instance = new StructType(NAME)
            .property(PROPERTY_1, TYPE_1)
            .property(PROPERTY_2, TYPE_2)
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
