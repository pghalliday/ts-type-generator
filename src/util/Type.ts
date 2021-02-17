export interface Type {
    getValidationTypeName(): string
    getNamespacedValidationTypeName(): string
    getValidatorName(): string
    getNamespacedValidatorName(): string
    writeValidationCode(outputDir: string, privateExports: number, publicExports: number): Promise<void>
    getDependencies(): Type[]
}
