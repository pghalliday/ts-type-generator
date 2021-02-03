import {numberMapType, MapType, numberType} from "../../../src"

describe('numberMapType', () => {
    it('should be a MapType', () => {
        numberMapType.should.be.an.instanceOf(MapType);
    })

    it('should have the correct name', () => {
        numberMapType.name.should.equal("NumberMapType")
    })

    it('should be an array of numbers', () => {
        numberMapType.type.should.equal(numberType);
    })
})
