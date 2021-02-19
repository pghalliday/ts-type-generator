import {
    Type,
    Primitive,
    INTERNAL_PREFIX,
    TEMPLATES_DIR,
    Reference, VALIDATE, RESOLVE, COLLAPSE, UTIL_DIR,
} from "../internal";
import {join} from "path";
import {readFileSync} from "fs";
import {write} from "fs-extra";
import Mustache from "mustache";

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'LiteralType')
const VALIDATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'validate.ts.mustache')).toString()
const RESOLVE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'resolve.ts.mustache')).toString()
const COLLAPSE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'collapse.ts.mustache')).toString()

export class LiteralType<T extends Primitive> extends Type {
    private readonly value: T

    constructor(name: string, value: T) {
        super(name);
        this.value = value
    }

    getReferences(): Reference[] {
        return [];
    }

    getDependencies(): Type[] {
        return [];
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
            typedef: typeof this.value,
            name: this.getTypeName(),
            value: JSON.stringify(this.value),
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
            collapser: this.getCollapserName(),
        }))
    }
}