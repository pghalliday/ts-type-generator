import {Type} from "../util/Type";
import Mustache from "mustache";
import {readFileSync} from "fs";
import {join} from 'path'
import map from 'lodash/map'
import {ExportParams, getExportParams} from "../util/ExportParams";
import {TEMPLATES_DIR} from "../util/constants";

const TYPE_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'InterfaceType.ts.mustache')).toString()
const TYPE_GUARD_DEFINITION_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'InterfaceType.guard.ts.mustache')).toString()

interface Property {
    name: string
    type: Type
}

export class InterfaceType implements Type {
    exportParams: ExportParams
    properties: Property[] = []

    constructor(name?: string) {
        this.exportParams = getExportParams('Interface', name)
    }

    property(name: string, type: Type): InterfaceType {
        this.properties.push({
            name,
            type,
        })
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
            properties: map(this.properties, property => ({
                name: property.name,
                type: property.type.getName(),
            })),
        })
    }

    getTypeGuardDefinition(): string {
        return Mustache.render(TYPE_GUARD_DEFINITION_TEMPLATE, {
            name: this.getName(),
            properties: map(this.properties, property => ({
                name: property.name,
                type: property.type.getName(),
            })),
        })
    }

    getDependencies(): Type[] {
        return map(this.properties, property => property.type);
    }
}
