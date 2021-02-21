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
const VALIDATED_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'validated.ts.mustache')).toString()
const PARTIAL_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'partial.ts.mustache')).toString()
const RESOLVED_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'resolved.ts.mustache')).toString()

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
    async writePartialCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(PARTIAL_CODE, {
            internalPrefix: INTERNAL_PREFIX,
            name: this.getTypeName(),
            typedef: this.typedef,
            initializer: this.getInitializerName(),
            resolver: this.getResolverName(),
        }))
    }

    /* istanbul ignore next */
    async writeValidatedCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(VALIDATED_CODE, {
            internalPrefix: INTERNAL_PREFIX,
            typedef: this.typedef,
            name: this.getTypeName(),
            validator: this.getValidatorName(),
        }))
    }

    /* istanbul ignore next */
    async writeResolvedCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(RESOLVED_CODE, {
            name: this.getTypeName(),
            typedef: this.typedef,
        }))
    }
}
