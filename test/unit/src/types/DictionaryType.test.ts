import {DictionaryType} from "../../../../src"
import {TestType} from "../../TestType";

const TYPE_NAME = 'MyDictionaryType'
const MAP_TYPE_NAME = 'Type'
const TYPE = new TestType(MAP_TYPE_NAME)
const GENERATED_VALIDATOR_NAME_REGEXP = new RegExp('^validateDictionary_[0-9]+$')

describe('DictionaryType', () => {
    let instance: DictionaryType

    describe('with name', () => {
        beforeEach(async () => {
            instance = new DictionaryType(TYPE, TYPE_NAME)
        })

        it('should have the correct validation type name', () => {
            instance.getTypeName().should.equal(TYPE_NAME)
        })

        it('should have the correct namespaced validation type name', () => {
            instance.getNamespacedTypeName().should.equal(`Public.${instance.getTypeName()}`)
        })

        it('should have the correct validator name', () => {
            instance.getValidatorName().should.equal(`validate${instance.getTypeName()}`)
        })

        it('should have the correct namespaced validator name', () => {
            instance.getNamespacedValidatorName().should.equal(`Public.${instance.getValidatorName()}`)
        })

        it('should report the correct imports', () => {
            instance.getDependencies().should.eql([TYPE])
        })
    })

    describe('when anonymous', () => {
        beforeEach(async () => {
            instance = new DictionaryType(TYPE)
        })

        it('should use the type def as the validation type name', () => {
            instance.getTypeName().should.equal(`{[key: string]: ${TYPE.getTypeName()}}`)
        })

        it('should use the namespaced type def as the namespaced validation type name', () => {
            instance.getNamespacedTypeName().should.equal(`{[key: string]: ${TYPE.getNamespacedTypeName()}}`)
        })

        it('should have a generated validator name', () => {
            instance.getValidatorName().should.match(GENERATED_VALIDATOR_NAME_REGEXP)
        })

        it('should have the correct namespaced validator name', () => {
            instance.getNamespacedValidatorName().should.equal(`Private.${instance.getValidatorName()}`)
        })
    })
})
