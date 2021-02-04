import {numberMapType, MapType, numberType} from "../../../src"

const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_Map_[0-9]+$')

describe('numberMapType', () => {
    it('should be a MapType', () => {
        numberMapType.should.be.an.instanceOf(MapType);
    })

    it('should have the correct name', () => {
        numberMapType.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
    })

    it('should not be exported', () => {
        numberMapType.isExported().should.be.false
    })

    it('should be an array of numbers', () => {
        numberMapType.type.should.equal(numberType);
    })
})
