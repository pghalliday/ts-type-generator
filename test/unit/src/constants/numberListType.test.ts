import {numberListType, numberType} from "../../../../src"
import {join} from "path";
import {TEMPLATES_DIR} from "../../../../src/util/constants";
import {readFileSync} from "fs";
import Mustache = require("mustache");

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'ListType')
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

describe('numberListType', () => {
    it('should not be exported', () => {
        numberListType.isExported().should.be.false
    })

    it('should have the correct type name', () => {
        numberListType.getTypeName().should.equal('(number)[]')
    })

    it('should not generate type code', () => {
        numberListType.getTypeCode().should.equal('')
    })

    it('should have the correct translate name', () => {
        numberListType.getTranslateName().should.equal('__TTG_translate_numberList')
    })

    it('should generate the correct translate code', () => {
        numberListType.getTranslateCode().should.equal(Mustache.render(TRANSLATE_CODE, {
            translateName: numberListType.getTranslateName(),
            typeTranslateName: numberType.getTranslateName(),
        }))
    })

    it('should depend on the primitive type', () => {
        numberListType.getDependencies().should.eql([numberType])
    })
})
