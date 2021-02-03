import {Type} from "../Type";
import map from "lodash/map"
import Mustache from "mustache";
import {readFileSync} from "fs";
import {resolve} from 'path'

const UNION_SEPARATOR = ' | '
const TYPE_FILE_TEMPLATE = readFileSync(resolve(__dirname, '../../templates/UnionType.ts.mustache')).toString()

export class UnionType implements Type {
    name: string
    types: Type[] = []

    constructor(name: string) {
        this.name = name
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

    getImports(): Type[] {
        return this.types;
    }
}
