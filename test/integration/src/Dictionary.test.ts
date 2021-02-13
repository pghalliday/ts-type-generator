import {
    translateDictionary,
    TTG_TranslationError,
} from "./types";
import {expect} from 'chai'

describe('TsTypeGenerator', () => {
    describe('translateDictionary', () => {
        it('translate with an invalid value should return an error', () => {
            const result = translateDictionary("orange")
            result.should.be.an.instanceOf(TTG_TranslationError)
            const error = <TTG_TranslationError> result
            error.message.should.equal('Not an object')
            expect(error.cause).to.be.undefined
        })

        it('translate with an invalid element', () => {
            const result = translateDictionary({
                apple: 99,
            })
            result.should.be.an.instanceOf(TTG_TranslationError)
            const error = <TTG_TranslationError> result
            error.message.should.equal('Error encountered translating key: [apple]')
            error.cause?.should.be.an.instanceof(TTG_TranslationError)
            const cause = <TTG_TranslationError> error.cause
            cause.message.should.equal('Type not in [false | true]')
        })

        it('translate with a valid dictionary', () => {
            const dictionary = {
                apple: true,
                banana: false,
                pear: true,
            }
            const result = translateDictionary(dictionary)
            result.should.not.equal(dictionary)
            result.should.eql(dictionary)
        })
    })
})