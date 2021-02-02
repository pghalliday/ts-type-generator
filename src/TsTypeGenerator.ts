import mkdirp from "mkdirp"
import {writeFile} from "fs/promises";
import {join} from "path"
import {Type} from "./Type";

export class TsTypeGenerator {
    outputDirectory: string
    types: Type[] = []

    constructor(outputDirectory: string) {
        this.outputDirectory = outputDirectory
    }

    type(type: Type): TsTypeGenerator {
        this.types.push(type)
        return this
    }

    async build(): Promise<void> {
        await mkdirp(this.outputDirectory)
        for (const type of this.types) {
            await writeFile(
                join(this.outputDirectory, type.name + ".ts"),
                type.getTypeFileContent()
            )
        }
    }
}
