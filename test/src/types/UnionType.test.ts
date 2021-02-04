import {UnionType} from "../../../src"
import {join} from 'path'
import {readFileSync} from "fs";
import {TestType} from "../../TestType";
import {TEMPLATES_DIR} from "../../../src/util/constants";
import Mustache = require("mustache");

const TYPE_NAME = 'MyUnionType'
const UNION_TYPE_NAME_1 = 'Type1'
const UNION_TYPE_NAME_2 = 'Type2'
const TYPE_1 = new TestType(UNION_TYPE_NAME_1, true)
const TYPE_2 = new TestType(UNION_TYPE_NAME_2, true)
const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_Union_[0-9]+$')

const TYPE_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'UnionType.ts.mustache')).toString()
const TYPE_GUARD_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'UnionType.guard.ts.mustache')).toString()

describe('UnionType', () => {
    let instance: UnionType

    describe('with name', () => {
        beforeEach(async () => {
            instance = new UnionType(TYPE_NAME)
                .type(TYPE_1)
                .type(TYPE_2)
        })

        it('should have the correct name', () => {
            instance.getName().should.equal(TYPE_NAME)
        })

        it('should be exported', () => {
            instance.isExported().should.be.true
        })

        it('should have the correct type definition', () => {
            instance.getTypeDefinition().should.equal(Mustache.render(TYPE_DEFINITION_TEMPLATE, {
                name: TYPE_NAME,
                types: [
                    UNION_TYPE_NAME_1,
                    UNION_TYPE_NAME_2,
                ].join(' | '),
            }))
        })

        it('should have the correct type guard definition', () => {
            instance.getTypeGuardDefinition().should.equal(Mustache.render(TYPE_GUARD_DEFINITION_TEMPLATE, {
                name: TYPE_NAME,
                types: [
                    TYPE_1,
                    TYPE_2,
                ],
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
        })

        it('should have a generated name', () => {
            instance.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
        })

        it('should not be exported', () => {
            instance.isExported().should.be.false
        })
    })
})
