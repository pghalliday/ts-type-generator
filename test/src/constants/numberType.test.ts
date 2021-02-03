import {numberType} from "../../../src";
import {join} from 'path'
import {readFileSync} from "fs";
import {FILES_DIR} from "../../../src/util/constants";

const TYPE_FILE_CONTENT = readFileSync(join(FILES_DIR, "NumberType.ts")).toString()

describe('numberType', () => {
    it('should have the correct name', () => {
        numberType.name.should.equal("NumberType")
    })

    it('should have the correct type file content', () => {
        numberType.getTypeFileContent().should.equal(TYPE_FILE_CONTENT)
    })

    it('should report the correct imports', () => {
        numberType.getTypeDependencies().should.eql([])
    })
})
