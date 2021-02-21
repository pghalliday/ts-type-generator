import {Type, INTERNAL_PREFIX, Reference} from "../internal";
import Mustache from "mustache";
import {write} from "fs-extra";

export class CollectionType extends Type {
    private readonly type: Type
    private readonly partialCode: string
    private readonly validatedCode: string
    private readonly resolvedCode: string

    constructor(name: string, type: Type, partialCode: string, validatedCode: string, resolvedCode: string) {
        super(name)
        this.type = type
        this.partialCode = partialCode
        this.validatedCode = validatedCode
        this.resolvedCode = resolvedCode
    }

    getReferences(): Reference[] {
        return [];
    }

    getDependencies(): Type[] {
        return [this.type];
    }

    /* istanbul ignore next */
    async writePartialCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(this.partialCode, {
            internalPrefix: INTERNAL_PREFIX,
            name: this.getTypeName(),
            type: this.type.getTypeName(),
            initializer: this.getInitializerName(),
            resolver: this.getResolverName(),
            typeInitializer: this.type.getInitializerName(),
            typeResolver: this.type.getResolverName(),
        }))
    }

    /* istanbul ignore next */
    async writeValidatedCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(this.validatedCode, {
            internalPrefix: INTERNAL_PREFIX,
            name: this.getTypeName(),
            type: this.type.getTypeName(),
            validator: this.getValidatorName(),
            typeValidator: this.type.getValidatorName(),
        }))
    }

    /* istanbul ignore next */
    async writeResolvedCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(this.resolvedCode, {
            name: this.getTypeName(),
            type: this.type.getTypeName(),
        }))
    }
}

