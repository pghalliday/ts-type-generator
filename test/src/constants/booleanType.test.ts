import {booleanType} from "../../../src";
import {join} from 'path'
import {readFileSync} from "fs";
import {FILES_DIR} from "../../../src/util/constants";

const TYPE_FILE_CONTENT = readFileSync(join(FILES_DIR, "BooleanType.ts")).toString()

describe('booleanType', () => {
    it('should have the correct name', () => {
        booleanType.name.should.equal("BooleanType")
    })

    it('should have the correct type file content', () => {
        booleanType.getTypeFileContent().should.equal(TYPE_FILE_CONTENT)
    })

    it('should report the correct imports', () => {
        booleanType.getTypeDependencies().should.eql([])
    })
})
