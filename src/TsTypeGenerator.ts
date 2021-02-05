import mkdirp from "mkdirp"
import {open} from "fs/promises";
import {join, dirname} from "path"
import {Type} from "./util/Type";
import {FILES_DIR} from "./util/constants";
import reduce from "lodash/reduce"
import sortBy from "lodash/sortBy"
import values from "lodash/values"
import isUndefined from "lodash/isUndefined"
import {readFileSync} from "fs";

const HAS_OWN_PROPERTY_DEFINITION = readFileSync(join(FILES_DIR, 'hasOwnProperty.ts')).toString()
const IS_DICTIONARY_OF_DEFINITION = readFileSync(join(FILES_DIR, 'isDictionaryOf.ts')).toString()
const EXPORT_PREFIX = 'export '

function collectTypes(types: Type[], typeMap: Record<string, Type>): Record<string, Type> {
    return reduce(types, (typeMap, type) => {
        if (isUndefined(typeMap[type.getName()])) {
            typeMap[type.getName()] = type;
            return collectTypes(type.getDependencies(), typeMap);
        } else {
            if (typeMap[type.getName()] !== type) {
                throw new Error(`Type: [${type.getName()}] has been redefined`)
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

    async generate(outputFile: string): Promise<void> {
        await mkdirp(dirname(outputFile))
        const types = sortBy(
            values(collectTypes(this.types, {})),
            [
                type => !(type.isExported()),
                type => type.getName(),
            ],
        )
        const file = await open(outputFile, 'w')
        for (const type of types) {
            if (type.isExported()) {
                await file.write(EXPORT_PREFIX)
            }
            await file.write(type.getTypeDefinition())
            if (type.isExported()) {
                await file.write(EXPORT_PREFIX)
            }
            await file.write(type.getTypeGuardDefinition())
        }
        await file.write(HAS_OWN_PROPERTY_DEFINITION)
        await file.write(IS_DICTIONARY_OF_DEFINITION)
        await file.close()
    }
}
