import {InterfaceType} from "../../../../src"
import {join} from 'path'
import {readFileSync} from "fs";
import {TestType} from "../../TestType";
import Mustache = require("mustache");
import {TEMPLATES_DIR} from "../../../../src/util/constants";

const TYPE_NAME = 'MyInterfaceType'
const PROPERTY_1 = 'property1'
const PROPERTY_TYPE_1 = 'Type1'
const TYPE_1 = new TestType(PROPERTY_TYPE_1, true)
const PROPERTY_2 = 'property2'
const PROPERTY_TYPE_2 = 'Type2'
const TYPE_2 = new TestType(PROPERTY_TYPE_2, true)
const GENERATED_TRANSLATE_NAME_REGEXP = new RegExp('^__TTG_Anonymous_translate_Interface_[0-9]+$')

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'InterfaceType')
const TYPE_CODE = readFileSync(join(TEMPLATES_DIR, 'type.ts.mustache')).toString()
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

describe('InterfaceType', () => {
    let instance: InterfaceType

    beforeEach(async () => {
        instance = new InterfaceType(TYPE_NAME)
            .property(PROPERTY_1, TYPE_1)
            .property(PROPERTY_2, TYPE_2)
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
            typeDef: `{
    ${PROPERTY_1}: ${TYPE_1.getTypeName()},
    ${PROPERTY_2}: ${TYPE_2.getTypeName()},
}`,
        }))
    })

    it('should have the correct translate name', () => {
        instance.getTranslateName().should.equal(`translate${instance.getTypeName()}`)
    })

    it('should generate the correct translate code', () => {
        instance.getTranslateCode().should.equal(Mustache.render(TRANSLATE_CODE, {
            typeName: instance.getTypeName(),
            translateName: instance.getTranslateName(),
            properties: [{
                propertyName: PROPERTY_1,
                propertyTranslateName: TYPE_1.getTranslateName(),
            }, {
                propertyName: PROPERTY_2,
                propertyTranslateName: TYPE_2.getTranslateName(),
            }]
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
                .property(PROPERTY_1, TYPE_1)
                .property(PROPERTY_2, TYPE_2)
        })

        it('should use the type def for the type name', () => {
            instance.getTypeName().should.equal(`{
    ${PROPERTY_1}: ${TYPE_1.getTypeName()},
    ${PROPERTY_2}: ${TYPE_2.getTypeName()},
}`)
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
