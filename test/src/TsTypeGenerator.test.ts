import {TsTypeGenerator} from "../../src"
import {promisify} from 'util'
import rimraf from 'rimraf'
import {join} from 'path'
import {TestType} from "../TestType";
import {readFileSync} from "fs";
import {FILES_DIR} from "../../src/util/constants";

const p_rimraf = promisify(rimraf)

const OUTPUT_DIRECTORY = 'temp'
const TYPES_FILE_NAME = 'types.ts'
const OUTPUT_FILE = join(OUTPUT_DIRECTORY, TYPES_FILE_NAME)

const HAS_OWN_PROPERTY_DEFINITION = readFileSync(join(FILES_DIR, 'hasOwnProperty.ts')).toString()
const IS_DICTIONARY_OF_DEFINITION = readFileSync(join(FILES_DIR, 'isDictionaryOf.ts')).toString()
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

const EXPECTED_OUTPUT_FILE_CONTENT =
    EXPORT_PREFIX + TYPE_1.getTypeDefinition() +
    EXPORT_PREFIX + TYPE_1.getTypeGuardDefinition() +
    EXPORT_PREFIX + TYPE_2.getTypeDefinition() +
    EXPORT_PREFIX + TYPE_2.getTypeGuardDefinition() +
    TYPE_3.getTypeDefinition() +
    TYPE_3.getTypeGuardDefinition() +
    TYPE_4.getTypeDefinition() +
    TYPE_4.getTypeGuardDefinition() +
    TYPE_5.getTypeDefinition() +
    TYPE_5.getTypeGuardDefinition() +
    TYPE_6.getTypeDefinition() +
    TYPE_6.getTypeGuardDefinition() +
    HAS_OWN_PROPERTY_DEFINITION +
    IS_DICTIONARY_OF_DEFINITION

describe('TsTypeGenerator', () => {
    let instance: TsTypeGenerator

    beforeEach(async () => {
        await p_rimraf(OUTPUT_DIRECTORY)
        instance = new TsTypeGenerator()
    })

    describe('#generate', () => {
        describe('with a redefined type', () => {
            it('should throw an error', () => {
                instance.type(TYPE_1)
                instance.type(TYPE_2)
                instance.type(TYPE_6_AGAIN)
                return instance.generate(OUTPUT_FILE)
                    .should.eventually.be.rejectedWith(
                        'Type: [Type6] has been redefined'
                    )
            })
        })

        describe('with a correct list of types', () => {
            beforeEach(async () => {
                instance.type(TYPE_1)
                instance.type(TYPE_2)
                await instance.generate(OUTPUT_FILE)
            })

            it('should create the types file', () => {
                OUTPUT_FILE.should.be.a.file().with.content(EXPECTED_OUTPUT_FILE_CONTENT)
            })
        })
    })
})
