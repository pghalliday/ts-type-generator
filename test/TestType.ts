import {Type} from "../src/util/Type";

export class TestType implements Type {
    name: string
    types: Type[] = []

    constructor(name: string) {
        this.name = name
    }

    type(type: Type): TestType {
        this.types.push(type)
        return this
    }

    getTypeFileContent(): string {
        return this.name + ' type file'
    }

    getTypeFileName(): string {
        return this.name + '.ts'
    }

    getTypeDependencies(): Type[] {
        return this.types
    }
}
