import {booleanType} from "../../../src";
import {join} from 'path'
import {readFileSync} from "fs";
import {TEMPLATES_DIR} from "../../../src/util/constants";
import Mustache = require("mustache");

const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_boolean_[0-9]+$')

const TYPE_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'PrimitiveType.ts.mustache')).toString()
const TYPE_GUARD_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'PrimitiveType.guard.ts.mustache')).toString()

describe('booleanType', () => {
    it('should have the correct name', () => {
        booleanType.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
    })

    it('should not be exported', () => {
        booleanType.isExported().should.be.false
    })

    it('should have the correct type definition', () => {
        booleanType.getTypeDefinition().should.equal(Mustache.render(TYPE_DEFINITION_TEMPLATE, {
            name: booleanType.getName(),
            type: 'boolean',
        }))
    })

    it('should have the correct type guard definition', () => {
        booleanType.getTypeGuardDefinition().should.equal(Mustache.render(TYPE_GUARD_DEFINITION_TEMPLATE, {
            name: booleanType.getName(),
            type: 'boolean',
        }))
    })

    it('should report the correct dependencies', () => {
        booleanType.getDependencies().should.eql([])
    })
})
