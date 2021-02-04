import {stringType} from "../../../src";
import {join} from 'path'
import {readFileSync} from "fs";
import {TEMPLATES_DIR} from "../../../src/util/constants";
import Mustache = require("mustache");

const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_string_[0-9]+$')

const TYPE_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'PrimitiveType.ts.mustache')).toString()
const TYPE_GUARD_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'PrimitiveType.guard.ts.mustache')).toString()

describe('stringType', () => {
    it('should have the correct name', () => {
        stringType.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
    })

    it('should not be exported', () => {
        stringType.isExported().should.be.false
    })

    it('should have the correct type definition', () => {
        stringType.getTypeDefinition().should.equal(Mustache.render(TYPE_DEFINITION_TEMPLATE, {
            name: stringType.getName(),
            type: 'string',
        }))
    })

    it('should have the correct type guard definition', () => {
        stringType.getTypeGuardDefinition().should.equal(Mustache.render(TYPE_GUARD_DEFINITION_TEMPLATE, {
            name: stringType.getName(),
            type: 'string',
        }))
    })

    it('should report the correct dependencies', () => {
        stringType.getDependencies().should.eql([])
    })
})
