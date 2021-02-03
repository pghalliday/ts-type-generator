import {Type} from "../util/Type";
import {getName} from "../util/getName";
import {readFileSync} from "fs";
import {join} from "path";
import {TEMPLATES_DIR} from "../util/constants";
import Mustache from "mustache";

const TYPE_FILE_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'MapType.ts.mustache')).toString()

export class MapType implements Type {
    name: string
    type: Type

    constructor(type: Type, name?: string) {
        this.name = getName('Map', name)
        this.type = type
    }

    getTypeFileContent(): string {
        return Mustache.render(TYPE_FILE_TEMPLATE, {
            name: this.name,
            type: this.type.name,
        })
    }

    getTypeDependencies(): Type[] {
        return [this.type]
    }
}
