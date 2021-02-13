import {
    translateUnion,
    TTG_TranslationError,
} from "./types";
import {expect} from 'chai'

describe('TsTypeGenerator', () => {
    describe('translateUnion', () => {
        it('translate with an invalid value should return an error', () => {
            const result = translateUnion("orange")
            result.should.be.an.instanceOf(TTG_TranslationError)
            const error = <TTG_TranslationError> result
            error.message.should.equal('Type not in ["apple" | "banana" | "pear"]')
            expect(error.cause).to.be.undefined
        })

        it('translate with apple should return apple', () => {
            const result = translateUnion('apple')
            result.should.be.equal('apple')
        })

        it('translate with banana should return banana', () => {
            const result = translateUnion('banana')
            result.should.be.equal('banana')
        })

        it('translate with pear should return pear', () => {
            const result = translateUnion('pear')
            result.should.be.equal('pear')
        })
    })
})