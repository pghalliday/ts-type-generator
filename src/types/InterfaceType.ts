import {Type} from "../util/Type";
import Mustache from "mustache";
import {readFileSync} from "fs";
import {join} from 'path'
import map from 'lodash/map'
import uniq from 'lodash/uniq'
import {getName} from "../util/getName";
import {TEMPLATES_DIR} from "../util/constants";

const TYPE_FILE_TEMPLATE = readFileSync(join(TEMPLATES_DIR, 'InterfaceType.ts.mustache')).toString()

interface Property {
    name: string
    type: Type
}

export class InterfaceType implements Type {
    name: string
    properties: Property[] = []

    constructor(name?: string) {
        this.name = getName('Interface', name)
    }

    property(name: string, type: Type): InterfaceType {
        this.properties.push({
            name,
            type,
        })
        return this
    }

    getTypeFileContent(): string {
        return Mustache.render(TYPE_FILE_TEMPLATE, {
            name: this.name,
            properties: map(this.properties, property => ({
                name: property.name,
                type: property.type.name,
            })),
            types: uniq(map(this.properties, property => property.type.name)),
        })
    }

    getTypeDependencies(): Type[] {
        return map(this.properties, property => property.type);
    }
}
