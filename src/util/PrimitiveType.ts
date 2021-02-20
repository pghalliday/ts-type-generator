import {
    Type,
    INTERNAL_PREFIX,
    TEMPLATES_DIR,
    Reference,
} from "../internal";
import {join} from "path";
import {readFileSync} from "fs";
import Mustache from "mustache";
import {write} from "fs-extra";

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'PrimitiveType')
const VALIDATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'validate.ts.mustache')).toString()
const RESOLVE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'resolve.ts.mustache')).toString()
const COLLAPSE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'collapse.ts.mustache')).toString()

export class PrimitiveType extends Type {
    private readonly typedef: string

    constructor(name: string, typedef: string) {
        super(name);
        this.typedef = typedef
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
            typedef: this.typedef,
            initializer: this.getInitializerName(),
            resolver: this.getResolverName(),
        }))
    }

    /* istanbul ignore next */
    async writeValidateCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(VALIDATE_CODE, {
            internalPrefix: INTERNAL_PREFIX,
            typedef: this.typedef,
            name: this.getTypeName(),
            validator: this.getValidatorName(),
        }))
    }

    /* istanbul ignore next */
    async writeCollapseCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(COLLAPSE_CODE, {
            name: this.getTypeName(),
            typedef: this.typedef,
        }))
    }
}
