import {stringMapType, MapType, stringType} from "../../../src"

const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_Map_[0-9]+$')

describe('stringMapType', () => {
    it('should be an ArrayType', () => {
        stringMapType.should.be.an.instanceOf(MapType)
    })

    it('should have the correct name', () => {
        stringMapType.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
    })

    it('should not be exported', () => {
        stringMapType.isExported().should.be.false
    })

    it('should be an array of strings', () => {
        stringMapType.type.should.equal(stringType);
    })
})
