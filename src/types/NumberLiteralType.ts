import {Type} from "../util/Type";
import {getName} from "../util/getName";
import {readFileSync} from "fs";
import {join} from "path";
import {TEMPLATES_DIR} from "../util/constants";
import Mustache from "mustache";

const TYPE_FILE_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'NumberLiteralType.ts.mustache')).toString()

export class NumberLiteralType implements Type {
    name: string
    value: number

    constructor(value: number, name?: string) {
        this.name = getName('NumberLiteral', name)
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
