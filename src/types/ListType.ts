import {readFileSync} from "fs";
import {join} from "path";
import {TEMPLATES_DIR, CollectionType, Type} from "../internal";

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'ListType')
const VALIDATE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'validated.ts.mustache')).toString()
const RESOLVE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'partial.ts.mustache')).toString()
const COLLAPSE_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'resolved.ts.mustache')).toString()

export class ListType extends CollectionType {
    constructor(name: string, type: Type) {
        super(name, type, RESOLVE_CODE, VALIDATE_CODE, COLLAPSE_CODE);
    }
}

