import {TsTypeGenerator} from "../../src"
import {promisify} from 'util'
import rimraf from 'rimraf'
import {join} from 'path'
import {readFileSync} from "fs";
import {TestType} from "../TestType";
import {FILES_DIR} from "../../src/util/constants";

const p_rimraf = promisify(rimraf)

const OUTPUT_DIRECTORY = 'temp'
const HAS_OWN_PROPERTY_FILE_NAME = 'hasOwnProperty.ts'
const HAS_OWN_PROPERTY_FILE_CONTENT = readFileSync(join(FILES_DIR, HAS_OWN_PROPERTY_FILE_NAME)).toString()
const IS_MAP_OF_FILE_NAME = 'hasOwnProperty.ts'
const IS_MAP_OF_FILE_CONTENT = readFileSync(join(FILES_DIR, IS_MAP_OF_FILE_NAME)).toString()

const TYPE_1 = new TestType('Type1')
const TYPE_2 = new TestType('Type2')
const TYPE_3 = new TestType('Type3')
const TYPE_4 = new TestType('Type4')
const TYPE_5 = new TestType('Type5')
const TYPE_6 = new TestType('Type6')
const TYPE_6_AGAIN = new TestType('Type6')
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
                return instance.generate(OUTPUT_DIRECTORY)
                    .should.eventually.be.rejectedWith(
                        'Type: [Type6] has been redefined'
                    )
            })
        })

        describe('with a correct list of types', () => {
            beforeEach(async () => {
                instance.type(TYPE_1)
                instance.type(TYPE_2)
                await instance.generate(OUTPUT_DIRECTORY)
            })

            it('should create the hasOwnProperty library', () => {
                const path = join(OUTPUT_DIRECTORY, HAS_OWN_PROPERTY_FILE_NAME)
                path.should.be.a.file().with.content(HAS_OWN_PROPERTY_FILE_CONTENT)
            })

            it('should create the isMapOf library', () => {
                const path = join(OUTPUT_DIRECTORY, IS_MAP_OF_FILE_NAME)
                path.should.be.a.file().with.content(IS_MAP_OF_FILE_CONTENT)
            })

            it('should create the type files', () => {
                const path1 = join(OUTPUT_DIRECTORY, TYPE_1.getTypeFileName())
                const path2 = join(OUTPUT_DIRECTORY, TYPE_2.getTypeFileName())
                const path3 = join(OUTPUT_DIRECTORY, TYPE_3.getTypeFileName())
                const path4 = join(OUTPUT_DIRECTORY, TYPE_4.getTypeFileName())
                const path5 = join(OUTPUT_DIRECTORY, TYPE_5.getTypeFileName())
                const path6 = join(OUTPUT_DIRECTORY, TYPE_6.getTypeFileName())
                path1.should.be.a.file().with.content(TYPE_1.getTypeFileContent())
                path2.should.be.a.file().with.content(TYPE_2.getTypeFileContent())
                path3.should.be.a.file().with.content(TYPE_3.getTypeFileContent())
                path4.should.be.a.file().with.content(TYPE_4.getTypeFileContent())
                path5.should.be.a.file().with.content(TYPE_5.getTypeFileContent())
                path6.should.be.a.file().with.content(TYPE_6.getTypeFileContent())
            })
        })
    })
})
