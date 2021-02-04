import {Type} from "../util/Type";
import map from "lodash/map"
import Mustache from "mustache";
import {readFileSync} from "fs";
import {join} from 'path'
import {ExportParams, getExportParams} from "../util/ExportParams";
import {TEMPLATES_DIR} from "../util/constants";

const UNION_SEPARATOR = ' | '

const TYPE_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'UnionType.ts.mustache')).toString()
const TYPE_GUARD_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'UnionType.guard.ts.mustache')).toString()

export class UnionType implements Type {
    exportParams: ExportParams
    types: Type[] = []

    constructor(name?: string) {
        this.exportParams = getExportParams('Union', name)
    }

    type(type: Type): UnionType {
        this.types.push(type)
        return this
    }

    getName(): string {
        return this.exportParams.name
    }

    isExported(): boolean {
        return this.exportParams.exported
    }

    getTypeDefinition(): string {
        return Mustache.render(TYPE_DEFINITION_TEMPLATE, {
            name: this.getName(),
            types: map(this.types, type => type.getName()).join(UNION_SEPARATOR),
        })
    }

    getTypeGuardDefinition(): string {
        return Mustache.render(TYPE_GUARD_DEFINITION_TEMPLATE, {
            name: this.getName(),
            types: this.types,
        })
    }

    getDependencies(): Type[] {
        return this.types;
    }
}
