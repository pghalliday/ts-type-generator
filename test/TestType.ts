import {Type} from "../src/Type";

export class TestType implements Type {
    name: string

    constructor(name: string) {
        this.name = name
    }

    getTypeFileContent(): string {
        return this.name + ' type file'
    }

    getTypeFileName(): string {
        return this.name + '.ts'
    }

    getImports(): Type[] {
        return []
    }
}
