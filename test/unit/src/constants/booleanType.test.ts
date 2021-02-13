import {booleanType} from "../../../../src";
import {join} from "path";
import {TEMPLATES_DIR} from "../../../../src/util/constants";
import {readFileSync} from "fs";
import Mustache = require("mustache");

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'PrimitiveType')
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

describe('booleanType', () => {
    it('should not be exported', () => {
        booleanType.isExported().should.be.false
    })

    it('should have the correct type name', () => {
        booleanType.getTypeName().should.equal('boolean')
    })

    it('should not generate type code', () => {
        booleanType.getTypeCode().should.equal('')
    })

    it('should have the correct translate name', () => {
        booleanType.getTranslateName().should.equal('__TTG_translate_boolean')
    })

    it('should generate the correct translate code', () => {
        booleanType.getTranslateCode().should.equal(Mustache.render(TRANSLATE_CODE, {
            typeName: booleanType.getTypeName(),
            translateName: booleanType.getTranslateName(),
        }))
    })

    it('should not have dependencies', () => {
        booleanType.getDependencies().should.eql([])
    })
})
