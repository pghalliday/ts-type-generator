import {Type} from "../util/Type";
import map from "lodash/map"
import Mustache from "mustache";
import {readFileSync} from "fs";
import {join} from 'path'
import {ExportParams, getExportParams} from "../util/ExportParams";
import {TEMPLATES_DIR} from "../util/constants";

const UNION_SEPARATOR = ' | '

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'UnionType')
const TYPE_CODE = readFileSync(join(TEMPLATES_DIR, 'type.ts.mustache')).toString()
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

export class UnionType implements Type {
    private readonly exportParams: ExportParams
    private readonly types: Type[] = []

    constructor(name?: string) {
        this.exportParams = getExportParams('Union', name)
    }

    private getTypeNames(): string {
        return map(this.types, type => type.getTypeName()).join(UNION_SEPARATOR)
    }

    type(type: Type): UnionType {
        this.types.push(type)
        return this
    }

    isExported(): boolean {
        return this.exportParams.exported
    }

    getTypeName(): string {
        if (this.isExported()) {
            return this.exportParams.typeName
        }
        return this.getTypeNames()
    }

    getTypeCode(): string {
        if (this.isExported()) {
            return Mustache.render(TYPE_CODE, {
                typeName: this.getTypeName(),
                typeDef: this.getTypeNames(),
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
            typeNames: this.getTypeNames(),
            translateName: this.getTranslateName(),
            typeTranslateNames: map(this.types, type => type.getTranslateName()),
        })
    }

    getDependencies(): Type[] {
        return this.types;
    }
}
