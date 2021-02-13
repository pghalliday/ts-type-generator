export interface Type {
    isExported(): boolean
    getTypeName(): string
    getTypeCode(): string
    getTranslateName(): string
    getTranslateCode(): string
    getDependencies(): Type[]
}
