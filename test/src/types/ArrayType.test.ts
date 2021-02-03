import {ArrayType} from "../../../src"
import {join} from 'path'
import {readFileSync} from "fs";
import {TestType} from "../../TestType";

const FIXTURES_DIRECTORY = 'test/fixtures'
const TYPE_NAME = 'ArrayType'
const TYPE = new TestType('Type')
const TYPE_FILE_CONTENT = readFileSync(join(FIXTURES_DIRECTORY, TYPE_NAME + ".ts")).toString()
const GENERATED_TYPE_NAME_REGEXP = new RegExp('^TTG_Anonymous_Array_[0-9]+$')

describe('ArrayType', () => {
    let instance: ArrayType

    describe('with name', () => {
        beforeEach(async () => {
            instance = new ArrayType(TYPE, TYPE_NAME)
        })

        it('should have the correct name', () => {
            instance.name.should.equal(TYPE_NAME)
        })

        it('should have the correct type file content', () => {
            instance.getTypeFileContent().should.equal(TYPE_FILE_CONTENT)
        })

        it('should report the correct imports', () => {
            instance.getTypeDependencies().should.eql([TYPE])
        })
    })

    describe('when anonymous', () => {
        beforeEach(async () => {
            instance = new ArrayType(TYPE)
        })

        it('should have a generated name', () => {
            instance.name.should.match(GENERATED_TYPE_NAME_REGEXP)
        })
    })
})
