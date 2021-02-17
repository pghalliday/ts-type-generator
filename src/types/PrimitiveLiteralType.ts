import {Type} from "../util/Type";
import {AccessParams} from "../util/AccessParams";
import {readFileSync} from "fs";
import {join} from "path";
import {PRIVATE_DIR, PUBLIC_DIR, TEMPLATES_DIR, VALIDATION_DIR} from "../util/constants";
import Mustache from "mustache";
import {Primitive} from "../util/Primitive";
import {booleanType, numberType, stringType} from "../constants";
import {outputFile, write} from "fs-extra";

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'PrimitiveLiteralType')
const VALIDATION_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'validation.ts.mustache')).toString()

const PRIMITIVE_TYPES: {[key: string]: Type} = {
    boolean: booleanType,
    number: numberType,
    string: stringType,
}

export class PrimitiveLiteralType<T extends Primitive> implements Type {
    private readonly type: Type
    private readonly accessParams: AccessParams
    private readonly value: T

    constructor(value: T, name?: string) {
        this.type = PRIMITIVE_TYPES[typeof value]
        this.accessParams = new AccessParams(typeof value + 'Literal', name)
        this.value = value
    }

    private getValue(): string {
        return JSON.stringify(this.value)
    }

    private isPublic(): boolean {
        return this.accessParams.public;
    }

    getValidationTypeName(): string {
        if (this.isPublic()) {
            return this.accessParams.name
        }
        return this.getValue()
    }

    getNamespacedValidationTypeName(): string {
        if (this.isPublic()) {
            return `Public.${this.accessParams.name}`
        }
        return this.getValue()
    }

    getValidatorName(): string {
        return `validate${this.accessParams.name}`;
    }

    getNamespacedValidatorName(): string {
        return this.isPublic()? `Public.${this.getValidatorName()}` :  `Private.${this.getValidatorName()}`
    }

    /* istanbul ignore next */
    async writeValidationCode(outputDir: string, privateExports: number, publicExports: number): Promise<void> {
        const exports = this.isPublic() ? publicExports : privateExports
        const importPath = join(this.isPublic() ? PUBLIC_DIR : PRIVATE_DIR, this.accessParams.name)
        await outputFile(join(outputDir, VALIDATION_DIR, `${importPath}.ts`), Mustache.render(VALIDATION_CODE, {
            isPublic: this.isPublic(),
            typeName: this.getValidationTypeName(),
            validatorName: this.getValidatorName(),
            value: this.getValue(),
            valueValidatorName: this.type.getNamespacedValidatorName(),
            valueTypeName: this.type.getNamespacedValidationTypeName(),
        }))
        await write(exports, `export * from "./${importPath}";\n`)
    }

    getDependencies(): Type[] {
        return [this.type]
    }
}
