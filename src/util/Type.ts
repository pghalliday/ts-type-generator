export interface Type {
    getName(): string
    isExported(): boolean
    getTypeDefinition(): string
    getTypeGuardDefinition(): string
    getDependencies(): Type[]
}
