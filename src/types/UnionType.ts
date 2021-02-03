import {Type} from "../util/Type";
import map from "lodash/map"
import Mustache from "mustache";
import {readFileSync} from "fs";
import {join} from 'path'
import {getName} from "../util/getName";
import {TEMPLATES_DIR} from "../util/constants";

const UNION_SEPARATOR = ' | '
const TYPE_FILE_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'UnionType.ts.mustache')).toString()

export class UnionType implements Type {
    name: string
    types: Type[] = []

    constructor(name?: string) {
        this.name = getName('Union', name)
    }

    type(type: Type): UnionType {
        this.types.push(type)
        return this
    }

    getTypeFileContent(): string {
        return Mustache.render(TYPE_FILE_TEMPLATE, {
            name: this.name,
            values: map(this.types, type => type.name).join(UNION_SEPARATOR),
            types: this.types,
        })
    }

    getTypeDependencies(): Type[] {
        return this.types;
    }
}
