import {booleanArrayType, ArrayType, booleanType} from "../../../src"

const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_Array_[0-9]+$')

describe('booleanArrayType', () => {
    it('should be an ArrayType', () => {
        booleanArrayType.should.be.an.instanceOf(ArrayType);
    })

    it('should have the correct name', () => {
        booleanArrayType.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
    })

    it('should not be exported', () => {
        booleanArrayType.isExported().should.be.false
    })

    it('should be an array of booleans', () => {
        booleanArrayType.type.should.equal(booleanType);
    })
})
