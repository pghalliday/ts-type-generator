import {Type} from "../../src/util/Type";

export class TestType implements Type {
    private readonly name: string
    private readonly exported: boolean
    private readonly types: Type[] = []

    constructor(name: string, exported: boolean) {
        this.name = name
        this.exported = exported
    }

    type(type: Type): TestType {
        this.types.push(type)
        return this
    }

    isExported(): boolean {
        return this.exported
    }

    getTypeName(): string {
        return this.name
    }

    getTypeCode(): string {
        return `type ${this.getTypeName()} = string;\n`
    }

    getTranslateName(): string {
        return `translate${this.getTypeName()}`
    }

    getTranslateCode(): string {
        return `function ${this.getTranslateName()}: string {\n  return 'hello';\n}\n`
    }

    getDependencies(): Type[] {
        return this.types
    }
}
