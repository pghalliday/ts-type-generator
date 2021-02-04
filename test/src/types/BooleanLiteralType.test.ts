import {BooleanLiteralType} from "../../../src"
import {join} from 'path'
import {readFileSync} from "fs";
import {TEMPLATES_DIR} from "../../../src/util/constants";
import Mustache = require("mustache");

const TYPE_NAME = 'MyBooleanLiteralType'
const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_booleanLiteral_[0-9]+$')
const VALUE = false

const TYPE_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'PrimitiveLiteralType.ts.mustache')).toString()
const TYPE_GUARD_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'PrimitiveLiteralType.guard.ts.mustache')).toString()

describe('BooleanLiteralType', () => {
    let instance: BooleanLiteralType

    describe('with name', () => {
        beforeEach(async () => {
            instance = new BooleanLiteralType(VALUE, TYPE_NAME)
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
                value: JSON.stringify(VALUE),
                type: 'boolean',
            }))
        })

        it('should have the correct type guard definition', () => {
            instance.getTypeGuardDefinition().should.equal(Mustache.render(TYPE_GUARD_DEFINITION_TEMPLATE, {
                name: TYPE_NAME,
                value: JSON.stringify(VALUE),
                type: 'boolean',
            }))
        })

        it('should report the correct dependencies', () => {
            instance.getDependencies().should.eql([])
        })
    })

    describe('when anonymous', () => {
        beforeEach(async () => {
            instance = new BooleanLiteralType(VALUE)
        })

        it('should have a generated name', () => {
            instance.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
        })

        it('should not be exported', () => {
            instance.isExported().should.be.false
        })
    })
})
