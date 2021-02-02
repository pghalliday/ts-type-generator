import mkdirp from "mkdirp"
import {copyFile, writeFile} from "fs/promises";
import {join, resolve} from "path"
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

    async generate(): Promise<void> {
        await mkdirp(this.outputDirectory)
        await copyFile(
            resolve(__dirname, "../files/hasOwnProperty.ts"),
            join(this.outputDirectory, "hasOwnProperty.ts")
        )
        for (const type of this.types) {
            await writeFile(
                join(this.outputDirectory, type.name + ".ts"),
                type.getTypeFileContent()
            )
        }
    }
}
