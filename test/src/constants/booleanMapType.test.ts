import {booleanMapType, MapType, booleanType} from "../../../src"

const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_Map_[0-9]+$')

describe('booleanMapType', () => {
    it('should be a MapType', () => {
        booleanMapType.should.be.an.instanceOf(MapType);
    })

    it('should have the correct name', () => {
        booleanMapType.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
    })

    it('should not be exported', () => {
        booleanMapType.isExported().should.be.false
    })

    it('should be an array of booleans', () => {
        booleanMapType.type.should.equal(booleanType);
    })
})
