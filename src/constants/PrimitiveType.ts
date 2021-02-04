import {Type} from "../util/Type";
import {readFileSync} from "fs";
import {join} from "path";
import {TEMPLATES_DIR} from "../util/constants";
import {Primitive} from "../util/Primitive";
import Mustache from "mustache";
import {ExportParams, getExportParams} from "../util/ExportParams";

const TYPE_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'PrimitiveType.ts.mustache')).toString()
const TYPE_GUARD_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'PrimitiveType.guard.ts.mustache')).toString()

export class PrimitiveType<T extends Primitive> implements Type {
    exportParams: ExportParams
    type: string

    constructor(example: T) {
        this.type = typeof example
        this.exportParams = getExportParams(this.type)
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
            type: this.type
        })
    }

    getTypeGuardDefinition(): string {
        return Mustache.render(TYPE_GUARD_DEFINITION_TEMPLATE, {
            name: this.getName(),
            type: this.type
        })
    }

    getDependencies(): Type[] {
        return []
    }
}
