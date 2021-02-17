import {Type} from "../util/Type";
import {Primitive} from "../util/Primitive";
import {join} from "path";
import {PRIVATE_DIR, TEMPLATES_DIR, VALIDATION_DIR} from "../util/constants";
import {readFileSync} from "fs";
import Mustache from "mustache";
import {outputFile, write} from "fs-extra";

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'PrimitiveType')
const VALIDATION_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'validation.ts.mustache')).toString()

export class PrimitiveType<T extends Primitive> implements Type {
    private readonly validationTypeName: string

    constructor(example: T) {
        this.validationTypeName = typeof example
    }

    getValidationTypeName(): string {
        return this.validationTypeName
    }

    getNamespacedValidationTypeName(): string {
        return this.getValidationTypeName()
    }

    getValidatorName(): string {
        return `validate_${this.getValidationTypeName()}`
    }

    getNamespacedValidatorName(): string {
        return `Private.${this.getValidatorName()}`
    }

    /* istanbul ignore next */
    async writeValidationCode(outputDir: string, privateExports: number): Promise<void> {
        const importPath = join(PRIVATE_DIR, this.getValidationTypeName())
        await outputFile(join(outputDir, VALIDATION_DIR, `${importPath}.ts`), Mustache.render(VALIDATION_CODE, {
            validatorName: this.getValidatorName(),
            typeName: this.getValidationTypeName(),
        }))
        await write(privateExports, `export * from "./${importPath}";\n`)
    }

    getDependencies(): Type[] {
        return []
    }
}
