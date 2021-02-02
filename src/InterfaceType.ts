import {Type} from "./Type";
import Mustache from "mustache";
import {readFileSync} from "fs";
import {resolve} from 'path'

const TYPE_FILE_TEMPLATE = readFileSync(resolve(__dirname, '../templates/InterfaceType.ts.mustache')).toString()

export class InterfaceType implements Type {
    name: string
    strings: string[] = []
    numbers: string[] = []
    booleans: string[] = []

    constructor(name: string) {
        this.name = name
    }

    string(value: string): InterfaceType {
        this.strings.push(value)
        return this
    }

    number(value: string): InterfaceType {
        this.numbers.push(value)
        return this
    }

    boolean(value: string): InterfaceType {
        this.booleans.push(value)
        return this
    }

    getTypeFileContent(): string {
        return Mustache.render(TYPE_FILE_TEMPLATE, this)
    }
}
