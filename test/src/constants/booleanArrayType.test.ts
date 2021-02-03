import {booleanArrayType, ArrayType, booleanType} from "../../../src"

describe('booleanArrayType', () => {
    it('should be an ArrayType', () => {
        booleanArrayType.should.be.an.instanceOf(ArrayType);
    })

    it('should have the correct name', () => {
        booleanArrayType.name.should.equal("BooleanArrayType")
    })

    it('should be an array of booleans', () => {
        booleanArrayType.type.should.equal(booleanType);
    })
})
