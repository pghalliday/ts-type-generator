import {UnionType} from "../../../src"
import {join} from 'path'
import {readFileSync} from "fs";
import {TestType} from "../../TestType";

const FIXTURES_DIRECTORY = 'test/fixtures'
const TYPE_NAME = 'MyUnionType'
const TYPE_1 = new TestType('Type1')
const TYPE_2 = new TestType('Type2')
const TYPE_FILE_CONTENT = readFileSync(join(FIXTURES_DIRECTORY, TYPE_NAME + ".ts")).toString()
const GENERATED_TYPE_NAME_REGEXP = new RegExp('^TTG_Anonymous_Union_[0-9]+$')

describe('UnionType', () => {
    let instance: UnionType

    describe('with name', () => {
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
            instance.getTypeDependencies().should.eql([
                TYPE_1,
                TYPE_2
            ])
        })
    })

    describe('when anonymous', () => {
        beforeEach(async () => {
            instance = new UnionType()
        })

        it('should have a generated name', () => {
            instance.name.should.match(GENERATED_TYPE_NAME_REGEXP)
        })
    })
})
