import {MapType} from "../../../src"
import {join} from 'path'
import {readFileSync} from "fs";
import {TestType} from "../../TestType";

const FIXTURES_DIRECTORY = 'test/fixtures'
const TYPE_NAME = 'MyMapType'
const TYPE = new TestType('Type')
const TYPE_FILE_CONTENT = readFileSync(join(FIXTURES_DIRECTORY, TYPE_NAME + ".ts")).toString()
const GENERATED_TYPE_NAME_REGEXP = new RegExp('^TTG_Anonymous_Map_[0-9]+$')

describe('MapType', () => {
    let instance: MapType

    describe('with name', () => {
        beforeEach(async () => {
            instance = new MapType(TYPE, TYPE_NAME)
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
            instance = new MapType(TYPE)
        })

        it('should have a generated name', () => {
            instance.name.should.match(GENERATED_TYPE_NAME_REGEXP)
        })
    })
})
