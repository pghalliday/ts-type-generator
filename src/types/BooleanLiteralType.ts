import {Type} from "../util/Type";
import {getName} from "../util/getName";
import {readFileSync} from "fs";
import {join} from "path";
import {TEMPLATES_DIR} from "../util/constants";
import Mustache from "mustache";

const TYPE_FILE_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'BooleanLiteralType.ts.mustache')).toString()

export class BooleanLiteralType implements Type {
    name: string
    value: boolean

    constructor(value: boolean, name?: string) {
        this.name = getName('BooleanLiteral', name)
        this.value = value
    }

    getTypeFileContent(): string {
        return Mustache.render(TYPE_FILE_TEMPLATE, {
            name: this.name,
            value: JSON.stringify(this.value),
        })
    }

    getTypeDependencies(): Type[] {
        return []
    }
}
