import {Type} from "../util/Type";
import Mustache from "mustache";
import {readFileSync} from "fs";
import {join} from 'path'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import {ExportParams, getExportParams} from "../util/ExportParams";
import {TEMPLATES_DIR} from "../util/constants";

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'StructType')
const TYPE_CODE = readFileSync(join(TEMPLATES_DIR, 'type.ts.mustache')).toString()
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

type Property = {
    name: string,
    type: Type,
}

export class StructType implements Type {
    private readonly exportParams: ExportParams
    private readonly properties: Property[] = []

    constructor(name?: string) {
        this.exportParams = getExportParams('Struct', name)
    }

    private getTypeDef(): string {
        return '{\n' +
                reduce(
                    this.properties,
                    (properties, property) => properties + '    ' + property.name + ': ' + property.type.getTypeName() + ',\n',
                    '',
                ) +
            '}'
    }

    property(name: string, type: Type): StructType {
        this.properties.push({
            name,
            type,
        })
        return this
    }

    isExported(): boolean {
        return this.exportParams.exported
    }

    getTypeName(): string {
        if (this.isExported()) {
            return this.exportParams.typeName
        }
        return this.getTypeDef()
    }

    getTypeCode(): string {
        if (this.isExported()) {
            return Mustache.render(TYPE_CODE, {
                typeName: this.getTypeName(),
                typeDef: this.getTypeDef(),
            })
        }
        return ''
    }

    getTranslateName(): string {
        return this.exportParams.translateName
    }

    getTranslateCode(): string {
        return Mustache.render(TRANSLATE_CODE, {
            typeName: this.getTypeName(),
            translateName: this.getTranslateName(),
            properties: map(this.properties, property => ({
                propertyName: property.name,
                propertyTranslateName: property.type.getTranslateName(),
            }))
        })
    }

    getDependencies(): Type[] {
        return map(this.properties, property => property.type);
    }
}
