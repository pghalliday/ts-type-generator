import {Validator} from "./Validator";
import {ValidationError} from "../ValidationError";
import {hasOwnProperty} from "./hasOwnProperty";

export function validateProperty<T>(data: {}, property: string, validate: Validator<T>): T | ValidationError {
    if (!hasOwnProperty(data, property)) return new ValidationError(`Property missing: ["${property}"]`);
    const validated = validate(data[property]);
    if (validated instanceof ValidationError) return new ValidationError(`Error encountered validating property: ["${property}"]`, validated);
    return validated;
}
