import {numberType} from "../../../src";
import {join} from 'path'
import {readFileSync} from "fs";
import {TEMPLATES_DIR} from "../../../src/util/constants";
import Mustache = require("mustache");

const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_number_[0-9]+$')

const TYPE_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'PrimitiveType.ts.mustache')).toString()
const TYPE_GUARD_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'PrimitiveType.guard.ts.mustache')).toString()

describe('numberType', () => {
    it('should have the correct name', () => {
        numberType.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
    })

    it('should not be exported', () => {
        numberType.isExported().should.be.false
    })

    it('should have the correct type definition', () => {
        numberType.getTypeDefinition().should.equal(Mustache.render(TYPE_DEFINITION_TEMPLATE, {
            name: numberType.getName(),
            type: 'number',
        }))
    })

    it('should have the correct type guard definition', () => {
        numberType.getTypeGuardDefinition().should.equal(Mustache.render(TYPE_GUARD_DEFINITION_TEMPLATE, {
            name: numberType.getName(),
            type: 'number',
        }))
    })

    it('should report the correct dependencies', () => {
        numberType.getDependencies().should.eql([])
    })
})
