import {
    translateList,
    TTG_TranslationError,
} from "./types";
import {expect} from 'chai'

describe('TsTypeGenerator', () => {
    describe('translateList', () => {
        it('translate with an invalid value should return an error', () => {
            const result = translateList("orange")
            result.should.be.an.instanceOf(TTG_TranslationError)
            const error = <TTG_TranslationError> result
            error.message.should.equal('Not a list')
            expect(error.cause).to.be.undefined
        })

        it('translate with an invalid element', () => {
            const result = translateList([99])
            result.should.be.an.instanceOf(TTG_TranslationError)
            const error = <TTG_TranslationError> result
            error.message.should.equal('Error encountered translating index: [0]')
            error.cause?.should.be.an.instanceof(TTG_TranslationError)
            const cause = <TTG_TranslationError> error.cause
            cause.message.should.equal('Type not in [100 | 101 | 102]')
        })

        it('translate with a valid list', () => {
            const list = [
                101,
                102,
                100,
                101,
                102,
            ]
            const result = translateList(list)
            result.should.not.equal(list)
            result.should.eql(list)
        })
    })
})