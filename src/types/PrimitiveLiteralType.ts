import {Type} from "../util/Type";
import {ExportParams, getExportParams} from "../util/ExportParams";
import {readFileSync} from "fs";
import {join} from "path";
import {TEMPLATES_DIR} from "../util/constants";
import Mustache from "mustache";
import {Primitive} from "../util/Primitive";

const TYPE_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'PrimitiveLiteralType.ts.mustache')).toString()
const TYPE_GUARD_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'PrimitiveLiteralType.guard.ts.mustache')).toString()

export class PrimitiveLiteralType<T extends Primitive> implements Type {
    exportParams: ExportParams
    value: T

    constructor(value: T, name?: string) {
        this.exportParams = getExportParams(typeof value + 'Literal', name)
        this.value = value
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
            value: JSON.stringify(this.value),
            type: typeof this.value,
        })
    }

    getTypeGuardDefinition(): string {
        return Mustache.render(TYPE_GUARD_DEFINITION_TEMPLATE, {
            name: this.getName(),
            value: JSON.stringify(this.value),
            type: typeof this.value,
        })
    }

    getDependencies(): Type[] {
        return []
    }
}
