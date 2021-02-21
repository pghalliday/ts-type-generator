import {
    Type,
    INTERNAL_PREFIX,
    TEMPLATES_DIR,
    collectTypes,
    collectReferences,
    Reference,
} from "../internal";
import map from "lodash/map"
import Mustache from "mustache";
import {readFileSync} from "fs";
import {join} from 'path'
import {write} from "fs-extra";

const UNION_SEPARATOR = ' | '

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'UnionType')
const VALIDATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'validated.ts.mustache')).toString()
const RESOLVE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'partial.ts.mustache')).toString()
const COLLAPSE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'resolved.ts.mustache')).toString()

export class UnionError extends Error {}

/* istanbul ignore next */
function checkForReferences(types: Type[]): void {
    if (collectReferences(collectTypes(types)).length > 0) throw new UnionError('Union types cannot contain reference types')
}

export class UnionType extends Type {
    private readonly types: Type[] = []

    /* istanbul ignore next */
    private getTypeDef(): string {
        return map(this.types, type => type.getTypeName()).join(UNION_SEPARATOR)
    }

    type(type: Type): UnionType {
        this.types.push(type)
        return this
    }

    getDependencies(): Type[] {
        return this.types;
    }

    getReferences(): Reference[] {
        return [];
    }

    /* istanbul ignore next */
    async writePartialCode(exports: number): Promise<void> {
        checkForReferences(this.types)
        await write(exports, Mustache.render(RESOLVE_CODE, {
            internalPrefix: INTERNAL_PREFIX,
            name: this.getTypeName(),
            initializer: this.getInitializerName(),
            resolver: this.getResolverName(),
            types: map(this.types, type => type.getTypeName()),
        }))
    }

    /* istanbul ignore next */
    async writeValidatedCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(VALIDATE_CODE, {
            internalPrefix: INTERNAL_PREFIX,
            name: this.getTypeName(),
            typedef: this.getTypeDef(),
            validator: this.getValidatorName(),
            types: map(this.types, type => ({
                name: type.getTypeName(),
                validator: type.getValidatorName(),
            }))
        }))
    }

    /* istanbul ignore next */
    async writeResolvedCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(COLLAPSE_CODE, {
            name: this.getTypeName(),
            types: map(this.types, type => type.getTypeName()),
        }))
    }
}
