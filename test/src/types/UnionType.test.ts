import {UnionType} from "../../../src"
import {join} from 'path'
import {readFileSync} from "fs";
import {TestType} from "../../TestType";

const FIXTURES_DIRECTORY = 'test/fixtures'
const TYPE_NAME = 'UnionType'
const TYPE_1 = new TestType('Type1')
const TYPE_2 = new TestType('Type2')
const TYPE_FILE_CONTENT = readFileSync(join(FIXTURES_DIRECTORY, TYPE_NAME + ".ts")).toString()

describe('UnionType', () => {
    let instance: UnionType

    beforeEach(async () => {
        instance = new UnionType(TYPE_NAME)
            .type(TYPE_1)
            .type(TYPE_2)
    })

    it('should have the correct name', () => {
        instance.name.should.equal(TYPE_NAME)
    })

    it('should have the correct type file content', () => {
        instance.getTypeFileContent().should.equal(TYPE_FILE_CONTENT)
    })

    it('should report the correct imports', () => {
        instance.getImports().should.eql([
            TYPE_1,
            TYPE_2
        ])
    })
})
