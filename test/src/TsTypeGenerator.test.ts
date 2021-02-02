import {TsTypeGenerator} from "../../src/TsTypeGenerator"
import {promisify} from 'util'
import rimraf from 'rimraf'
import {join} from 'path'
import {Type} from '../../src/Type'

const p_rimraf = promisify(rimraf)

const OUTPUT_DIRECTORY = 'temp'

class TestType implements Type {
    name: string

    constructor(name: string) {
        this.name = name
    }

    getTypeFileContent(): string {
        return this.name + ' type file'
    }

    getTypeFileName(): string {
        return this.name + '.ts'
    }
}

const TYPE_1 = new TestType('Type1')
const TYPE_2 = new TestType('Type2')

describe('TsTypeGenerator', () => {
    let instance: TsTypeGenerator

    beforeEach(async () => {
        await p_rimraf(OUTPUT_DIRECTORY)
        instance = new TsTypeGenerator(OUTPUT_DIRECTORY)
    })

    describe('#addType', () => {
        beforeEach(async () => {
            instance.type(TYPE_1)
            instance.type(TYPE_2)
            await instance.build()
        })

        it('should create the type files', () => {
            const path1 = join(OUTPUT_DIRECTORY, TYPE_1.getTypeFileName())
            const path2 = join(OUTPUT_DIRECTORY, TYPE_2.getTypeFileName())
            path1.should.be.a.file().with.content(TYPE_1.getTypeFileContent())
            path2.should.be.a.file().with.content(TYPE_2.getTypeFileContent())
        })
    })
})
