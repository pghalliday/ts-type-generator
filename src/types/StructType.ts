import {Type} from "../util/Type";
import Mustache from "mustache";
import {readFileSync} from "fs";
import {join} from 'path'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import {AccessParams} from "../util/AccessParams";
import {PRIVATE_DIR, PUBLIC_DIR, TEMPLATES_DIR, VALIDATION_DIR} from "../util/constants";
import {outputFile, write} from "fs-extra";

const TYPE_TEMPLATES_DIR = join(TEMPLATES_DIR, 'StructType')
const VALIDATION_CODE = readFileSync(join(TYPE_TEMPLATES_DIR, 'validation.ts.mustache')).toString()

type Property = {
    name: string,
    type: Type,
}

export class StructType implements Type {
    private readonly accessParams: AccessParams
    private readonly properties: Property[] = []

    constructor(name?: string) {
        this.accessParams = new AccessParams('Struct', name)
    }

    private getTypeDef(): string {
        return '{\n' +
            reduce(
                this.properties,
                (properties, property) => properties + '    ' + property.name + ': ' + property.type.getValidationTypeName() + ',\n',
                '',
            ) +
            '}'
    }

    private getNamespacedTypeDef(): string {
        return '{\n' +
            reduce(
                this.properties,
                (properties, property) => properties + '    ' + property.name + ': ' + property.type.getNamespacedValidationTypeName() + ',\n',
                '',
            ) +
            '}'
    }

    property(name: string, type: Type): StructType {
        this.properties.push({
            name,
            type,
        })
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
            namespacedTypeDef: this.getNamespacedTypeDef(),
            typeName: this.isPublic() ? this.getValidationTypeName() : this.getNamespacedTypeDef(),
            validatorName: this.getValidatorName(),
            properties: map(this.properties, property => ({
                propertyName: property.name,
                propertyValidatorName: property.type.getNamespacedValidatorName(),
            })),
        }))
        await write(exports, `export * from "./${importPath}";\n`)
    }

    getDependencies(): Type[] {
        return map(this.properties, property => property.type);
    }
}
