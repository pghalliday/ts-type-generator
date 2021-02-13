import {join} from "path"
import {Type} from "./util/Type";
import {FILES_DIR} from "./util/constants";
import reduce from "lodash/reduce"
import sortBy from "lodash/sortBy"
import values from "lodash/values"
import isUndefined from "lodash/isUndefined"
import {readFileSync} from "fs";

const COMMON_CODE = readFileSync(join(FILES_DIR, 'common.ts')).toString()
const EXPORT_PREFIX = 'export '

function collectTypes(types: Type[], typeMap: Record<string, Type>): Record<string, Type> {
    return reduce(types, (typeMap, type) => {
        if (isUndefined(typeMap[type.getTypeName()])) {
            typeMap[type.getTypeName()] = type;
            return collectTypes(type.getDependencies(), typeMap);
        } else {
            if (typeMap[type.getTypeName()] !== type) {
                throw new Error(`Type: [${type.getTypeName()}] has been redefined`)
            }
        }
        return typeMap
    }, typeMap)
}

export class TsTypeGenerator {
    private readonly types: Type[] = []

    type(type: Type): TsTypeGenerator {
        this.types.push(type)
        return this
    }

    generate(): string {
        const types = sortBy(
            values(collectTypes(this.types, {})),
            [
                type => !(type.isExported()),
                type => type.getTypeName(),
            ],
        )
        let code = ''
        for (const type of types) {
            if (type.isExported()) {
                code += EXPORT_PREFIX
            }
            code += type.getTypeCode()
            if (type.isExported()) {
                code += EXPORT_PREFIX
            }
            code += type.getTranslateCode()
        }
        code += COMMON_CODE
        return code
    }
}
