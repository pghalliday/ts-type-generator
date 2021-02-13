import {
    translateOneHundred,
    TTG_TranslationError,
} from "./types";
import {expect} from 'chai'

describe('TsTypeGenerator', () => {
    describe('translateOneHundred', () => {
        it('translate with an invalid value should return an error', () => {
            const result = translateOneHundred(true)
            result.should.be.an.instanceOf(TTG_TranslationError)
            const error = <TTG_TranslationError> result
            error.message.should.equal('Error encountered translating: [number]')
            error.cause?.should.be.an.instanceOf(TTG_TranslationError)
            const cause = <TTG_TranslationError> error.cause
            cause.message.should.equal('Not a number')
        })

        it('translate with an invalid number value should return an error', () => {
            const result = translateOneHundred(101)
            result.should.be.an.instanceof(TTG_TranslationError)
            const error = <TTG_TranslationError> result
            error.message.should.equal('Not [100]')
            expect(error.cause).to.be.undefined
        })

        it('translate with a valid number value should the value', () => {
            const result = translateOneHundred(100)
            result.should.be.a('number')
            result.should.be.equal(100)
        })
    })
})