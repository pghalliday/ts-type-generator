import {booleanListType, booleanType} from "../../../../src"
import {join} from "path";
import {TEMPLATES_DIR} from "../../../../src/util/constants";
import {readFileSync} from "fs";
import Mustache = require("mustache");

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'ListType')
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

describe('booleanListType', () => {
    it('should not be exported', () => {
        booleanListType.isExported().should.be.false
    })

    it('should have the correct type name', () => {
        booleanListType.getTypeName().should.equal('(boolean)[]')
    })

    it('should not generate type code', () => {
        booleanListType.getTypeCode().should.equal('')
    })

    it('should have the correct translate name', () => {
        booleanListType.getTranslateName().should.equal('__TTG_translate_booleanList')
    })

    it('should generate the correct translate code', () => {
        booleanListType.getTranslateCode().should.equal(Mustache.render(TRANSLATE_CODE, {
            translateName: booleanListType.getTranslateName(),
            typeTranslateName: booleanType.getTranslateName(),
        }))
    })

    it('should depend on the primitive type', () => {
        booleanListType.getDependencies().should.eql([booleanType])
    })
})
