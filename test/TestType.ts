import {Type} from "../src/util/Type";
import map from 'lodash/map'

export class TestType implements Type {
    name: string
    exported: boolean
    types: Type[] = []

    constructor(name: string, exported: boolean) {
        this.name = name
        this.exported = exported
    }

    type(type: Type): TestType {
        this.types.push(type)
        return this
    }

    getName(): string {
        return this.name
    }

    isExported(): boolean {
        return this.exported
    }

    getTypeDefinition(): string {
        return 'type ' + this.getName() + ' = ' + (this.types.length ? map(this.types, type => type.getName()).join(' | ') : 'null') + ';\n'
    }

    getTypeGuardDefinition(): string {
        return 'function is' + this.getName() + '(value: unknown): value is ' + this.getName() + ' {\n    return true;\n}\n'
    }

    getDependencies(): Type[] {
        return this.types
    }
}
