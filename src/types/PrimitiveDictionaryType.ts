import {Type} from "../util/Type";
import {Primitive} from "../util/Primitive";
import {join} from "path";
import {TEMPLATES_DIR} from "../util/constants";
import {readFileSync} from "fs";
import Mustache from "mustache";
import {PrimitiveType} from "./PrimitiveType";

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'DictionaryType')
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

export class PrimitiveDictionaryType<T extends Primitive> implements Type {
    private readonly type: PrimitiveType<T>

    constructor(type: PrimitiveType<T>) {
        this.type = type
    }

    isExported(): boolean {
        return false
    }

    getTypeName(): string {
        return `{[key: string]: ${this.type.getTypeName()}}`
    }

    getTypeCode(): string {
        return '';
    }

    getTranslateName(): string {
        return `__TTG_translate_${this.type.getTypeName()}Dictionary`;
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
