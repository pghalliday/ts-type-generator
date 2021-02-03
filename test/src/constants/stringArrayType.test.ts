import {stringArrayType, ArrayType, stringType} from "../../../src"

describe('stringArrayType', () => {
    it('should be an ArrayType', () => {
        stringArrayType.should.be.an.instanceOf(ArrayType);
    })

    it('should have the correct name', () => {
        stringArrayType.name.should.equal("StringArrayType")
    })

    it('should be an array of strings', () => {
        stringArrayType.type.should.equal(stringType);
    })
})
