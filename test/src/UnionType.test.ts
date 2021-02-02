import {UnionType} from "../../src/UnionType"
import {join} from 'path'
import {readFileSync} from "fs";

const FIXTURES_DIRECTORY = 'test/fixtures'
const TYPE_NAME = 'UnionType'
const STRING_1 = 'hello'
const NUMBER_1 = 1
const BOOLEAN_1 = true
const STRING_2 = 'new\nline'
const NUMBER_2 = -5.3
const BOOLEAN_2 = false
const TYPE_FILE_CONTENT = readFileSync(join(FIXTURES_DIRECTORY, TYPE_NAME + ".ts")).toString()

describe('UnionType', () => {
    let instance: UnionType

    beforeEach(async () => {
        instance = new UnionType(TYPE_NAME)
            .string(STRING_1)
            .number(NUMBER_1)
            .boolean(BOOLEAN_1)
            .string(STRING_2)
            .number(NUMBER_2)
            .boolean(BOOLEAN_2)
    })

    it('should have the correct name', () => {
        instance.name.should.equal(TYPE_NAME)
    })

    it('should have the correct type file content', () => {
        instance.getTypeFileContent().should.equal(TYPE_FILE_CONTENT)
    })
})
