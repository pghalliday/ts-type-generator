import {stringListType, stringType} from "../../../../src"
import {join} from "path";
import {TEMPLATES_DIR} from "../../../../src/util/constants";
import {readFileSync} from "fs";
import Mustache = require("mustache");

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'ListType')
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

describe('stringListType', () => {
    it('should not be exported', () => {
        stringListType.isExported().should.be.false
    })

    it('should have the correct type name', () => {
        stringListType.getTypeName().should.equal('(string)[]')
    })

    it('should not generate type code', () => {
        stringListType.getTypeCode().should.equal('')
    })

    it('should have the correct translate name', () => {
        stringListType.getTranslateName().should.equal('__TTG_translate_stringList')
    })

    it('should generate the correct translate code', () => {
        stringListType.getTranslateCode().should.equal(Mustache.render(TRANSLATE_CODE, {
            translateName: stringListType.getTranslateName(),
            typeTranslateName: stringType.getTranslateName(),
        }))
    })

    it('should depend on the primitive type', () => {
        stringListType.getDependencies().should.eql([stringType])
    })
})
