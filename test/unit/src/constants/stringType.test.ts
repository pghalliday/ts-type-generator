import {stringType} from "../../../../src";
import {join} from "path";
import {TEMPLATES_DIR} from "../../../../src/util/constants";
import {readFileSync} from "fs";
import Mustache = require("mustache");

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'PrimitiveType')
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

describe('stringType', () => {
    it('should not be exported', () => {
        stringType.isExported().should.be.false
    })

    it('should have the correct type name', () => {
        stringType.getTypeName().should.equal('string')
    })

    it('should not generate type code', () => {
        stringType.getTypeCode().should.equal('')
    })

    it('should have the correct translate name', () => {
        stringType.getTranslateName().should.equal('__TTG_translate_string')
    })

    it('should generate the correct translate code', () => {
        stringType.getTranslateCode().should.equal(Mustache.render(TRANSLATE_CODE, {
            typeName: stringType.getTypeName(),
            translateName: stringType.getTranslateName(),
        }))
    })

    it('should report the correct dependencies', () => {
        stringType.getDependencies().should.eql([])
    })
})
