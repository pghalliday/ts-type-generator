import {Type} from "../util/Type";
import {ExportParams, getExportParams} from "../util/ExportParams";
import {readFileSync} from "fs";
import {join} from "path";
import {TEMPLATES_DIR} from "../util/constants";
import Mustache from "mustache";
import {Primitive} from "../util/Primitive";
import {booleanType, numberType, stringType} from "../constants";

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'PrimitiveLiteralType')
const TYPE_CODE = readFileSync(join(TEMPLATES_DIR, 'type.ts.mustache')).toString()
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

const PRIMITIVE_TYPES: {[key: string]: Type} = {
    boolean: booleanType,
    number: numberType,
    string: stringType,
}

export class PrimitiveLiteralType<T extends Primitive> implements Type {
    private readonly type: Type
    private readonly exportParams: ExportParams;
    private readonly value: T;

    constructor(value: T, name?: string) {
        this.type = PRIMITIVE_TYPES[typeof value]
        this.exportParams = getExportParams(typeof value + 'Literal', name)
        this.value = value
    }

    isExported(): boolean {
        return this.exportParams.exported
    }

    getTypeName(): string {
        if (this.isExported()) {
            return this.exportParams.typeName
        }
        return JSON.stringify(this.value)
    }

    getTypeCode(): string {
        if (this.isExported()) {
            return Mustache.render(TYPE_CODE, {
                typeName: this.getTypeName(),
                typeDef: JSON.stringify(this.value),
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
            value: JSON.stringify(this.value),
            valueTypeName: this.type.getTypeName(),
            valueTranslateName: this.type.getTranslateName(),
        })
    }

    getDependencies(): Type[] {
        return [this.type]
    }
}
