import {Type} from "../util/Type";
import {AccessParams} from "../util/AccessParams";
import {readFileSync} from "fs";
import {join} from "path";
import {PRIVATE_DIR, PUBLIC_DIR, TEMPLATES_DIR, VALIDATION_DIR} from "../util/constants";
import Mustache from "mustache";
import {outputFile, write} from "fs-extra";

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'DictionaryType')
const VALIDATION_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'validation.ts.mustache')).toString()

export class DictionaryType implements Type {
    private readonly accessParams: AccessParams
    private readonly type: Type

    constructor(type: Type, name?: string) {
        this.accessParams = new AccessParams('Dictionary', name)
        this.type = type
    }

    private getTypeDef(): string {
        return `{[key: string]: ${this.type.getValidationTypeName()}}`
    }

    private getNamespacedTypeDef(): string {
        return `{[key: string]: ${this.type.getNamespacedValidationTypeName()}}`
    }

    private isPublic(): boolean {
        return this.accessParams.public
    }

    getValidationTypeName(): string {
        if (this.isPublic()) {
            return this.accessParams.name
        }
        return this.getTypeDef()
    }

    getNamespacedValidationTypeName(): string {
        if (this.isPublic()) {
            return `Public.${this.accessParams.name}`
        }
        return this.getNamespacedTypeDef()
    }

    getValidatorName(): string {
        return `validate${this.accessParams.name}`
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
            typeName: this.isPublic() ? this.getValidationTypeName(): this.getNamespacedTypeDef(),
            namespacedTypeDef: this.getNamespacedTypeDef(),
            validatorName: this.getValidatorName(),
            typeValidatorName: this.type.getNamespacedValidatorName(),
        }))
        await write(exports, `export * from "./${importPath}";\n`)
    }

    getDependencies(): Type[] {
        return [this.type]
    }
}
