import {isArray} from "./isArray";
import {Validator} from "./Validator";
import {ValidationError} from "../ValidationError";

export function validateList<T>(validate: Validator<T>): Validator<T[]> {
    return (data: unknown): T[] | ValidationError => {
        if (!isArray(data)) return new ValidationError('Not a list');
        const list: T[] = [];
        for (const index in data) {
            const validated = validate(data[index]);
            if (validated instanceof ValidationError) return new ValidationError(`Error encountered validating index: [${index}]`, validated);
            list.push(validated)
        }
        return list;
    }
}
