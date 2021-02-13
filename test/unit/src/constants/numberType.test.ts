import {numberType} from "../../../../src";
import {join} from "path";
import {TEMPLATES_DIR} from "../../../../src/util/constants";
import {readFileSync} from "fs";
import Mustache = require("mustache");

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'PrimitiveType')
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

describe('numberType', () => {
    it('should not be exported', () => {
        numberType.isExported().should.be.false
    })

    it('should have the correct type name', () => {
        numberType.getTypeName().should.equal('number')
    })

    it('should not generate type code', () => {
        numberType.getTypeCode().should.equal('')
    })

    it('should have the correct translate name', () => {
        numberType.getTranslateName().should.equal('__TTG_translate_number')
    })

    it('should generate the correct translate code', () => {
        numberType.getTranslateCode().should.equal(Mustache.render(TRANSLATE_CODE, {
            typeName: numberType.getTypeName(),
            translateName: numberType.getTranslateName(),
        }))
    })

    it('should not have dependencies', () => {
        numberType.getDependencies().should.eql([])
    })
})
