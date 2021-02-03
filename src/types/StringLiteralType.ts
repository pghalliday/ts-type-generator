import {Type} from "../util/Type";
import {getName} from "../util/getName";
import {readFileSync} from "fs";
import {join} from "path";
import {TEMPLATES_DIR} from "../util/constants";
import Mustache from "mustache";

const TYPE_FILE_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'StringLiteralType.ts.mustache')).toString()

export class StringLiteralType implements Type {
    name: string
    value: string

    constructor(value: string, name?: string) {
        this.name = getName('StringLiteral', name)
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
