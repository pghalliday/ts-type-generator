import {Type} from "../util/Type";
import { stringType } from "../constants";

export class KeyType implements Type {
    public readonly collectionName: string

    constructor(collectionName: string) {
        this.collectionName = collectionName
    }

    private isPublic(): boolean {
        return false
    }

    getValidationTypeName(): string {
        return stringType.getValidationTypeName()
    }

    getNamespacedValidationTypeName(): string {
        return this.getValidationTypeName()
    }

    getValidatorName(): string {
        return stringType.getValidatorName()
    }

    getNamespacedValidatorName(): string {
        return this.isPublic()? `Public.${this.getValidatorName()}` :  `Private.${this.getValidatorName()}`
    }

    async writeValidationCode(): Promise<void> {
        // do nothing
    }

    getDependencies(): Type[] {
        return [stringType]
    }
}
