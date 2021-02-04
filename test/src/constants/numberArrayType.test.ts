import {numberArrayType, ArrayType, numberType} from "../../../src"

const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_Array_[0-9]+$')

describe('numberArrayType', () => {
    it('should be an ArrayType', () => {
        numberArrayType.should.be.an.instanceOf(ArrayType);
    })

    it('should have the correct name', () => {
        numberArrayType.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
    })

    it('should not be exported', () => {
        numberArrayType.isExported().should.be.false
    })

    it('should be an array of numbers', () => {
        numberArrayType.type.should.equal(numberType);
    })
})
