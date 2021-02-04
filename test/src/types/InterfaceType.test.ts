import {InterfaceType} from "../../../src"
import {join} from 'path'
import {readFileSync} from "fs";
import {TestType} from "../../TestType";
import Mustache = require("mustache");
import {TEMPLATES_DIR} from "../../../src/util/constants";

const TYPE_NAME = 'MyInterfaceType'
const PROPERTY_1 = 'property1'
const PROPERTY_TYPE_1 = 'Type1'
const TYPE_1 = new TestType(PROPERTY_TYPE_1, true)
const PROPERTY_2 = 'property2'
const PROPERTY_TYPE_2 = 'Type2'
const TYPE_2 = new TestType(PROPERTY_TYPE_2, true)
const GENERATED_TYPE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_Interface_[0-9]+$')

const TYPE_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'InterfaceType.ts.mustache')).toString()
const TYPE_GUARD_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'InterfaceType.guard.ts.mustache')).toString()

describe('InterfaceType', () => {
    let instance: InterfaceType

    beforeEach(async () => {
        instance = new InterfaceType(TYPE_NAME)
            .property(PROPERTY_1, TYPE_1)
            .property(PROPERTY_2, TYPE_2)
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
            properties: [{
                name: PROPERTY_1,
                type: PROPERTY_TYPE_1,
            }, {
                name: PROPERTY_2,
                type: PROPERTY_TYPE_2,
            }],
        }))
    })

    it('should have the correct type guard definition', () => {
        instance.getTypeGuardDefinition().should.equal(Mustache.render(TYPE_GUARD_DEFINITION_TEMPLATE, {
            name: TYPE_NAME,
            properties: [{
                name: PROPERTY_1,
                type: PROPERTY_TYPE_1,
            }, {
                name: PROPERTY_2,
                type: PROPERTY_TYPE_2,
            }],
        }))
    })

    it('should report the correct dependencies', () => {
        instance.getDependencies().should.eql([
            TYPE_1,
            TYPE_2
        ])
    })

    describe('when anonymous', () => {
        beforeEach(async () => {
            instance = new InterfaceType()
        })

        it('should have a generated name', () => {
            instance.getName().should.match(GENERATED_TYPE_NAME_REGEXP)
        })

        it('should not be exported', () => {
            instance.isExported().should.be.false
        })
    })
})
