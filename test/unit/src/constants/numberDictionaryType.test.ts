import {numberDictionaryType, numberType} from "../../../../src"
import {join} from "path";
import {TEMPLATES_DIR} from "../../../../src/util/constants";
import {readFileSync} from "fs";
import Mustache = require("mustache");

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'DictionaryType')
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

describe('numberDictionaryType', () => {
    it('should not be exported', () => {
        numberDictionaryType.isExported().should.be.false
    })

    it('should have the correct type name', () => {
        numberDictionaryType.getTypeName().should.equal('{[key: string]: number}')
    })

    it('should not generate type code', () => {
        numberDictionaryType.getTypeCode().should.equal('')
    })

    it('should have the correct translate name', () => {
        numberDictionaryType.getTranslateName().should.equal('__TTG_translate_numberDictionary')
    })

    it('should generate the correct translate code', () => {
        numberDictionaryType.getTranslateCode().should.equal(Mustache.render(TRANSLATE_CODE, {
            translateName: numberDictionaryType.getTranslateName(),
            typeTranslateName: numberType.getTranslateName(),
        }))
    })

    it('should depend on the primitive type', () => {
        numberDictionaryType.getDependencies().should.eql([numberType])
    })
})
