import {
    translateHello,
    TTG_TranslationError,
} from "./types";
import {expect} from 'chai'

describe('TsTypeGenerator', () => {
    describe('translateHello', () => {
        it('translate with an invalid value should return an error', () => {
            const result = translateHello(100)
            result.should.be.an.instanceOf(TTG_TranslationError)
            const error = <TTG_TranslationError> result
            error.message.should.equal('Error encountered translating: [string]')
            error.cause?.should.be.an.instanceOf(TTG_TranslationError)
            const cause = <TTG_TranslationError> error.cause
            cause.message.should.equal('Not a string')
        })

        it('translate with an invalid string value should return an error', () => {
            const result = translateHello('banana')
            result.should.be.an.instanceof(TTG_TranslationError)
            const error = <TTG_TranslationError> result
            error.message.should.equal('Not ["Hello"]')
            expect(error.cause).to.be.undefined
        })

        it('translate with a valid number value should the value', () => {
            const result = translateHello('Hello')
            result.should.be.a('string')
            result.should.be.equal('Hello')
        })
    })
})