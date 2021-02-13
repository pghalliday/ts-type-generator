import {booleanDictionaryType, booleanType} from "../../../../src"
import {join} from "path";
import {TEMPLATES_DIR} from "../../../../src/util/constants";
import {readFileSync} from "fs";
import Mustache = require("mustache");

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'DictionaryType')
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

describe('booleanDictionaryType', () => {
    it('should not be exported', () => {
        booleanDictionaryType.isExported().should.be.false
    })

    it('should have the correct type name', () => {
        booleanDictionaryType.getTypeName().should.equal('{[key: string]: boolean}')
    })

    it('should not generate type code', () => {
        booleanDictionaryType.getTypeCode().should.equal('')
    })

    it('should have the correct translate name', () => {
        booleanDictionaryType.getTranslateName().should.equal('__TTG_translate_booleanDictionary')
    })

    it('should generate the correct translate code', () => {
        booleanDictionaryType.getTranslateCode().should.equal(Mustache.render(TRANSLATE_CODE, {
            translateName: booleanDictionaryType.getTranslateName(),
            typeTranslateName: booleanType.getTranslateName(),
        }))
    })

    it('should depend on the primitive type', () => {
        booleanDictionaryType.getDependencies().should.eql([booleanType])
    })
})
