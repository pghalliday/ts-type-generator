import {stringArrayType, ArrayType, stringType} from "../../../src"

const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_Array_[0-9]+$')

describe('stringArrayType', () => {
    it('should be an ArrayType', () => {
        stringArrayType.should.be.an.instanceOf(ArrayType);
    })

    it('should have the correct name', () => {
        stringArrayType.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
    })

    it('should not be exported', () => {
        stringArrayType.isExported().should.be.false
    })

    it('should be an array of strings', () => {
        stringArrayType.type.should.equal(stringType);
    })
})
