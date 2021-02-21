import {
    Type,
    FILES_DIR,
    TEMPLATES_DIR,
    collectTypes,
    collectReferences,
    RESOLVED,
    VALIDATED,
    PARTIAL,
    UTIL_DIR,
    INTERNAL_PREFIX,
    REFERENCES,
    RESOLVER,
    VALIDATOR,
} from './internal'
import {close, copy, open, outputFile, write} from "fs-extra";
import {join} from 'path'
import Mustache from "mustache";
import {readFileSync} from "fs";

const VALIDATED_CODE = readFileSync(join(TEMPLATES_DIR, 'validated.ts.mustache')).toString()
const PARTIAL_CODE = readFileSync(join(TEMPLATES_DIR, 'partial.ts.mustache')).toString()
const REFERENCES_CODE = readFileSync(join(TEMPLATES_DIR, 'references.ts.mustache')).toString()
const RESOLVER_CODE = readFileSync(join(TEMPLATES_DIR, 'Resolver.ts.mustache')).toString()
const VALIDATOR_CODE = readFileSync(join(TEMPLATES_DIR, 'Validator.ts.mustache')).toString()
const INDEX_CODE = readFileSync(join(TEMPLATES_DIR, 'index.ts.mustache')).toString()

export class TsTypeGenerator {
    private readonly types: Type[] = []

    type(type: Type): TsTypeGenerator {
        this.types.push(type)
        return this
    }

    async generate(outputDir: string): Promise<void> {
        const types = collectTypes(this.types)
        const references = collectReferences(types)
        await copy(FILES_DIR, outputDir)
        const validatedExports = await open(join(outputDir, VALIDATED + '.ts'), 'w')
        const partialExports = await open(join(outputDir, PARTIAL + '.ts'), 'w')
        const resolvedExports = await open(join(outputDir, RESOLVED + '.ts'), 'w')
        await write(validatedExports, Mustache.render(VALIDATED_CODE, {
            internalPrefix: INTERNAL_PREFIX,
            validated: VALIDATED,
            partial: PARTIAL,
            resolved: RESOLVED,
            utilDir: UTIL_DIR,
        }))
        await write(partialExports, Mustache.render(PARTIAL_CODE, {
            internalPrefix: INTERNAL_PREFIX,
            validated: VALIDATED,
            partial: PARTIAL,
            references: REFERENCES,
            resolved: RESOLVED,
            utilDir: UTIL_DIR,
        }))
        for (const type of types) {
            await type.writeValidatedCode(validatedExports)
            await type.writePartialCode(partialExports)
            await type.writeResolvedCode(resolvedExports)
        }
        await close(validatedExports)
        await close(partialExports)
        await close(resolvedExports)
        await outputFile(join(outputDir, REFERENCES + '.ts'), Mustache.render(REFERENCES_CODE, {
            validated: VALIDATED,
            partial: PARTIAL,
            resolved: RESOLVED,
            utilDir: UTIL_DIR,
            referencesData: references,
        }))
        await outputFile(join(outputDir, RESOLVER + '.ts'), Mustache.render(RESOLVER_CODE, {
            partial: PARTIAL,
            resolved: RESOLVED,
            references: REFERENCES,
            utilDir: UTIL_DIR,
            referencesData: references,
        }))
        await outputFile(join(outputDir, VALIDATOR + '.ts'), Mustache.render(VALIDATOR_CODE, {
            validated: VALIDATED,
            resolver: RESOLVER,
            utilDir: UTIL_DIR,
            references: REFERENCES,
            referencesData: references,
        }))
        await outputFile(join(outputDir, 'index.ts'), Mustache.render(INDEX_CODE, {
            validated: VALIDATED,
            partial: PARTIAL,
            resolved: RESOLVED,
            references: REFERENCES,
            resolver: RESOLVER,
            validator: VALIDATOR,
            utilDir: UTIL_DIR,
        }))
    }
}
