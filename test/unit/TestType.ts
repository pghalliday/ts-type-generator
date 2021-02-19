import {Type} from "../../src/util/Type";
import {Collection} from "../../src/util/Collection";

export class TestType implements Type {
    private readonly name: string

    constructor(name: string) {
        this.name = name
    }

    getTypeName(): string {
        return this.name
    }

    getNamespacedTypeName(): string {
        return `Private.${this.getTypeName()}`
    }

    getValidatorName(): string {
        return `validate${this.getTypeName()}`
    }

    getNamespacedValidatorName(): string {
        return `Private.${this.getValidatorName()}`
    }

    async writeValidateCode(): Promise<void> {
        // do nothing
    }

    async writeResolveCode(): Promise<void> {
        // do nothing
    }

    getDependencies(): Type[] {
        return []
    }

    getReferences(): Collection[] {
        return []
    }
}
