import {stringMapType, MapType, stringType} from "../../../src"

describe('stringMapType', () => {
    it('should be an ArrayType', () => {
        stringMapType.should.be.an.instanceOf(MapType)
    })

    it('should have the correct name', () => {
        stringMapType.name.should.equal("StringMapType")
    })

    it('should be an array of strings', () => {
        stringMapType.type.should.equal(stringType);
    })
})
