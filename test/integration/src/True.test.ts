import {
    translateTrue,
    TTG_TranslationError,
} from "./types";
import {expect} from 'chai'

describe('TsTypeGenerator', () => {
    describe('translateTrue', () => {
        it('translate with an invalid value should return an error', () => {
            const result = translateTrue(100)
            result.should.be.an.instanceOf(TTG_TranslationError)
            const error = <TTG_TranslationError> result
            error.message.should.equal('Error encountered translating: [boolean]')
            error.cause?.should.be.an.instanceOf(TTG_TranslationError)
            const cause = <TTG_TranslationError> error.cause
            cause.message.should.equal('Not a boolean')
        })

        it('translate with an invalid boolean value should return an error', () => {
            const result = translateTrue(false)
            result.should.be.an.instanceof(TTG_TranslationError)
            const error = <TTG_TranslationError> result
            error.message.should.equal('Not [true]')
            expect(error.cause).to.be.undefined
        })

        it('translate with a valid boolean value should the value', () => {
            const result = translateTrue(true)
            result.should.be.a('boolean')
            result.should.be.true
        })
    })
})