import {Type} from "../util/Type";
import {Primitive} from "../util/Primitive";
import {join} from "path";
import {TEMPLATES_DIR} from "../util/constants";
import {readFileSync} from "fs";
import Mustache from "mustache";

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'PrimitiveType')
const TRANSLATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'translate.ts.mustache')).toString()

export class PrimitiveType<T extends Primitive> implements Type {
    private readonly type: string

    constructor(example: T) {
        this.type = typeof example
    }

    isExported(): boolean {
        return false
    }

    getTypeName(): string {
        return this.type
    }

    getTypeCode(): string {
        return '';
    }

    getTranslateName(): string {
        return `__TTG_translate_${this.getTypeName()}`;
    }

    getTranslateCode(): string {
        return Mustache.render(TRANSLATE_CODE, {
            typeName: this.getTypeName(),
            translateName: this.getTranslateName(),
        })
    }

    getDependencies(): Type[] {
        return []
    }
}
