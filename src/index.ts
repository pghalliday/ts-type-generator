import mkdirp from 'mkdirp'

export default class TsTypeGuardBuilder {
    outputDirectory: string

    constructor(outputDirectory: string) {
        this.outputDirectory = outputDirectory
    }

    async build(): Promise<void> {
        await mkdirp(this.outputDirectory)
    }
}
