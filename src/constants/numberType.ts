import {Type} from "../util/Type";
import {readFileSync} from "fs";
import {join} from "path";
import {FILES_DIR} from "../util/constants";

const TYPE_FILE_CONTENT = readFileSync(join(FILES_DIR, "NumberType.ts")).toString()

class NumberType implements Type {
    name = "NumberType"

    getTypeFileContent(): string {
        return TYPE_FILE_CONTENT;
    }

    getTypeDependencies(): Type[] {
        return []
    }
}

export const numberType = new NumberType()
