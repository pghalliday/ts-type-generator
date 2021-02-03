import {InterfaceType} from "../../../src"
import {join} from 'path'
import {readFileSync} from "fs";
import {TestType} from "../../TestType";

const FIXTURES_DIRECTORY = 'test/fixtures'
const TYPE_NAME = 'InterfaceType'
const PROPERTY_1 = 'property1'
const TYPE_1 = new TestType('Type1')
const PROPERTY_2 = 'property2'
const TYPE_2 = new TestType('Type2')
const TYPE_FILE_CONTENT = readFileSync(join(FIXTURES_DIRECTORY, TYPE_NAME + ".ts")).toString()

describe('InterfaceType', () => {
    let instance: InterfaceType

    beforeEach(async () => {
        instance = new InterfaceType(TYPE_NAME)
            .property(PROPERTY_1, TYPE_1)
            .property(PROPERTY_2, TYPE_2)
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