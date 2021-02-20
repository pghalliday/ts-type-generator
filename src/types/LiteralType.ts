import {
    Type,
    Primitive,
    INTERNAL_PREFIX,
    TEMPLATES_DIR,
    Reference,
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

    /* istanbul ignore next */
    async writeResolveCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(RESOLVE_CODE, {
            internalPrefix: INTERNAL_PREFIX,
            name: this.getTypeName(),
            value: JSON.stringify(this.value),
            initializer: this.getInitializerName(),
            resolver: this.getResolverName(),
        }))
    }

    /* istanbul ignore next */
    async writeValidateCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(VALIDATE_CODE, {
            internalPrefix: INTERNAL_PREFIX,
            typedef: typeof this.value,
            name: this.getTypeName(),
            value: JSON.stringify(this.value),
            validator: this.getValidatorName(),
        }))
    }

    /* istanbul ignore next */
    async writeCollapseCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(COLLAPSE_CODE, {
            name: this.getTypeName(),
            value: JSON.stringify(this.value),
        }))
    }
}