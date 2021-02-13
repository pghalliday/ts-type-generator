import {TsTypeGenerator} from "../../../src"
import {join} from 'path'
import {TestType} from "../TestType";
import {readFileSync} from "fs";
import {FILES_DIR} from "../../../src/util/constants";

const COMMON_CODE = readFileSync(join(FILES_DIR, 'common.ts')).toString()
const EXPORT_PREFIX = 'export '

const TYPE_1 = new TestType('Type1', true)
const TYPE_2 = new TestType('Type2', true)
const TYPE_3 = new TestType('Type3', false)
const TYPE_4 = new TestType('Type4', false)
const TYPE_5 = new TestType('Type5', false)
const TYPE_6 = new TestType('Type6', false)
const TYPE_6_AGAIN = new TestType('Type6', false)
TYPE_1
    .type(TYPE_3)
    .type(TYPE_4)
TYPE_2
    .type(TYPE_3)
    .type(TYPE_4)
TYPE_3
    .type(TYPE_5)
TYPE_4
    .type(TYPE_6)

const EXPECTED_SOURCE_CODE =
    EXPORT_PREFIX + TYPE_1.getTypeCode() +
    EXPORT_PREFIX + TYPE_1.getTranslateCode() +
    EXPORT_PREFIX + TYPE_2.getTypeCode() +
    EXPORT_PREFIX + TYPE_2.getTranslateCode() +
    TYPE_3.getTypeCode() +
    TYPE_3.getTranslateCode() +
    TYPE_4.getTypeCode() +
    TYPE_4.getTranslateCode() +
    TYPE_5.getTypeCode() +
    TYPE_5.getTranslateCode() +
    TYPE_6.getTypeCode() +
    TYPE_6.getTranslateCode() +
    COMMON_CODE

describe('TsTypeGenerator', () => {
    let instance: TsTypeGenerator

    beforeEach(async () => {
        instance = new TsTypeGenerator()
    })

    describe('#generate', () => {
        describe('with a redefined type', () => {
            it('should throw an error', () => {
                (() => {
                    instance.type(TYPE_1)
                    instance.type(TYPE_2)
                    instance.type(TYPE_6_AGAIN)
                    instance.generate()
                }).should.throw('Type: [Type6] has been redefined')
            })
        })

        describe('with a correct list of types', () => {
            let code: string

            beforeEach(async () => {
                instance.type(TYPE_1)
                instance.type(TYPE_2)
                code = instance.generate()
            })

            it('should generate the types source code', () => {
                code.should.equal(EXPECTED_SOURCE_CODE)
            })
        })
    })
})
