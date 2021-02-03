import {stringType} from "../../../src";
import {join} from 'path'
import {readFileSync} from "fs";
import {FILES_DIR} from "../../../src/util/constants";

const TYPE_FILE_CONTENT = readFileSync(join(FILES_DIR, "StringType.ts")).toString()

describe('stringType', () => {
    it('should have the correct name', () => {
        stringType.name.should.equal("StringType")
    })

    it('should have the correct type file content', () => {
        stringType.getTypeFileContent().should.equal(TYPE_FILE_CONTENT)
    })

    it('should report the correct imports', () => {
        stringType.getTypeDependencies().should.eql([])
    })
})
