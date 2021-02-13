import {stringDictionaryType, stringType} from "../../../../src"
import {join} from "path";
import {TEMPLATES_DIR} from "../../../../src/util/constants";
import {readFileSync} from "fs";
import Mustache = require("mustache");

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'DictionaryType')
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

describe('stringDictionaryType', () => {
    it('should not be exported', () => {
        stringDictionaryType.isExported().should.be.false
    })

    it('should have the correct type name', () => {
        stringDictionaryType.getTypeName().should.equal('{[key: string]: string}')
    })

    it('should not generate type code', () => {
        stringDictionaryType.getTypeCode().should.equal('')
    })

    it('should have the correct translate name', () => {
        stringDictionaryType.getTranslateName().should.equal('__TTG_translate_stringDictionary')
    })

    it('should generate the correct translate code', () => {
        stringDictionaryType.getTranslateCode().should.equal(Mustache.render(TRANSLATE_CODE, {
            translateName: stringDictionaryType.getTranslateName(),
            typeTranslateName: stringType.getTranslateName(),
        }))
    })

    it('should depend on the primitive type', () => {
        stringDictionaryType.getDependencies().should.eql([stringType])
    })
})
