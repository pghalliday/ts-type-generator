export interface Type {
    name: string
    getTypeFileContent(): string
    getImports(): Type[]
}
