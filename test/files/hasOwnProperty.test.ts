import {hasOwnProperty} from "../../files/hasOwnProperty";

describe('hasOwnProperty', () => {
    it('should return true if an object has a given property', () => {
        hasOwnProperty({
            apple: 'hello',
        }, 'apple').should.be.true;
    })

    it('should return false if an object does not have a given property', () => {
        hasOwnProperty({
            apple: 'hello',
        }, 'banana').should.be.false;
    })
})