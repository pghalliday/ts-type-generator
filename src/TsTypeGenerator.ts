import mkdirp from "mkdirp"
import {copyFile, writeFile} from "fs/promises";
import {join, resolve} from "path"
import {Type} from "./Type";

export class TsTypeGenerator {
    types: Type[] = []

    type(type: Type): TsTypeGenerator {
        this.types.push(type)
        return this
    }

    async generate(outputDirectory: string): Promise<void> {
        await mkdirp(outputDirectory)
        await copyFile(
            resolve(__dirname, "../files/hasOwnProperty.ts"),
            join(outputDirectory, "hasOwnProperty.ts")
        )
        for (const type of this.types) {
            await writeFile(
                join(outputDirectory, type.name + ".ts"),
                type.getTypeFileContent()
            )
        }
    }
}
