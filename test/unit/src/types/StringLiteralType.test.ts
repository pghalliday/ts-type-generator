import {StringLiteralType, stringType} from "../../../../src"
import {join} from 'path'
import {readFileSync} from "fs";
import {TEMPLATES_DIR} from "../../../../src/util/constants";
import Mustache = require("mustache");

const TYPE_NAME = 'MyStringLiteralType'
const GENERATED_TRANSLATE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_translate_stringLiteral_[0-9]+$')
const VALUE = "hello"

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'PrimitiveLiteralType')
const TYPE_CODE = readFileSync(join(TEMPLATES_DIR, 'type.ts.mustache')).toString()
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

describe('StringLiteralType', () => {
    let instance: StringLiteralType

    describe('with name', () => {
        beforeEach(async () => {
            instance = new StringLiteralType(VALUE, TYPE_NAME)
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
                valueTypeName: 'string',
                valueTranslateName: '__TTG_translate_string',
            }))
        })

        it('should depend on the primitive type', () => {
            instance.getDependencies().should.eql([stringType])
        })
    })

    describe('when anonymous', () => {
        beforeEach(async () => {
            instance = new StringLiteralType(VALUE)
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
