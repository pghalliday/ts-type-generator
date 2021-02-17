import {Validator} from "./Validator";
import {ValidationError} from "../ValidationError";
import {isObject} from "./isObject";

export function validateDictionary<T>(validate: Validator<T>): Validator<{[key: string]: T}> {
    return (data: unknown): {[key: string]: T} | ValidationError => {
        if (!isObject(data)) return new ValidationError('Not a dictionary');
        const dictionary: {[key: string]: T} = {};
        for (const key in data) {
            const validated = validate(data[key]);
            if (validated instanceof ValidationError) return new ValidationError(`Error encountered validating key: [${key}]`, validated);
            dictionary[key] = validated;
        }
        return dictionary;
    }
}
