import {InterfaceType} from "../../src/InterfaceType"
import {join} from 'path'
import {readFileSync} from "fs";

const FIXTURES_DIRECTORY = 'test/fixtures'
const TYPE_NAME = 'InterfaceType'
const STRING_1 = 'string1'
const NUMBER_1 = 'number1'
const BOOLEAN_1 = 'boolean1'
const STRING_2 = 'string2'
const NUMBER_2 = 'number2'
const BOOLEAN_2 = 'boolean2'
const TYPE_FILE_CONTENT = readFileSync(join(FIXTURES_DIRECTORY, TYPE_NAME + ".ts")).toString()

describe('InterfaceType', () => {
    let instance: InterfaceType

    beforeEach(async () => {
        instance = new InterfaceType(TYPE_NAME)
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
