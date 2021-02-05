import {Type} from "../util/Type";
import {ExportParams, getExportParams} from "../util/ExportParams";
import {readFileSync} from "fs";
import {join} from "path";
import {TEMPLATES_DIR} from "../util/constants";
import Mustache from "mustache";

const TYPE_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'ListType.ts.mustache')).toString()
const TYPE_GUARD_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'ListType.guard.ts.mustache')).toString()

export class ListType implements Type {
    exportParams: ExportParams
    type: Type

    constructor(type: Type, name?: string) {
        this.exportParams = getExportParams('List', name)
        this.type = type
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
            type: this.type.getName(),
        })
    }

    getTypeGuardDefinition(): string {
        return Mustache.render(TYPE_GUARD_DEFINITION_TEMPLATE, {
            name: this.getName(),
            type: this.type.getName()
        })
    }

    getDependencies(): Type[] {
        return [this.type]
    }
}
