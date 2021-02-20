import {Type, INTERNAL_PREFIX, Reference} from "../internal";
import Mustache from "mustache";
import {write} from "fs-extra";

export class CollectionType extends Type {
    private readonly type: Type
    private readonly resolveCode: string
    private readonly validateCode: string
    private readonly collapseCode: string

    constructor(name: string, type: Type, resolveCode: string, validateCode: string, collapseCode: string) {
        super(name)
        this.type = type
        this.resolveCode = resolveCode
        this.validateCode = validateCode
        this.collapseCode = collapseCode
    }

    getReferences(): Reference[] {
        return [];
    }

    getDependencies(): Type[] {
        return [this.type];
    }

    /* istanbul ignore next */
    async writeResolveCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(this.resolveCode, {
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
    async writeValidateCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(this.validateCode, {
            internalPrefix: INTERNAL_PREFIX,
            name: this.getTypeName(),
            type: this.type.getTypeName(),
            validator: this.getValidatorName(),
            typeValidator: this.type.getValidatorName(),
        }))
    }

    /* istanbul ignore next */
    async writeCollapseCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(this.collapseCode, {
            name: this.getTypeName(),
            type: this.type.getTypeName(),
        }))
    }
}

