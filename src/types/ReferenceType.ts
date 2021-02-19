import {
    Type,
    INTERNAL_PREFIX,
    TEMPLATES_DIR,
    Reference,
    VALIDATE,
    RESOLVE,
    COLLAPSE,
    UTIL_DIR
} from "../internal";
import {join} from "path";
import {readFileSync} from "fs";
import {write} from "fs-extra";
import Mustache from "mustache";

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'ReferenceType')
const VALIDATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'validate.ts.mustache')).toString()
const RESOLVE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'resolve.ts.mustache')).toString()
const COLLAPSE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'collapse.ts.mustache')).toString()

export class ReferenceType extends Type {
    private readonly type: Type

    constructor(name: string, type: Type) {
        super(name)
        this.type = type
    }

    getDependencies(): Type[] {
        return [this.type];
    }

    getReferences(): Reference[] {
        return [{
            name: this.name,
            type: this.type.getTypeName(),
            initializer: this.type.getInitializerName(),
            resolver: this.type.getResolverName(),
            collapser: this.type.getCollapserName(),
        }];
    }

    async writeResolveCode(exports: number, references: Reference[]): Promise<void> {
        await write(exports, Mustache.render(RESOLVE_CODE, {
            internalPrefix: INTERNAL_PREFIX,
            validatedDir: VALIDATE,
            resolvedDir: RESOLVE,
            collapsedDir: COLLAPSE,
            utilDir: UTIL_DIR,
            name: this.getTypeName(),
            initializer: this.getInitializerName(),
            resolver: this.getResolverName(),
            type: this.type.getTypeName(),
            references,
        }))
    }

    async writeValidateCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(VALIDATE_CODE, {
            internalPrefix: INTERNAL_PREFIX,
            validatedDir: VALIDATE,
            resolvedDir: RESOLVE,
            collapsedDir: COLLAPSE,
            utilDir: UTIL_DIR,
            name: this.getTypeName(),
            validator: this.getValidatorName(),
        }))
    }

    async writeCollapseCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(COLLAPSE_CODE, {
            internalPrefix: INTERNAL_PREFIX,
            validatedDir: VALIDATE,
            resolvedDir: RESOLVE,
            collapsedDir: COLLAPSE,
            utilDir: UTIL_DIR,
            name: this.getTypeName(),
            type: this.type.getTypeName(),
            collapser: this.getCollapserName(),
        }))
    }
}

