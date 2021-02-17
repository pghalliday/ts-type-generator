import {Type} from "../../src/util/Type";

export class TestType implements Type {
    private readonly name: string
    private readonly public: boolean
    private readonly types: Type[] = []

    constructor(name: string, isPublic: boolean) {
        this.name = name
        this.public = isPublic
    }

    isPublic(): boolean {
        return this.public
    }

    getValidationTypeName(): string {
        return this.name
    }

    getNamespacedValidationTypeName(): string {
        return this.isPublic() ? `Public.${this.getValidationTypeName()}` : `Private.${this.getValidationTypeName()}`
    }

    getValidatorName(): string {
        return `validate${this.getValidationTypeName()}`
    }

    getNamespacedValidatorName(): string {
        return this.isPublic() ? `Public.${this.getValidatorName()}` : `Private.${this.getValidatorName()}`
    }

    async writeValidationCode(): Promise<void> {
        // do nothing
    }

    type(type: Type): TestType {
        this.types.push(type)
        return this
    }

    getDependencies(): Type[] {
        return this.types
    }
}
