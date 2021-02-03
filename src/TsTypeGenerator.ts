import mkdirp from "mkdirp"
import {copyFile, writeFile} from "fs/promises";
import {join} from "path"
import {Type} from "./util/Type";
import {FILES_DIR} from "./util/constants";
import reduce from "lodash/reduce"
import isUndefined from "lodash/isUndefined"

function collectTypes(types: Type[], typeMap: Record<string, Type>): Record<string, Type> {
    return reduce(types, (typeMap, type) => {
        if (isUndefined(typeMap[type.name])) {
            typeMap[type.name] = type;
            return collectTypes(type.getTypeDependencies(), typeMap);
        } else {
            if (typeMap[type.name] !== type) {
                throw new Error(`Type: [${type.name}] has been redefined`)
            }
        }
        return typeMap
    }, typeMap)
}

export class TsTypeGenerator {
    types: Type[] = []

    type(type: Type): TsTypeGenerator {
        this.types.push(type)
        return this
    }

    async generate(outputDirectory: string): Promise<void> {
        await mkdirp(outputDirectory)
        await copyFile(
            join(FILES_DIR, "hasOwnProperty.ts"),
            join(outputDirectory, "hasOwnProperty.ts")
        )
        await copyFile(
            join(FILES_DIR, "isMapOf.ts"),
            join(outputDirectory, "isMapOf.ts")
        )
        // TODO: collect the complete list of types and check it
        const typeMap = collectTypes(this.types, {})
        for (const typeName in typeMap) {
            const type = typeMap[typeName]
            await writeFile(
                join(outputDirectory, type.name + ".ts"),
                type.getTypeFileContent()
            )
        }
    }
}
