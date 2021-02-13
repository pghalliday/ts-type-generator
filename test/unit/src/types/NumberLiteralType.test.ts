import {NumberLiteralType, numberType} from "../../../../src"
import {join} from 'path'
import {readFileSync} from "fs";
import {TEMPLATES_DIR} from "../../../../src/util/constants";
import Mustache = require("mustache");

const TYPE_NAME = 'MyNumberLiteralType'
const GENERATED_TRANSLATE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_translate_numberLiteral_[0-9]+$')
const VALUE = 100

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'PrimitiveLiteralType')
const TYPE_CODE = readFileSync(join(TEMPLATES_DIR, 'type.ts.mustache')).toString()
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

describe('NumberLiteralType', () => {
    let instance: NumberLiteralType

    describe('with name', () => {
        beforeEach(async () => {
            instance = new NumberLiteralType(VALUE, TYPE_NAME)
        })

        it('should be exported', () => {
            instance.isExported().should.be.true
        })

        it('should have the correct type name', () => {
            instance.getTypeName().should.equal(TYPE_NAME)
        })

        it('should generate the correct type code', () => {
            instance.getTypeCode().should.equal(Mustache.render(TYPE_CODE, {
                typeName: instance.getTypeName(),
                typeDef: JSON.stringify(VALUE),
            }))
        })

        it('should have the correct translate name', () => {
            instance.getTranslateName().should.equal(`translate${instance.getTypeName()}`)
        })

        it('should generate the correct translate code', () => {
            instance.getTranslateCode().should.equal(Mustache.render(TRANSLATE_CODE, {
                typeName: instance.getTypeName(),
                translateName: instance.getTranslateName(),
                value: JSON.stringify(VALUE),
                valueTypeName: 'number',
                valueTranslateName: '__TTG_translate_number',
            }))
        })

        it('should depend on the primitive type', () => {
            instance.getDependencies().should.eql([numberType])
        })
    })

    describe('when anonymous', () => {
        beforeEach(async () => {
            instance = new NumberLiteralType(VALUE)
        })

        it('should have the value as its name', () => {
            instance.getTypeName().should.equal(JSON.stringify(VALUE))
        })

        it('should not generate type code', () => {
            instance.getTypeCode().should.equal('')
        })

        it('should have a generated translate name', () => {
            instance.getTranslateName().should.match(GENERATED_TRANSLATE_NAME_REGEXP)
        })

        it('should not be exported', () => {
            instance.isExported().should.be.false
        })
    })
})
