import {UnionType} from "../../../../src"
import {join} from 'path'
import {readFileSync} from "fs";
import {TestType} from "../../TestType";
import {TEMPLATES_DIR} from "../../../../src/util/constants";
import Mustache = require("mustache");
import map from 'lodash/map'

const TYPE_NAME = 'MyUnionType'
const UNION_TYPE_NAME_1 = 'Type1'
const UNION_TYPE_NAME_2 = 'Type2'
const TYPE_1 = new TestType(UNION_TYPE_NAME_1, true)
const TYPE_2 = new TestType(UNION_TYPE_NAME_2, true)
const GENERATED_TRANSLATE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_translate_Union_[0-9]+$')

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'UnionType')
const TYPE_CODE = readFileSync(join(TEMPLATES_DIR, 'type.ts.mustache')).toString()
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

describe('UnionType', () => {
    let instance: UnionType

    describe('with name', () => {
        beforeEach(async () => {
            instance = new UnionType(TYPE_NAME)
                .type(TYPE_1)
                .type(TYPE_2)
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
                typeDef: [
                    UNION_TYPE_NAME_1,
                    UNION_TYPE_NAME_2,
                ].join(' | '),
            }))
        })

        it('should have the correct translate name', () => {
            instance.getTranslateName().should.equal(`translate${instance.getTypeName()}`)
        })

        it('should generate the correct translate code', () => {
            instance.getTranslateCode().should.equal(Mustache.render(TRANSLATE_CODE, {
                typeName: instance.getTypeName(),
                typeNames: [
                    UNION_TYPE_NAME_1,
                    UNION_TYPE_NAME_2,
                ].join(' | '),
                translateName: instance.getTranslateName(),
                typeTranslateNames: map([
                    TYPE_1,
                    TYPE_2,
                ], type => type.getTranslateName()),
            }))
        })

        it('should report the correct dependencies', () => {
            instance.getDependencies().should.eql([
                TYPE_1,
                TYPE_2
            ])
        })
    })

    describe('when anonymous', () => {
        beforeEach(async () => {
            instance = new UnionType()
                .type(TYPE_1)
                .type(TYPE_2)
        })

        it('should have the type union as its name', () => {
            instance.getTypeName().should.equal([UNION_TYPE_NAME_1, UNION_TYPE_NAME_2].join(' | '))
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
