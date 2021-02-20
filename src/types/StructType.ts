import {
    Type,
    INTERNAL_PREFIX,
    TEMPLATES_DIR,
    Reference,
} from "../internal";
import Mustache from "mustache";
import {readFileSync} from "fs";
import {join} from 'path'
import map from 'lodash/map'
import {write} from "fs-extra";

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'StructType')
const VALIDATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'validate.ts.mustache')).toString()
const RESOLVE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'resolve.ts.mustache')).toString()
const COLLAPSE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'collapse.ts.mustache')).toString()

type Property = {
    name: string,
    type: Type,
}

export class StructType extends Type {
    private readonly properties: Property[] = []

    property(name: string, type: Type): StructType {
        this.properties.push({
            name,
            type,
        })
        return this
    }

    getDependencies(): Type[] {
        return map(this.properties, property => property.type);
    }

    getReferences(): Reference[] {
        return [];
    }

    /* istanbul ignore next */
    async writeResolveCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(RESOLVE_CODE, {
            internalPrefix: INTERNAL_PREFIX,
            name: this.getTypeName(),
            initializer: this.getInitializerName(),
            resolver: this.getResolverName(),
            properties: map(this.properties, property => ({
                name: property.name,
                type: property.type.getTypeName(),
                initializer: property.type.getInitializerName(),
                resolver: property.type.getResolverName(),
            })),
        }))
    }

    /* istanbul ignore next */
    async writeValidateCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(VALIDATE_CODE, {
            internalPrefix: INTERNAL_PREFIX,
            name: this.getTypeName(),
            validator: this.getValidatorName(),
            properties: map(this.properties, property => ({
                name: property.name,
                type: property.type.getTypeName(),
                validator: property.type.getValidatorName(),
            })),
        }))
    }

    /* istanbul ignore next */
    async writeCollapseCode(exports: number): Promise<void> {
        await write(exports, Mustache.render(COLLAPSE_CODE, {
            name: this.getTypeName(),
            properties: map(this.properties, property => ({
                name: property.name,
                type: property.type.getTypeName(),
            })),
        }))
    }
}

