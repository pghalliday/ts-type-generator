import {TestType} from "../../TestType";

const NAME = 'Name'

describe('Type', function () {
    let type: TestType

    before(() => {
        type = new TestType(NAME)
    })

    it('should have the correct name', () => {
        type.getTypeName().should.equal(NAME)
    })

    it('should have the correct validator name', () => {
        type.getValidatorName().should.equal(`validate_${NAME}`)
    })

    it('should have the correct initializer name', () => {
        type.getInitializerName().should.equal(`initialize_${NAME}`)
    })

    it('should have the correct resolver name', () => {
        type.getResolverName().should.equal(`resolve_${NAME}`)
    })
});