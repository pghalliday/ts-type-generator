import {ArrayType} from "../../../src"
import {join} from 'path'
import {readFileSync} from "fs";
import {TestType} from "../../TestType";
import {TEMPLATES_DIR} from "../../../src/util/constants";
import Mustache = require("mustache");

const TYPE_NAME = 'MyArrayType'
const ARRAY_TYPE_NAME = 'Type'
const TYPE = new TestType(ARRAY_TYPE_NAME, true)

const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_Array_[0-9]+$')

const TYPE_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'ArrayType.ts.mustache')).toString()
const TYPE_GUARD_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'ArrayType.guard.ts.mustache')).toString()

describe('ArrayType', () => {
    let instance: ArrayType

    describe('with name', () => {
        beforeEach(async () => {
            instance = new ArrayType(TYPE, TYPE_NAME)
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
                type: ARRAY_TYPE_NAME,
            }))
        })

        it('should have the correct type guard definition', () => {
            instance.getTypeGuardDefinition().should.equal(Mustache.render(TYPE_GUARD_DEFINITION_TEMPLATE, {
                name: TYPE_NAME,
                type: ARRAY_TYPE_NAME,
            }))
        })

        it('should report the correct dependencies', () => {
            instance.getDependencies().should.eql([TYPE])
        })
    })

    describe('when anonymous', () => {
        beforeEach(async () => {
            instance = new ArrayType(TYPE)
        })

        it('should have a generated name', () => {
            instance.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
        })

        it('should not be exported', () => {
            instance.isExported().should.be.false
        })
    })
})
