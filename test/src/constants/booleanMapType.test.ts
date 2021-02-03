import {booleanMapType, MapType, booleanType} from "../../../src"

describe('booleanMapType', () => {
    it('should be a MapType', () => {
        booleanMapType.should.be.an.instanceOf(MapType);
    })

    it('should have the correct name', () => {
        booleanMapType.name.should.equal("BooleanMapType")
    })

    it('should be an array of booleans', () => {
        booleanMapType.type.should.equal(booleanType);
    })
})
