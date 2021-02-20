import {ReferenceType} from "../../../../src"
import {TestType} from "../../TestType";
import {Type} from "../../../../src/util/Type";

const NAME = 'MyReferenceType'
const TYPE = new TestType('Type')

describe('ReferenceType', () => {
    let instance: ReferenceType

    before(() => {
        instance = new ReferenceType(NAME, TYPE)
    })

    it('should be a type', () => {
        instance.should.be.an.instanceof(Type)
    })

    it('should have the correct name', () => {
        instance.getTypeName().should.equal(NAME)
    })

    it('should have the correct dependencies', () => {
        instance.getDependencies().should.eql([TYPE])
    })

    it('should have the correct references', () => {
        instance.getReferences().should.eql([{
            name: NAME,
            type: TYPE.getTypeName(),
            initializer: TYPE.getInitializerName(),
            resolver: TYPE.getResolverName(),
        }])
    })
})
