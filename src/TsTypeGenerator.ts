import {Type} from "./util/Type";
import {FILES_DIR, VALIDATION_DIR} from "./util/constants";
import flatMap from "lodash/flatMap"
import {close, copy, open} from "fs-extra";
import {join} from 'path'

type Collection = {
    name: string,
    type: Type,
}

function collectTypes(types: Type[]): Type[] {
    return flatMap(types, type => [type].concat(collectTypes(type.getDependencies())))
}

export class TsTypeGenerator {
    private readonly types: Type[] = []
    private readonly collections: Collection[] = []

    type(type: Type): TsTypeGenerator {
        this.types.push(type)
        return this
    }

    collection(name: string, type: Type): TsTypeGenerator {
        this.collections.push({
            name,
            type,
        })
        return this
    }

    async generate(outputDir: string): Promise<void> {
        const types = collectTypes(this.types)
        await copy(FILES_DIR, outputDir)
        const privateValidationExports = await open(join(outputDir, VALIDATION_DIR, 'private.ts'), 'w')
        const publicValidationExports = await open(join(outputDir, VALIDATION_DIR, 'public.ts'), 'w')
        for (const type of types) {
            await type.writeValidationCode(outputDir, privateValidationExports, publicValidationExports)
        }
        await close(privateValidationExports)
        await close(publicValidationExports)
    }
}
