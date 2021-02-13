import {Type} from "../util/Type";
import {ExportParams, getExportParams} from "../util/ExportParams";
import {readFileSync} from "fs";
import {join} from "path";
import {TEMPLATES_DIR} from "../util/constants";
import Mustache from "mustache";

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'DictionaryType')
const TYPE_CODE = readFileSync(join(TEMPLATES_DIR, 'type.ts.mustache')).toString()
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

export class DictionaryType implements Type {
    private readonly exportParams: ExportParams
    private readonly type: Type

    constructor(type: Type, name?: string) {
        this.exportParams = getExportParams('Dictionary', name)
        this.type = type
    }

    private getTypeDef(): string {
        return `{[key: string]: ${this.type.getTypeName()}}`
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
            translateName: this.getTranslateName(),
            typeTranslateName: this.type.getTranslateName(),
        })
    }

    getDependencies(): Type[] {
        return [this.type]
    }
}
