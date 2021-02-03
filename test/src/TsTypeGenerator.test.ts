import {TsTypeGenerator} from "../../src"
import {promisify} from 'util'
import rimraf from 'rimraf'
import {join} from 'path'
import {readFileSync} from "fs";
import {TestType} from "../TestType";

const p_rimraf = promisify(rimraf)

const FIXTURES_DIRECTORY = 'test/fixtures'
const OUTPUT_DIRECTORY = 'temp'
const HAS_OWN_PROPERTY_FILE_NAME = 'hasOwnProperty.ts'
const HAS_OWN_PROPERTY_FILE_CONTENT = readFileSync(join(FIXTURES_DIRECTORY, HAS_OWN_PROPERTY_FILE_NAME)).toString()

const TYPE_1 = new TestType('Type1')
const TYPE_2 = new TestType('Type2')

describe('TsTypeGenerator', () => {
    let instance: TsTypeGenerator

    beforeEach(async () => {
        await p_rimraf(OUTPUT_DIRECTORY)
        instance = new TsTypeGenerator()
    })

    describe('#type', () => {
        beforeEach(async () => {
            instance.type(TYPE_1)
            instance.type(TYPE_2)
            await instance.generate(OUTPUT_DIRECTORY)
        })

        it('should create the hasOwnProperty library', () => {
            const path = join(OUTPUT_DIRECTORY, HAS_OWN_PROPERTY_FILE_NAME)
            path.should.be.a.file().with.content(HAS_OWN_PROPERTY_FILE_CONTENT)
        })

        it('should create the type files', () => {
            const path1 = join(OUTPUT_DIRECTORY, TYPE_1.getTypeFileName())
            const path2 = join(OUTPUT_DIRECTORY, TYPE_2.getTypeFileName())
            path1.should.be.a.file().with.content(TYPE_1.getTypeFileContent())
            path2.should.be.a.file().with.content(TYPE_2.getTypeFileContent())
        })
    })
})
