import {Type} from "../util/Type";
import map from "lodash/map"
import Mustache from "mustache";
import {readFileSync} from "fs";
import {join} from 'path'
import {AccessParams} from "../util/AccessParams";
import {PRIVATE_DIR, PUBLIC_DIR, TEMPLATES_DIR, VALIDATION_DIR} from "../util/constants";
import {outputFile, write} from "fs-extra";

const UNION_SEPARATOR = ' | '

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'UnionType')
const VALIDATION_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'validation.ts.mustache')).toString()

export class UnionType implements Type {
    private readonly accessParams: AccessParams
    private readonly types: Type[] = []

    constructor(name?: string) {
        this.accessParams = new AccessParams('Union', name)
    }

    private getTypeDef(): string {
        return map(this.types, type => type.getValidationTypeName()).join(UNION_SEPARATOR)
    }

    private getNamespacedTypeDef(): string {
        return map(this.types, type => type.getNamespacedValidationTypeName()).join(UNION_SEPARATOR)
    }

    type(type: Type): UnionType {
        this.types.push(type)
        return this
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
            typeDef: this.getTypeDef(),
            namespacedTypeDef: this.getNamespacedTypeDef(),
            typeName: this.isPublic() ? this.getValidationTypeName() : this.getNamespacedTypeDef(),
            validatorName: this.getValidatorName(),
            typeValidatorNames: map(this.types, type => type.getNamespacedValidatorName())
        }))
        await write(exports, `export * from "./${importPath}";\n`)
    }

    getDependencies(): Type[] {
        return this.types;
    }
}
