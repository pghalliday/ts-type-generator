import {isMapOf} from "../../files/isMapOf";
import {isStringType} from "../../files/StringType";

describe('isMapOf', () => {
    it('should return true if an object is a map of the given type', () => {
        isMapOf({
            apple: 'apple',
            banana: 'banana',
        }, isStringType).should.be.true
    })

    it('should return false any field is not of the given type', () => {
        isMapOf({
            apple: 'apple',
            banana: 100,
        }, isStringType).should.be.false
    })
})