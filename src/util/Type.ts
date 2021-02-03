export interface Type {
    name: string
    getTypeFileContent(): string
    getTypeDependencies(): Type[]
}
