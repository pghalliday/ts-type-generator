import {numberArrayType, ArrayType, numberType} from "../../../src"

describe('numberArrayType', () => {
    it('should be an ArrayType', () => {
        numberArrayType.should.be.an.instanceOf(ArrayType);
    })

    it('should have the correct name', () => {
        numberArrayType.name.should.equal("NumberArrayType")
    })

    it('should be an array of numbers', () => {
        numberArrayType.type.should.equal(numberType);
    })
})
