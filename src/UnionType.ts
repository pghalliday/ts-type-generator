import {Type} from "./Type";
import map from "lodash/map"
import Mustache from "mustache";
import {readFileSync} from "fs";
import {resolve} from 'path'

const UNION_SEPARATOR = ' | '
const TYPE_FILE_TEMPLATE = readFileSync(resolve(__dirname, '../templates/UnionType.ts.mustache')).toString()

export class UnionType implements Type {
    name: string
    strings: string[] = []
    numbers: number[] = []
    booleans: boolean[] = []

    constructor(name: string) {
        this.name = name
    }

    string(value: string): UnionType {
        this.strings.push(value)
        return this
    }

    number(value: number): UnionType {
        this.numbers.push(value)
        return this
    }

    boolean(value: boolean): UnionType {
        this.booleans.push(value)
        return this
    }

    getTypeFileContent(): string {
        return Mustache.render(TYPE_FILE_TEMPLATE, {
            name: this.name,
            values: [
                map(this.strings, value => JSON.stringify(value)).join(UNION_SEPARATOR),
                this.numbers.join(UNION_SEPARATOR),
                this.booleans.join(UNION_SEPARATOR)
            ].join(UNION_SEPARATOR),
            strings: map(this.strings, string => JSON.stringify(string)),
            numbers: this.numbers,
            booleans: this.booleans,
        })
    }
}
