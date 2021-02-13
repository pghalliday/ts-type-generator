import {DictionaryType} from "../../../../src"
import {join} from 'path'
import {readFileSync} from "fs";
import {TestType} from "../../TestType";
import {TEMPLATES_DIR} from "../../../../src/util/constants";
import Mustache = require("mustache");

const TYPE_NAME = 'MyDictionaryType'
const MAP_TYPE_NAME = 'Type'
const TYPE = new TestType(MAP_TYPE_NAME, true)
const GENERATED_TRANSLATE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_translate_Dictionary_[0-9]+$')

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'DictionaryType')
const TYPE_CODE = readFileSync(join(TEMPLATES_DIR, 'type.ts.mustache')).toString()
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

describe('DictionaryType', () => {
    let instance: DictionaryType

    describe('with name', () => {
        beforeEach(async () => {
            instance = new DictionaryType(TYPE, TYPE_NAME)
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
                typeDef: `{[key: string]: ${TYPE.getTypeName()}}`,
            }))
        })

        it('should have the correct translate name', () => {
            instance.getTranslateName().should.equal(`translate${instance.getTypeName()}`)
        })

        it('should generate the correct translate code', () => {
            instance.getTranslateCode().should.equal(Mustache.render(TRANSLATE_CODE, {
                translateName: instance.getTranslateName(),
                typeTranslateName: TYPE.getTranslateName(),
            }))
        })

        it('should report the correct imports', () => {
            instance.getDependencies().should.eql([TYPE])
        })
    })

    describe('when anonymous', () => {
        beforeEach(async () => {
            instance = new DictionaryType(TYPE)
        })

        it('should use the type def as the name', () => {
            instance.getTypeName().should.equal(`{[key: string]: ${TYPE.getTypeName()}}`)
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
