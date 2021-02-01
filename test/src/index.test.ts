import TsTypeGuardBuilder from "../../src"
import {promisify} from 'util'
import rimraf from 'rimraf'

const p_rimraf = promisify(rimraf)

const outputDirectory = 'temp'

describe('TsTypeGuardBuilder', () => {
    let instance: TsTypeGuardBuilder

    beforeEach(async () => {
        await p_rimraf(outputDirectory)
        instance = new TsTypeGuardBuilder(outputDirectory)
    })

    describe('#build', () => {
        beforeEach(async () => {
            await instance.build()
        })

        it('should create the output directory', () => {
            outputDirectory.should.be.a.directory()
        })
    })
})
