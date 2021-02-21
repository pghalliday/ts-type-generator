import {
    Type,
    INTERNAL_PREFIX,
    TEMPLATES_DIR,
    Reference,
} from "../internal";
import {join} from "path";
import {readFileSync} from "fs";
import {write} from "fs-extra";
import Mustache from "mustache";

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'ReferenceType')
const VALIDATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'validated.ts.mustache')).toString()
const RESOLVE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'partial.ts.mustache')).toString()
const COLLAPSE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'resolved.ts.mustache')).toString()

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
            validator: this.type.getValidatorName(),
            initializer: this.type.getInitializerName(),
            resolver: this.type.getResolverName(),
        }];
    }

    /* istanbul ignore next */
    async writePartialCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(RESOLVE_CODE, {
            internalPrefix: INTERNAL_PREFIX,
            name: this.getTypeName(),
            initializer: this.getInitializerName(),
            resolver: this.getResolverName(),
            type: this.type.getTypeName(),
        }))
    }

    /* istanbul ignore next */
    async writeValidatedCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(VALIDATE_CODE, {
            internalPrefix: INTERNAL_PREFIX,
            name: this.getTypeName(),
            validator: this.getValidatorName(),
        }))
    }

    /* istanbul ignore next */
    async writeResolvedCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(COLLAPSE_CODE, {
            name: this.getTypeName(),
            type: this.type.getTypeName(),
        }))
    }
}

