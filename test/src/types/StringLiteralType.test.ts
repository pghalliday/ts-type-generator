import {StringLiteralType} from "../../../src"
import {join} from 'path'
import {readFileSync} from "fs";

const FIXTURES_DIRECTORY = 'test/fixtures'
const TYPE_NAME = 'MyStringLiteralType'
const TYPE_FILE_CONTENT = readFileSync(join(FIXTURES_DIRECTORY, TYPE_NAME + ".ts")).toString()
const GENERATED_TYPE_NAME_REGEXP = new RegExp('^TTG_Anonymous_StringLiteral_[0-9]+$')
const VALUE = "hello"

describe('StringLiteralType', () => {
    let instance: StringLiteralType

    describe('with name', () => {
        beforeEach(async () => {
            instance = new StringLiteralType(VALUE, TYPE_NAME)
        })

        it('should have the correct name', () => {
            instance.name.should.equal(TYPE_NAME)
        })

        it('should have the correct type file content', () => {
            instance.getTypeFileContent().should.equal(TYPE_FILE_CONTENT)
        })

        it('should report the correct imports', () => {
            instance.getTypeDependencies().should.eql([])
        })
    })

    describe('when anonymous', () => {
        beforeEach(async () => {
            instance = new StringLiteralType(VALUE)
        })

        it('should have a generated name', () => {
            instance.name.should.match(GENERATED_TYPE_NAME_REGEXP)
        })
    })
})
