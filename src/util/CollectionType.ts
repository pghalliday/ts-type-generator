import {Type, INTERNAL_PREFIX, Reference, VALIDATE, RESOLVE, COLLAPSE, UTIL_DIR} from "../internal";
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

    async writeResolveCode(exports: number, references: Reference[]): Promise<void> {
        await write(exports, Mustache.render(this.resolveCode, {
            internalPrefix: INTERNAL_PREFIX,
            validatedDir: VALIDATE,
            resolvedDir: RESOLVE,
            collapsedDir: COLLAPSE,
            utilDir: UTIL_DIR,
            name: this.getTypeName(),
            type: this.type.getTypeName(),
            initializer: this.getInitializerName(),
            resolver: this.getResolverName(),
            typeInitializer: this.type.getInitializerName(),
            typeResolver: this.type.getResolverName(),
            references,
        }))
    }

    async writeValidateCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(this.validateCode, {
            internalPrefix: INTERNAL_PREFIX,
            validatedDir: VALIDATE,
            resolvedDir: RESOLVE,
            collapsedDir: COLLAPSE,
            utilDir: UTIL_DIR,
            name: this.getTypeName(),
            type: this.type.getTypeName(),
            validator: this.getValidatorName(),
            typeValidator: this.type.getValidatorName(),
        }))
    }

    async writeCollapseCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(this.collapseCode, {
            internalPrefix: INTERNAL_PREFIX,
            validatedDir: VALIDATE,
            resolvedDir: RESOLVE,
            collapsedDir: COLLAPSE,
            utilDir: UTIL_DIR,
            name: this.getTypeName(),
            type: this.type.getTypeName(),
            collapser: this.getCollapserName(),
            typeCollapser: this.type.getCollapserName(),
        }))
    }
}

